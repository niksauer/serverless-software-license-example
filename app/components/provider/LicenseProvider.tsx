import React, { useState, useMemo, useEffect } from 'react';
import {
  LicenseManager,
  LicenseRegistry,
  LicenseManagerEvent,
  FileLicenseStorage
} from 'serverless-software-license';
import { ethers } from 'ethers';
import { remote } from 'electron';
import path from 'path';
import { RPC_HOST, CONTRACT_ADDRESS } from '../../environment';

interface LicenseState {
  isValid: boolean;
}

const LicenseContext = React.createContext<LicenseState>({
  isValid: false
});

export const LicenseProvider: React.FC = ({ children }) => {
  const [isValid, setIsValid] = useState(false);

  const provider = useMemo(
    () => new ethers.providers.JsonRpcProvider(RPC_HOST),
    []
  );
  const registry = useMemo(
    () => new LicenseRegistry(CONTRACT_ADDRESS, provider),
    [provider]
  );

  // https://www.electronjs.org/docs/api/app
  const storagePath = useMemo(
    () => path.join(remote.app.getPath('userData'), 'license.json'),
    []
  );
  const storage = useMemo(() => new FileLicenseStorage(storagePath), [
    storagePath
  ]);

  const manager = useMemo(() => new LicenseManager(registry, storage), [
    registry,
    storage
  ]);

  useEffect(() => {
    manager.emitter.on(
      LicenseManagerEvent.LicenseValidityChanged,
      (isLicenseValid: boolean) => {
        setIsValid(isLicenseValid);
      }
    );

    // manager.checkValidity();
  });

  return (
    <LicenseContext.Provider value={{ isValid }}>
      {children}
    </LicenseContext.Provider>
  );
};

export const useLicense = () => React.useContext(LicenseContext);
