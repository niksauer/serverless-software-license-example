import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import { LicenseProvider } from './components/provider/LicenseProvider';
import {
  ModalProvider,
  ModalRenderer
} from './components/provider/ModalProvider';
import ErrorBoundary from './components/util/ErrorBoundary';

const Providers: React.FC = ({ children }) => {
  return (
    <ModalProvider>
      <LicenseProvider>
        <>{children}</>
      </LicenseProvider>
    </ModalProvider>
  );
};

const App: React.FC = () => (
  <ErrorBoundary>
    <Router>
      <Providers>
        <Routes />
        <ModalRenderer />
      </Providers>
    </Router>
  </ErrorBoundary>
);

export default hot(App);
