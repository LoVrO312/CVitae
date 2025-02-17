import React, { useEffect, useState } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { ChevronDown } from "lucide-react";
import placeholderImage from "../placeholder.jpg";

export function Home() {
  interface Project {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    projectUrl: string;
    tags: string[];
  }

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchGitHubProjects = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/LoVrO312/repos"
        );
        const data = await response.json();
        const formattedProjects = data.map((repo: any) => ({
          id: repo.id.toString(),
          title: repo.name,
          description: repo.description || "No description provided",
          thumbnailUrl: placeholderImage,
          projectUrl: repo.html_url,
          tags: repo.language ? [repo.language] : [],
        }));
        setProjects(formattedProjects);
      } catch (error) {
        console.error("Error fetching GitHub repos:", error);
      }
    };

    fetchGitHubProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Hi, I'm LoVrO312</h1>
          <p className="text-xl md:text-2xl mb-8">This is a dummy resume page.</p>
          <a
            href="#projects"
            className="inline-flex items-center px-6 py-3 border-2 border-white rounded-full text-lg hover:bg-white hover:text-indigo-600 transition-colors"
          >
            View My Work
          </a>
        </div>
        <div className="absolute bottom-8 w-full text-center animate-bounce">
          <ChevronDown className="h-8 w-8 mx-auto" />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length > 0 ? (
              projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <p className="text-center text-gray-600">Loading projects...</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
