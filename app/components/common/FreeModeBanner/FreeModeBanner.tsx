import React from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../../provider/ModalProvider';
import styles from './FreeModeBanner.scss';
import AppRoute from '../../../constants/AppRoute';

const GoPremiumPopup: React.FC = () => {
  return (
    <div>
      <h2>Ready to go Premium?</h2>
      <span>
        You can either <Link to={AppRoute.Purchase}>purchase</Link> a new
        license or <Link to={AppRoute.Restore}>restore</Link> a previous.
      </span>
    </div>
  );
};

const FreeModeBanner: React.FC = () => {
  const { push: pushModal } = useModal();

  return (
    <div className={styles.freeModeBanner}>
      <div className={styles.tagline}>
        <Link to={AppRoute.Home}>Free Mode</Link>
      </div>
      <button type="button" onClick={() => pushModal(<GoPremiumPopup />)}>
        Unlock
      </button>
    </div>
  );
};

export default FreeModeBanner;
