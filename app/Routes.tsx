import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CounterPage from './pages/CounterPage/CounterPage';
import HomePage from './pages/HomePage/HomePage';
import AppRoute from './constants/AppRoute';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path={AppRoute.Counter} component={CounterPage} />
      <Route path={AppRoute.Purchase} />
      <Route path={AppRoute.Restore} />
      <Route path={AppRoute.Home} component={HomePage} />
    </Switch>
  );
};

export default Routes;
