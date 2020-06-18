import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Routes from '../Routes';
import { useLicense } from './provider/LicenseProvider';
import StickyBanner from './util/StickyBanner/StickyBanner';
import FreeModeBanner from './common/FreeModeBanner/FreeModeBanner';
import styles from './Dashboard.scss';
import { LoadStatus } from '../utils/load-status';

const Dashboard: React.FC = () => {
  const { isValid, status: licenseStatus } = useLicense();
  const location = useLocation();

  const isLicenseValid = useMemo(
    () => isValid && licenseStatus !== LoadStatus.Loading,
    []
  );
  const showFreeModeBanner = useMemo(
    () =>
      !isLicenseValid && !['/purchase', '/restore'].includes(location.pathname),
    [isValid, location.pathname]
  );

  return (
    <div className={styles.dashboard}>
      {showFreeModeBanner && (
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
