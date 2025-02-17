import React, { useEffect, useState } from 'react';
import { Mail, Github, Linkedin, FileText } from 'lucide-react';
import { getResumeInfo } from '../api/userApi';
import { getFile } from '../api/fileApi';
import { ResumeData } from '../types';

export function About() {
  const [resumeInfo, setResumeInfo] = useState<ResumeData | null>(null);
  const [profileImage, setProfileImage] = useState<string>('');

  useEffect(() => {
    const fetchResumeInfo = async () => {
      try {
        const data = await getResumeInfo();
        setResumeInfo(data);
      } catch (error) {
        console.error('Error fetching resume info:', error);
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
    };

    fetchResumeInfo();
    fetchProfileImage();
  }, []);

  const handleDownloadResume = async () => {
    try {
      const blob = await getFile('resume');
      
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = "lovro's resume.pdf";
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume. Please try again.');
    }
  };

  if (!resumeInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <img
              src={profileImage}
              alt="Profile"
              className="w-48 h-48 rounded-full object-cover mb-6 md:mb-0 md:mr-8"
            />
            <div>
              <h1 className="text-3xl font-bold mb-4">LoVrO312</h1>
              <p className="text-gray-600 mb-6">{resumeInfo.bio}</p>
              <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <div className="flex space-x-4">
                  <a
                    href={`mailto:${resumeInfo.email}`}
                    className="flex items-center text-gray-600 hover:text-indigo-600"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Email
                  </a>
                  <a
                    href={resumeInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-indigo-600"
                  >
                    <Github className="h-5 w-5 mr-2" />
                    GitHub
                  </a>
                </div>
                <div className="flex space-x-4">
                  <a
                    href={resumeInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-indigo-600"
                  >
                    <Linkedin className="h-5 w-5 mr-2" />
                    LinkedIn
                  </a>
                  <button
                    onClick={handleDownloadResume}
                    className="flex items-center text-gray-600 hover:text-indigo-600"
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    Download Resume
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resumeInfo.skills.map((skill, index) => (
              <div key={index} className="flex items-center">
                <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}