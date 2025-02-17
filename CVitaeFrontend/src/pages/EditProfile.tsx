import React, { useState, useEffect } from 'react';
import { Camera, FileText } from 'lucide-react';
import { editProfile } from '../api/adminApi';
import { getResumeInfo } from '../api/userApi';
import { getFile, uploadFile } from '../api/fileApi';
import { ResumeData } from '../types';

export function EditProfile() {
  const [formData, setFormData] = useState<ResumeData>({
    email: '',
    bio: '',
    skills: [],
    github: '',
    linkedin: '',
  });
  const [profileImage, setProfileImage] = useState<string>('');
  const [message, setMessage] = useState('');
  
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchResumeInfo = async () => {
      try {
        const data = await getResumeInfo();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching resume info:", error);
      }
    };

    const fetchProfileImage = async () => {
      try {
        const blob = await getFile('profileImage');
        const url = URL.createObjectURL(blob);
        setProfileImage(url);
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    }

    fetchProfileImage();
    fetchResumeInfo();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (newProfileImage) {
        await uploadFile(newProfileImage, "profileImage");
      }
      if (resumeFile) {
        await uploadFile(resumeFile, "resume");
      }
      await editProfile(formData);
      setMessage('Profile updated successfully');
    } catch (error) {
      setMessage('An error occurred while updating profile');
    }

  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Edit Profile</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-8 flex flex-col items-center space-y-8 sm:flex-row sm:space-y-0 sm:space-x-16">
              <div className="relative w-32 h-32">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
                <label className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer hover:bg-indigo-700">
                  <Camera className="h-5 w-5 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              
              <label className="flex items-center gap-2 cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                <FileText className="h-5 w-5" /> Upload Resume
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handleResumeUpload}
                />
              </label>
            </div>

            {resumeFile && <p className="text-sm text-gray-600">Selected: {resumeFile.name}</p>}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills (comma-separated)</label>
                <input
                  type="text"
                  value={formData.skills.join(', ')}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(',').map(s => s.trim()) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
      </div>
    </div>
  );
}
