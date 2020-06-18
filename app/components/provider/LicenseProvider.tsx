import React, { useMemo, useEffect, useCallback, useReducer } from 'react';
import {
  LicenseManager,
  LicenseRegistry,
  // LicenseManagerEvent,
  FileLicenseStorage,
  AddressOwnershipChallenge,
  ILicenseRegistry
} from 'serverless-software-license';
import { ethers } from 'ethers';
import { remote } from 'electron';
import path from 'path';
import { RPC_HOST, CONTRACT_ADDRESS } from '../../environment';
import reducer, { LoadStatus, LoadActionType } from '../../utils/load-status';

interface LicenseState {
  status: LoadStatus;
  isValid: boolean;
  registry: ILicenseRegistry;
}

interface LicenseActivationState {
  activationStatus: LoadStatus;
  activate: (challenge: AddressOwnershipChallenge, response: string) => void;
  startActivation: (address: string) => string;
  completeActivation: (response: string) => void;
  stopActivation: () => void;
}

const LicenseContext = React.createContext<
  LicenseState & LicenseActivationState
>({
  status: LoadStatus.None,
  isValid: false,
  registry: {} as ILicenseRegistry,

  activationStatus: LoadStatus.None,
  activate: () => null,
  startActivation: () => '',
  completeActivation: () => null,
  stopActivation: () => null
});

export const LicenseProvider: React.FC = ({ children }) => {
  // MARK: - License
  const stateReducer = reducer<boolean, { isValid: boolean }>(
    (isValid: boolean) => {
      return { isValid };
    }
  );

  const [state, dispatch] = useReducer(stateReducer, {
    status: LoadStatus.None,
    isValid: false
  });

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
    // manager.emitter.on(
    //   LicenseManagerEvent.LicenseValidityChanged,
    //   (isValid: boolean) => {
    //     dispatch({ type: LoadActionType.End, payload: isValid });
    //   }
    // );

    dispatch({ type: LoadActionType.Begin });

    manager
      .checkValidity()
      .then(isLicenseValid =>
        dispatch({ type: LoadActionType.End, payload: isLicenseValid })
      )
      .catch(() => dispatch({ type: LoadActionType.Fail }));

    // return () => {
    //   manager.emitter.removeAllListeners();
    // };
  }, []);

  // MARK: - Activation
  const activationStateReducer = reducer<boolean, {}>(isLicenseValid => {
    dispatch({ type: LoadActionType.End, payload: isLicenseValid });

    return {};
  });

  const [activationState, activationDispatch] = useReducer(
    activationStateReducer,
    {
      status: LoadStatus.None
    }
  );

  const activate = useCallback(
    (challenge: AddressOwnershipChallenge, response: string) => {
      activationDispatch({ type: LoadActionType.Begin });

      manager
        .activate(challenge, response)
        .then(isLicenseValid =>
          activationDispatch({
            type: LoadActionType.End,
            payload: isLicenseValid
          })
        )
        .catch(() => activationDispatch({ type: LoadActionType.Fail }));
    },
    [manager]
  );

  const startActivation = useCallback(
    (address: string) => {
      return manager.startActivation(address);
    },
    [manager]
  );

  const completeActivation = useCallback(
    (challengeResponse: string) => {
      activationDispatch({ type: LoadActionType.Begin });

      // try {
      manager
        .completeActivation(challengeResponse)
        .then(isLicenseValid =>
          activationDispatch({
            type: LoadActionType.End,
            payload: isLicenseValid
          })
        )
        .catch(() => activationDispatch({ type: LoadActionType.Fail }));
      // } catch {
      //   activationDispatch({ type: LoadActionType.Fail });
      // }
    },
    [manager]
  );

  const stopActivation = useCallback(() => {
    // manager.stopActivation(); // not implemented
    activationDispatch({ type: LoadActionType.Reset });
  }, [manager]);

  return (
    <LicenseContext.Provider
      value={{
        ...state,
        registry,
        activationStatus: activationState.status,
        activate,
        startActivation,
        completeActivation,
        stopActivation
      }}
    >
      {children}
    </LicenseContext.Provider>
  );
};

export const useLicense = () => React.useContext(LicenseContext);
