import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const Router: React.FC<Props> = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

export default hot(Router);
