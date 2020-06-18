import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './RestorePage.scss';
import AppRoute from '../../constants/AppRoute';

type LocationState = {
  previousPage?: string;
};

type Props = RouteComponentProps<{}, {}, LocationState>;

const RestorePage: React.FC<Props> = ({ location }) => {
  return (
    <div className={styles.restorePage}>
      <Link to={location.state.previousPage ?? AppRoute.Home}>
        <FontAwesomeIcon icon="arrow-left" size="3x" />
      </Link>
      <h2>Restore</h2>
      <p>Please enter the Ethereum address used to purchase your license:</p>
    </div>
  );
};

export default RestorePage;
