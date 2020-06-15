import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import CounterPage from './pages/CounterPage';
import HomePage from './pages/HomePage/HomePage';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path={routes.COUNTER} component={CounterPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  );
};

export default Routes;
