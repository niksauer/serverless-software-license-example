import React, { useMemo } from 'react';
import { hot } from 'react-hot-loader/root';
import { Router } from 'react-router-dom';
import { FileLicenseStorage } from 'serverless-software-license';
import { LicenseProvider } from './components/provider/LicenseProvider';
import {
  ModalProvider,
  ModalRenderer
} from './components/provider/ModalProvider';
import ErrorBoundary from './components/util/ErrorBoundary';
import Dashboard from './components/Dashboard';
import { history } from './global';
import { LICENSE_PATH, DIRECT_PURCHASE } from './config';
import useBlockchain from './components/hooks/useBlockchain';
import LoadingSpinner from './components/common/LoadingSpinner/LoadingSpinner';

const Providers: React.FC = ({ children }) => {
  const { isReady, provider, signer, contractAddress } = useBlockchain();
  const storage = useMemo(() => new FileLicenseStorage(LICENSE_PATH), []);

  if (!isReady) {
    return <LoadingSpinner />;
  }

  return (
    <ModalProvider>
      <LicenseProvider
        storage={storage}
        provider={provider}
        contractAdddress={contractAddress}
        signer={DIRECT_PURCHASE ? signer : undefined}
      >
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
