import React from 'react';
import Routes from '../Routes';
import { useLicense } from './provider/LicenseProvider';
import StickyBanner from './util/StickyBanner/StickyBanner';
import FreeModeBanner from './common/FreeModeBanner/FreeModeBanner';
import styles from './Dashboard.scss';

const Dashboard: React.FC = () => {
  const { isValid } = useLicense();

  return (
    <div className={styles.dashboard}>
      {!isValid && (
        <StickyBanner>
          <FreeModeBanner />
        </StickyBanner>
      )}
      <div className={styles.content}>
        <Routes />
      </div>
    </div>
  );
};

export default Dashboard;
