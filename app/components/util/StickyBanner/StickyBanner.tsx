import React from 'react';
import styles from './StickyBanner.scss';

const StickyBanner: React.FC = ({ children }) => {
  return <div className={styles.stickyBanner}>{children}</div>;
};

export default StickyBanner;
