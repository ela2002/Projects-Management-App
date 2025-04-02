import { FiAlertTriangle, FiX, FiTrash2 } from 'react-icons/fi';
import styles from './DeleteConfirmation.module.css';

const DeleteConfirmation = ({ 
  itemName,
  onConfirm, 
  onCancel,
  isDeleting 
}) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.confirmationCard}>
        <div className={styles.header}>
          <FiAlertTriangle className={styles.warningIcon} />
          <h3 className={styles.title}>Confirm Deletion</h3>
          <button onClick={onCancel} className={styles.closeButton}>
            <FiX />
          </button>
        </div>
        
        <div className={styles.content}>
          <p className={styles.message}>
            Are you sure you want to delete 
            <span className={styles.highlight}> "{itemName}"</span>?
          </p>
          <p className={styles.note}>
            <FiAlertTriangle className={styles.noteIcon} />
            This action cannot be undone.
          </p>
        </div>
        
        <div className={styles.footer}>
          <button 
            onClick={onCancel}
            className={styles.secondaryButton}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className={styles.dangerButton}
            disabled={isDeleting}
          >
            <FiTrash2 className={styles.buttonIcon} />
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;