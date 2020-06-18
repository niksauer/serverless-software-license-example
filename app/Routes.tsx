import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CounterPage from './pages/CounterPage/CounterPage';
import HomePage from './pages/HomePage/HomePage';
import AppRoute from './constants/AppRoute';
import RestoreLicensePage from './pages/RestoreLicensePage/RestoreLicensePage';
import PurchaseLicensePage from './pages/PurchaseLicensePage/PurchaseLicensePage';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path={AppRoute.Counter} component={CounterPage} />
      <Route path={AppRoute.PurchaseLicense} component={PurchaseLicensePage} />
      <Route path={AppRoute.RestoreLicense} component={RestoreLicensePage} />
      <Route path={AppRoute.Home} component={HomePage} />
    </Switch>
  );
};

export default Routes;
