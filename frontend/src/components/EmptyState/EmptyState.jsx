import styles from './EmptyState.module.css';

const EmptyState = ({ 
  variant = 'default', // 'project' or 'task'
  title = "No items found", 
  description = "Add your first item to get started",
  action,
  actionText 
}) => {

  const getImage = () => {
    switch(variant) {
      case 'project':
        return "/empty-projects.jpg";
      case 'task':
        return "/empty-tasks.png";
      default:
        return "/empty-state.png";
    }
  };

  return (
    <div className={styles.emptyState}>
      <img 
        src={getImage()} 
        alt="Empty state" 
        className={styles.emptyIllustration} 
      />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {action && (
        <button 
          className={styles.actionButton}
          onClick={action}
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;