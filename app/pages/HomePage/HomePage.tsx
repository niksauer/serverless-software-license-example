import React from 'react';
import { Link } from 'react-router-dom';
import AppRoute from '../../constants/AppRoute';
import styles from './HomePage.scss';
import { useLicense } from '../../components/provider/LicenseProvider';

const HomePage: React.FC = () => {
  const { reset: resetLicense, isValid } = useLicense();

  return (
    <div className={styles.homePage}>
      <h2>Home</h2>
      <Link to={AppRoute.Counter}>to Counter</Link>
      <div className={styles.stretcher} />
      {isValid && (
        <button type="submit" onClick={resetLicense}>
          Reset License
        </button>
      )}
    </div>
  );
};

export default HomePage;
