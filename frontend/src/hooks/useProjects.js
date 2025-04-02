import { useState, useEffect } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projects";

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addProject = async (projectData) => {
    try {
      const newProject = await createProject(projectData);
      setProjects([...projects, newProject]);
      return newProject;
    } catch (err) {
      throw err;
    }
  };

  const editProject = async (id, projectData) => {
    try {
      const updatedProject = await updateProject(id, projectData);
      setProjects(projects.map((p) => (p.id === id ? updatedProject : p)));
      return updatedProject;
    } catch (err) {
      throw err;
    }
  };

  const removeProject = async (id) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    addProject,
    editProject,
    removeProject,
    refreshProjects: fetchProjects,
  };
};
