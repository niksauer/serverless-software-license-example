import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, RouteComponentProps } from 'react-router-dom';
import styles from './PurchaseLicensePage.scss';
import AppRoute from '../../constants/AppRoute';

type LocationState = {
  previousPage?: string;
};

type Props = RouteComponentProps<{}, {}, LocationState>;

const PurchaseLicensePage: React.FC<Props> = ({ location }) => {
  return (
    <div className={styles.purchasePage}>
      <Link to={location.state?.previousPage ?? AppRoute.Home}>
        <FontAwesomeIcon icon="arrow-left" size="3x" />
      </Link>
      <h2>Purchase</h2>
    </div>
  );
};

export default PurchaseLicensePage;
