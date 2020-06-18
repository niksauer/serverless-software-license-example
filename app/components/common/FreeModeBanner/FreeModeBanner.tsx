import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useModal } from '../../provider/ModalProvider';
import styles from './FreeModeBanner.scss';
import AppRoute from '../../../constants/AppRoute';

const GoPremiumPopup: React.FC = () => {
  const location = useLocation();

  return (
    <div>
      <h2>Ready to go Premium?</h2>
      <span>
        You can either{' '}
        <Link
          to={{
            pathname: AppRoute.PurchaseLicense,
            state: { previousPage: location.pathname }
          }}
        >
          purchase
        </Link>{' '}
        a new license or{' '}
        <Link
          to={{
            pathname: AppRoute.RestoreLicense,
            state: { previousPage: location.pathname }
          }}
        >
          restore
        </Link>{' '}
        a previous.
      </span>
    </div>
  );
};

const FreeModeBanner: React.FC = () => {
  const { push: pushModal } = useModal();

  return (
    <div className={styles.freeModeBanner}>
      <div className={styles.tagline}>Free Mode</div>
      <button type="button" onClick={() => pushModal(<GoPremiumPopup />)}>
        Unlock
      </button>
    </div>
  );
};

export default FreeModeBanner;
