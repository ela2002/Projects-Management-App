import styles from './Modal.module.css';
import { FiX } from 'react-icons/fi';

const Modal = ({ title, onClose, children }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>{title}</h2>
          <button 
            className={styles.closeButton}
            onClick={onClose}
          >
            <FiX />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;