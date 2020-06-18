import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import {
  setupTestEnvironment,
  TestEnvironment
} from 'serverless-software-license';
import {
  RPC_HOST,
  PRIVATE_KEY,
  USE_SIGNER,
  MNEMONIC,
  USE_TEST_ENVIRONMENT,
  CONTRACT_ADDRESS
} from '../../config';

interface BlockchainContext {
  isReady: boolean;
  provider: ethers.providers.Provider;
  signer?: ethers.Signer;
  contractAddress: string;
}

let testEnvironment: Promise<TestEnvironment>;

if (USE_TEST_ENVIRONMENT) {
  testEnvironment = setupTestEnvironment(MNEMONIC);
}

export default function useBlockchain(): BlockchainContext {
  // const provider = useMemo(
  //   () => new ethers.providers.JsonRpcProvider(RPC_HOST),
  //   []
  // );
  // const signer = useMemo(() => {
  // if (!PRIVATE_KEY || !USE_SIGNER) {
  //   return undefined;
  // }

  // return new ethers.Wallet(PRIVATE_KEY).connect(provider);
  // }, [provider]);

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

          if (USE_SIGNER) {
            setSigner(environment.getSigner(environment.deployerAddress));
          }

          setContractAddress(environment.contractAddress);
          setIsReady(true);

          console.log('Deployer address', environment.deployerAddress);
        })
        .catch(() => {
          console.log('Failed to setup test environment');
        });
    } else {
      const newProvider = new ethers.providers.JsonRpcProvider(RPC_HOST);
      setProvider(newProvider);

      if (PRIVATE_KEY && USE_SIGNER) {
        setSigner(new ethers.Wallet(PRIVATE_KEY).connect(newProvider));
      }

      setContractAddress(CONTRACT_ADDRESS);

      setIsReady(true);
    }
  }, []);

  return {
    isReady,
    provider,
    signer,
    contractAddress
  };
}
