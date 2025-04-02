import { useState } from 'react';
import styles from './ProjectForm.module.css';

const ProjectForm = ({ 
  initialData = null, 
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    dueDate: initialData?.dueDate?.split('T')[0] || '',
    priority: initialData?.priority || 'medium'
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.projectForm}>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="title">Project Title*</label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className={errors.title ? styles.errorInput : styles.input}
          placeholder="Enter project title"
        />
        {errors.title && <span className={styles.errorText}>{errors.title}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>Description*</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className={`${styles.textarea} ${errors.description ? styles.errorInput : ''}`}
          placeholder="Describe your project..."
          rows={4}
        />
        {errors.description && <span className={styles.errorText}>{errors.description}</span>}
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="dueDate" className={styles.label}>Due Date*</label>
          <input
            id="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
            className={errors.dueDate ? styles.errorInput : styles.input}
            min={new Date().toISOString().split('T')[0]}
          />
          {errors.dueDate && <span className={styles.errorText}>{errors.dueDate}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Priority</label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({...formData, priority: e.target.value})}
            className={styles.selectInput}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className={styles.formActions}>
        <button 
          type="button"
          className={styles.secondaryButton}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button 
          type="submit"
          className={styles.primaryButton}
        >
          {initialData ? 'Update Project' : 'Create Project'}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;