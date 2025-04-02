import { useState } from 'react';
import { FiCheck, FiEdit2, FiTrash2 } from 'react-icons/fi';
import styles from './TaskItem.module.css';
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';

const TaskItem = ({ 
  task, 
  onEdit, 
  onDelete, 
  onToggle,
  isDeleting,
  isToggling
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleToggle = async () => {
    if (!isToggling) {
      await onToggle(task.name, task.completed);
    }
  };

  return (
    <>
      <li className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}>
        <div className={styles.taskContent}>
          <button
            className={`${styles.checkbox} ${task.completed ? styles.checked : ''}`}
            onClick={handleToggle}
            disabled={isToggling}
            aria-label={task.completed ? 'Mark task incomplete' : 'Mark task complete'}
          >
            {task.completed && <FiCheck className={styles.checkIcon} />}
          </button>
          
          <span className={styles.taskName}>
            {task.name}
          </span>
        </div>

        <div className={styles.taskActions}>
          <button
            className={styles.editButton}
            onClick={() => onEdit(task)}
            disabled={isDeleting || isToggling}
            aria-label="Edit task"
          >
            <FiEdit2 />
          </button>
          
          <button
            className={styles.deleteButton}
            onClick={() => setShowDeleteConfirm(true)}
            disabled={isDeleting || isToggling}
            aria-label="Delete task"
          >
            {isDeleting ? '...' : <FiTrash2 />}
          </button>
        </div>
      </li>
      
      {showDeleteConfirm && (
        <DeleteConfirmation
          itemName={task.name}
          onConfirm={() => {
            onDelete(task.name);
            setShowDeleteConfirm(false);
          }}
          onCancel={() => setShowDeleteConfirm(false)}
          isDeleting={isDeleting}
        />
      )}
    </>
  );
};

export default TaskItem;