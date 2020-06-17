import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Router } from 'react-router-dom';
import { LicenseProvider } from './components/provider/LicenseProvider';
import {
  ModalProvider,
  ModalRenderer
} from './components/provider/ModalProvider';
import ErrorBoundary from './components/util/ErrorBoundary';
import Dashboard from './components/Dashboard';
import { history } from './global';

const Providers: React.FC = ({ children }) => {
  return (
    <ModalProvider>
      <LicenseProvider>
        <>{children}</>
      </LicenseProvider>
    </ModalProvider>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router history={history}>
        <Providers>
          <Dashboard />
          <ModalRenderer />
        </Providers>
      </Router>
    </ErrorBoundary>
  );
};

export default hot(App);
