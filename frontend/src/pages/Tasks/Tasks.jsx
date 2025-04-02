import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import { useTasks } from '../../hooks/useTasks';
import TaskItem from '../../components/TaskItem/TaskItem';
import TaskForm from '../../components/TaskForm/TaskForm';
import Modal from '../../components/Modal/Modal';
import EmptyState from '../../components/EmptyState/EmptyState';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import styles from './Tasks.module.css';

const Tasks = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();
  const { 
    tasks, 
    project, 
    loading, 
    error, 
    addTask, 
    editTask, 
    removeTask, 
    toggleTask,
    refreshTasks
  } = useTasks(projectId);
  
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isDeletingTask, setIsDeletingTask] = useState(null);
  const [isTogglingTask, setIsTogglingTask] = useState(null);

  const handleAddTask = async (taskData) => {
    try {
      await addTask(taskData);
      setIsTaskModalOpen(false);
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await editTask(editingTask.originalName, taskData);
      setEditingTask(null);
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };


  const handleDeleteTask = async (taskName) => {
    try {
      setIsDeletingTask(taskName);
      await removeTask(taskName);
    } catch (err) {
      console.error("Failed to delete task:", err);
    } finally {
      setIsDeletingTask(null);
    }
  };


  const handleToggleTask = async (taskName, currentStatus) => {
    try {
      await toggleTask(taskName, currentStatus);
    } catch (err) {
      console.error("Failed to toggle task:", err);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading tasks..." />;
  }

  if (error || !project) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          {error || 'Project not found'}
          <button 
            onClick={refreshTasks}
            className={styles.retryButton}
          >
            Try Again
          </button>
        </div>
        <button 
          className={styles.backButton}
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft /> Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button 
          className={styles.backButton}
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft /> Back to Projects
        </button>
        <h1 className={styles.projectTitle}>{project.title}</h1>
      </div>

      <div className={styles.projectMeta}>
        <div className={styles.metaItem}>
          <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
        </div>
        <div className={styles.taskCount}>
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </div>
      </div>

      <p className={styles.projectDescription}>{project.description}</p>

      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}

      <button 
        className={styles.addTaskButton}
        onClick={() => setIsTaskModalOpen(true)}
      >
        <FiPlus /> Add New Task
      </button>

      {isTaskModalOpen && (
        <Modal 
          title="Add New Task" 
          onClose={() => setIsTaskModalOpen(false)}
        >
          <TaskForm 
            onSubmit={handleAddTask}
            onCancel={() => setIsTaskModalOpen(false)}
          />
        </Modal>
      )}

      {editingTask && (
        <Modal 
          title="Edit Task" 
          onClose={() => setEditingTask(null)}
        >
          <TaskForm 
            initialData={editingTask}
            onSubmit={handleUpdateTask}
            onCancel={() => setEditingTask(null)}
          />
        </Modal>
      )}

      <div className={styles.taskListContainer}>
        <h2 className={styles.sectionTitle}>Tasks</h2>
        {tasks.length === 0 ? (
          <EmptyState 
            variant="task"
            title="No tasks yet"
            description="Add your first task to get started"
            action={() => setIsTaskModalOpen(true)}
            actionText="Create Task"
          />
        ) : (
          <ul className={styles.taskList}>
            {tasks.map((task) => (
              <TaskItem 
              key={task.name}
              task={task}
              onEdit={() => setEditingTask({
                originalName: task.name,
                name: task.name,
                completed: task.completed
              })}
              onDelete={handleDeleteTask}
              onToggle={handleToggleTask}
              isDeleting={isDeletingTask === task.name}
              isToggling={isTogglingTask === task.name}
            />
            ))}
          </ul>
        )}
        
      </div>
      
    </div>
  );
};

export default Tasks;