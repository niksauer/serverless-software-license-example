import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.scss';
import routes from '../../constants/routes.json';

export default function HomePage() {
  return (
    <div className={styles.container} data-tid="container">
      <h2>Home</h2>
      <Link to={routes.COUNTER}>to Counter</Link>
    </div>
  );
}
