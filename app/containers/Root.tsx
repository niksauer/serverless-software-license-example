import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../Routes';

const Root = () => (
  <Router>
    <Routes />
  </Router>
);

export default hot(Root);
