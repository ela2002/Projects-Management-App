import { useState, useEffect } from 'react';
import { FiSave, FiX } from 'react-icons/fi';
import styles from './TaskForm.module.css';

const TaskForm = ({ 
  projectId, 
  initialData = null, 
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    completed: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Initialize form with initialData when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        completed: initialData.completed
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name.trim()) {
      setError('Task name is required');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        name: formData.name.trim()
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.error}>{error}</div>}
      
      <div className={styles.formGroup}>
        <label htmlFor="name">Task Name*</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          placeholder="Enter task description"
          autoFocus
        />
      </div>

      <div className={styles.checkboxGroup}>
        <input
          id="completed"
          name="completed"
          type="checkbox"
          checked={formData.completed}
          onChange={handleChange}
          className={styles.checkbox}
        />
        <label htmlFor="completed">Mark as completed</label>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={onCancel}
          className={styles.secondaryButton}
          disabled={isSubmitting}
        >
          <FiX /> Cancel
        </button>
        <button
          type="submit"
          className={styles.primaryButton}
          disabled={isSubmitting || !formData.name.trim()}
        >
          {isSubmitting ? (
            'Saving...'
          ) : (
            <>
              <FiSave /> {initialData ? 'Update Task' : 'Add Task'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;