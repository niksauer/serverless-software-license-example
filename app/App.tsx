import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

const App = () => (
  <Router>
    <Providers>
      <Routes />
    </Providers>
  </Router>
);

const Providers: React.FC = ({ children }) => {
  return <>{children}</>;
};

export default hot(App);
