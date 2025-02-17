const baseUrl = import.meta.env.VITE_API_URL;
import { ResumeData } from '../types';

const editProfile = async (resumeData: ResumeData) => {
  try {
    const token = localStorage.getItem("token");


    const response = await fetch(`${baseUrl}/admin/edit-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify(resumeData)
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export { editProfile };
