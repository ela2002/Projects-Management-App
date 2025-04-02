import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useProjects } from '../../hooks/useProjects';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import ProjectForm from '../../components/ProjectForm/ProjectForm';
import Modal from '../../components/Modal/Modal';
import EmptyState from '../../components/EmptyState/EmptyState';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import styles from './Projects.module.css';
import DeleteConfirmation from '../../components/DeleteConfirmation/DeleteConfirmation';

const Projects = () => {
  const { projects, loading, error, addProject, editProject, removeProject } = useProjects();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (projectId) => {
    setDeleteProjectId(projectId);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await removeProject(deleteProjectId);
    } finally {
      setIsDeleting(false);
      setDeleteProjectId(null);
    }
  };


  const handleSubmit = async (projectData) => {
    try {
      if (editingProject) {
        await editProject(editingProject.id, projectData);
      } else {
        await addProject(projectData);
      }
      setIsFormOpen(false);
      setEditingProject(null);
    } catch (err) {
      console.error("Failed to save project:", err);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };


  if (loading) {
    return <LoadingSpinner message="Loading projects..." />;
  }

  if (error) {
    return <div className={styles.errorContainer}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Projects</h1>
        <button 
          className={styles.primaryButton}
          onClick={() => setIsFormOpen(true)}
        >
          <FiPlus /> New Project
        </button>
      </header>

      {isFormOpen && (
        <Modal 
          title={editingProject ? 'Edit Project' : 'Create Project'} 
          onClose={() => {
            setIsFormOpen(false);
            setEditingProject(null);
          }}
        >
          <ProjectForm 
            initialData={editingProject}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingProject(null);
            }}
          />
        </Modal>
      )}

      <div className={styles.projectsGrid}>
        {projects.length === 0 ? (
          <EmptyState 
            variant="project"
            title="No projects yet"
            description="Create your first project to get started"
            action={() => setIsFormOpen(true)}
            actionText="Create Project"
          />
        ) : (
          projects.map((project) => (
            <ProjectCard 
              key={project.id}
              project={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
      {deleteProjectId && (
        <DeleteConfirmation
          itemName={projects.find(p => p.id === deleteProjectId)?.title || 'this project'}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteProjectId(null)}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};

export default Projects;