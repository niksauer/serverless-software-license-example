import React from 'react';
import { Link } from 'react-router-dom';
import AppRoute from '../../constants/AppRoute';
import styles from './HomePage.scss';

const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <h2>Home</h2>
      <Link to={AppRoute.Counter}>to Counter</Link>
    </div>
  );
};

export default HomePage;
