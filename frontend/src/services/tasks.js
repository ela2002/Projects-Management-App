import axios from "axios";

const API_URL = "http://localhost:3000/projects";

export const getProjectTasks = async (projectId) => {
  try {
    const [projectRes, tasksRes] = await Promise.all([
      axios.get(`${API_URL}/${projectId}`),
      axios.get(`${API_URL}/${projectId}/tasks`),
    ]);

    return {
      project: projectRes.data,
      tasks: tasksRes.data,
    };
  } catch (err) {
    throw err;
  }
};

export const createTask = async (projectId, taskData) => {
  const response = await axios.post(`${API_URL}/${projectId}/tasks`, taskData);
  return response.data;
};

export const updateTask = async (projectId, originalName, taskData) => {
  const response = await axios.put(
    `${API_URL}/${projectId}/tasks/${encodeURIComponent(originalName)}`,
    taskData
  );
  return response.data;
};

export const deleteTask = async (projectId, taskName) => {
  await axios.delete(
    `${API_URL}/${projectId}/tasks/${encodeURIComponent(taskName)}`
  );
};

export const toggleTaskCompletion = async (projectId, taskName) => {
  await axios.patch(
    `${API_URL}/${projectId}/tasks/${encodeURIComponent(taskName)}/toggle`
  );
};
