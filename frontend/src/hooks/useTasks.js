import { useState, useEffect } from "react";
import {
  getProjectTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
} from "../services/tasks";

export const useTasks = (projectId) => {
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    if (!projectId) return;

    try {
      setLoading(true);
      setError(null);
      const { project, tasks } = await getProjectTasks(projectId);
      setProject(project);
      setTasks(tasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError(err.response?.data?.message || err.message);
      setProject(null);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const newTask = await createTask(projectId, taskData);
      setTasks((prev) => [...prev, newTask]);
      return newTask;
    } catch (err) {
      throw err;
    }
  };

  const editTask = async (originalName, taskData) => {
    try {
      const updatedTask = await updateTask(projectId, originalName, taskData);
      setTasks((prev) =>
        prev.map((t) => (t.name === originalName ? updatedTask : t))
      );
      return updatedTask;
    } catch (err) {
      throw err;
    }
  };

  const removeTask = async (taskName) => {
    try {
      await deleteTask(projectId, taskName);
      setTasks((prev) => prev.filter((t) => t.name !== taskName));
    } catch (err) {
      throw err;
    }
  };

  const toggleTask = async (taskName, currentStatus) => {
    try {
      await toggleTaskCompletion(projectId, taskName);
      setTasks((prev) =>
        prev.map((t) =>
          t.name === taskName ? { ...t, completed: !currentStatus } : t
        )
      );
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  return {
    tasks,
    project,
    loading,
    error,
    addTask,
    editTask,
    removeTask,
    toggleTask,
    refreshTasks: fetchTasks,
  };
};
