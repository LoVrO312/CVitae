export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  projectUrl: string;
  tags: string[];
}

export interface User {
  _id: string;
  email: string;
  role : string;
}

export interface ResumeData {
  email: string;
  bio: string;
  skills: string[];
  github: string;
  linkedin: string;
}