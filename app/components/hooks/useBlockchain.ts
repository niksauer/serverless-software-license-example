import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import {
  setupTestEnvironment,
  TestEnvironment
} from 'serverless-software-license';
import {
  RPC_HOST,
  PRIVATE_KEY,
  MNEMONIC,
  USE_TEST_ENVIRONMENT,
  CONTRACT_ADDRESS,
  ALLOW_SIGNER,
  USE_CONFIG_SIGNER
} from '../../config';

interface BlockchainContext {
  isReady: boolean;
  provider: ethers.providers.Provider;
  signer?: ethers.Signer;
  contractAddress: string;
}

let testEnvironment: Promise<TestEnvironment>;

if (USE_TEST_ENVIRONMENT) {
  testEnvironment = setupTestEnvironment({
    mnemonic: MNEMONIC,
    gasLimit: Number.MAX_SAFE_INTEGER
  });
}

export default function useBlockchain(): BlockchainContext {
  const [isReady, setIsReady] = useState(false);

  const [provider, setProvider] = useState<ethers.providers.Provider>(
    {} as ethers.providers.Provider
  );
  const [signer, setSigner] = useState<ethers.Signer>();
  const [contractAddress, setContractAddress] = useState('');

  useEffect(() => {
    if (USE_TEST_ENVIRONMENT) {
      testEnvironment
        .then(environment => {
          setProvider(environment.provider);

          if (ALLOW_SIGNER) {
            if (USE_CONFIG_SIGNER) {
              setSigner(
                new ethers.Wallet(PRIVATE_KEY).connect(environment.provider)
              );
            } else {
              setSigner(environment.getSigner(environment.deployerAddress));
            }
          }

          setContractAddress(environment.contractAddress);

          setIsReady(true);
        })
        .catch(() => {});
    } else {
      const newProvider = new ethers.providers.JsonRpcProvider(RPC_HOST);
      setProvider(newProvider);

      if (ALLOW_SIGNER) {
        setSigner(new ethers.Wallet(PRIVATE_KEY).connect(newProvider));
      }

      setContractAddress(CONTRACT_ADDRESS);

      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    signer?.getAddress().then(address => console.log(address));
  }, [signer]);

  return {
    isReady,
    provider,
    signer,
    contractAddress
  };
}
