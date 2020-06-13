import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

const Providers: React.FC = ({ children }) => {
  return <>{children}</>;
};

const App: React.FC = () => (
  <Router>
    <Providers>
      <Routes />
    </Providers>
  </Router>
);

export default hot(App);
