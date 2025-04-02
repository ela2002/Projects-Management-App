import styles from './ProjectCard.module.css';
import { FiEdit, FiTrash2, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ 
  project, 
  onEdit, 
  onDelete 
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.projectCard}>
      <div className={styles.cardHeader}>
        <div className={`${styles.priorityBadge} ${styles[project.priority || 'medium']}`}>
          {project.priority || 'Medium'}
        </div>
        <div className={styles.cardActions}>
          <button 
            className={styles.iconButton}
            onClick={() => onEdit(project)}
            aria-label="Edit project"
          >
            <FiEdit />
          </button>
          <button 
            className={styles.iconButton}
            onClick={() => onDelete(project.id)}
            aria-label="Delete project"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      <h3 className={styles.projectTitle}>{project.title}</h3>
      <p className={styles.projectDescription}>{project.description}</p>

      <div className={styles.cardFooter}>
        <div className={styles.dueDate}>
          <FiCalendar />
          {new Date(project.dueDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </div>
        <button 
          className={styles.viewButton}
          onClick={() => navigate(`/projects/${project.id}`)}
        >
          View Tasks <FiCheckCircle />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;