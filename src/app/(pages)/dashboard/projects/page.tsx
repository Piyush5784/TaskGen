"use client";

import { QuickCreate } from "@/components/custom/quick-create-dialog";
import { AppDispatch, RootState } from "@/store";
import { fetchTasks } from "@/store/slices/organisation/org-functions";
import { selectProject } from "@/store/slices/organisation/org-slice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const { projects, loading } = useSelector((root: RootState) => root.org);
  const dispatch = useDispatch<AppDispatch>();
  const [projectId, setProjectId] = useState<string | null>(null);

  useEffect(() => {
    if (projectId) {
      const selectedProject = projects?.find((p) => p.id === projectId);
      if (selectedProject) {
        dispatch(selectProject(selectedProject));
      }
      dispatch(fetchTasks(projectId));
    }
  }, [projectId, dispatch]);

  if (!projects && !loading) return null;

  return (
    <div className="px-4 lg:px-6">
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 p-6 rounded-lg shadow animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-full mb-2" />
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-6" />
              <div className="flex space-x-4">
                <div className="h-10 bg-gray-200 rounded w-24" />
                <div className="h-10 bg-gray-200 rounded w-24" />
              </div>
            </div>
          ))}
        </div>
      ) : projects?.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl text-gray-600">No projects found</h3>
          <p className="text-gray-500 mt-2">
            Create a new project to get started
          </p>
          <div className="flex justify-center items-center">
            <div className="w-[200px] flex items-center justify-center p-10">
              <QuickCreate />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              href="/dashboard/tasks"
              onClick={() => setProjectId(project.id)}
            >
              <div className="border p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-semibold mb-2">{project.name}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {project.description || "No description provided"}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack?.length ? (
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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
