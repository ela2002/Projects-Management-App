import styles from './LoadingSpinner.module.css';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}></div>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default LoadingSpinner;