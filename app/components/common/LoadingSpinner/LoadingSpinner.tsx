import React from 'react';
import styles from './LoadingSpinner.scss';

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.ring}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default LoadingSpinner;
