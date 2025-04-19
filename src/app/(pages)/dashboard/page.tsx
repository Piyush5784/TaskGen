"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import Tasks from "./tasks/page";
import ManualTaskTable from "@/components/custom/tasks/manual-task-table";

export default function Page() {
  const { projects, loading } = useSelector((root: RootState) => root.org);

  if (!projects && !loading) return null;
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 lg:px-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-6 rounded-lg shadow border">
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-6" />
            <div className="flex space-x-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl text-gray-600">No projects found</h3>
        <p className="text-gray-500 mt-2">
          Create a new project to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 lg:px-6">
      {projects.map((project) => (
        <div
          key={project.id}
          className="border p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="relative">
            <h2 className="text-2xl font-semibold mb-2">{project.name}</h2>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {project.description || "No description provided"}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack && project.techStack.length > 0 ? (
              project.techStack.map((tech: string, i: number) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-sm">
                No tech stack specified
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            {project.LiveLink && (
              <a
                href={project.LiveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Live Demo
              </a>
            )}
            {project.RepoLink && (
              <a
                href={project.RepoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
              >
                Repository
              </a>
            )}
          </div>
        </div>
      ))}

    </div>
  );
}
