import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import CounterPage from './pages/CounterPage';
import HomePage from './pages/HomePage';
import HotRouter from './utils/HotRouter';

const App: React.FC = () => {
  return (
    <HotRouter>
      <Providers>
        <Switch>
          <Route path={routes.COUNTER} component={CounterPage} />
          <Route path={routes.HOME} component={HomePage} />
        </Switch>
      </Providers>
    </HotRouter>
  );
};

const Providers: React.FC = ({ children }) => {
  return <>{children}</>;
};

export default App;
