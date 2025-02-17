import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img
        src={project.thumbnailUrl}
        alt={project.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Read more
          </a>
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <Github className="h-4 w-4 mr-1" />
            Source Code
          </a>
        </div>
      </div>
    </div>
  );
}