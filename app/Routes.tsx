import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CounterPage from './pages/CounterPage/CounterPage';
import HomePage from './pages/HomePage/HomePage';
import AppRoute from './constants/AppRoute';
import RestorePage from './pages/RestorePage/RestorePage';
import PurchasePage from './pages/PurchasePage/PurchasePage';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path={AppRoute.Counter} component={CounterPage} />
      <Route path={AppRoute.Purchase} component={PurchasePage} />
      <Route path={AppRoute.Restore} component={RestorePage} />
      <Route path={AppRoute.Home} component={HomePage} />
    </Switch>
  );
};

export default Routes;
