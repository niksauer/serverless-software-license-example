import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ethers, BigNumber } from 'ethers';
import TextareaAutosize from 'react-textarea-autosize';
import {
  relayTransaction,
  LicenseTokenEvent
} from 'serverless-software-license';
import AppRoute from '../../constants/AppRoute';
import { useLicense } from '../../components/provider/LicenseProvider';
import styles from './PurchaseLicensePage.scss';
import useBlockchain from '../../components/hooks/useBlockchain';
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner';
import { ALLOW_SIGNER } from '../../config';

type LocationState = {
  previousPage?: string;
};

type Props = RouteComponentProps<{}, {}, LocationState>;

const PurchaseLicensePage: React.FC<Props> = ({ location }) => {
  const { registry: licenseRegistry, activate: activateLicense } = useLicense();
  const { provider, signer } = useBlockchain();

  const [licensePrice, setLicensePrice] = useState<BigNumber>(
    BigNumber.from(0)
  );
  const [customLicensePrice, setCustomLicensePrice] = useState(licensePrice);

  const formatPrice = useCallback(
    weiAmount => ethers.utils.formatEther(weiAmount),
    []
  );

  const [address, setAddress] = useState('');
  const isValidAddress = useMemo(
    () => address !== '' && ethers.utils.isAddress(address),
    [address]
  );

  const [licensePriceLookupFailed, setLicensePriceLookupFailed] = useState(
    false
  );
  const [showTransactionGenerator, setShowTransactionGenerator] = useState(
    false
  );
  const [
    transactionGenerationFailed,
    setTransactionGenerationFailed
  ] = useState(false);
  const [showTransactionRelayer, setShowTransactionRelayer] = useState(false);
  const [transactionRelayFailed, setTransactionRelayFailed] = useState(false);

  const [unsignedTransaction, setUnsignedTransaction] = useState<
    ethers.UnsignedTransaction
  >();
  const [signedTransaction, setSignedTransaction] = useState<string>('');
  const [pendingTransaction, setPendingTransaction] = useState<
    ethers.Transaction
  >();
  const [isAwaitingTransaction, setIsAwaitingTransation] = useState(false);
  const [transactionConfirmed, setTransactionConfirmed] = useState(false);

  const onGenerate = useCallback(() => {
    licenseRegistry
      .generatePurchaseTransaction(address)
      .then(newUnsignedTransaction => {
        setUnsignedTransaction(newUnsignedTransaction);
        setShowTransactionGenerator(false);
        setShowTransactionRelayer(true);
      })
      .catch(() => {
        setTransactionGenerationFailed(true);
      });
  }, [
    setShowTransactionRelayer,
    address,
    setShowTransactionGenerator,
    setUnsignedTransaction,
    setTransactionGenerationFailed,
    licenseRegistry
  ]);

  const listenForConfirmation = useCallback(() => {
    licenseRegistry.subscribe(
      LicenseTokenEvent.LicensePurchased,
      (newPurchaseAddress, event) => {
        if (
          newPurchaseAddress === address ||
          event.transactionHash === pendingTransaction?.hash
        ) {
          setIsAwaitingTransation(false);
          setTransactionConfirmed(true);

          // TODO: store in manager
        }
      }
    );
  }, [
    licenseRegistry,
    pendingTransaction,
    address,
    setTransactionConfirmed,
    unsignedTransaction,
    signedTransaction
  ]);

  const onSign = useCallback(() => {
    if (!unsignedTransaction || !signer) {
      return;
    }

    // if (DIRECT_PURCHASE) {
    //   // signing transactions is not supported with default ganache signer
    //   listenForConfirmation();

    //   licenseRegistry
    //     .purchaseLicense(address, customLicensePrice)
    //     .then(transaction => {
    //       setPendingTransaction(transaction);
    //       setIsAwaitingTransation(true);
    //     })
    //     .catch(() => {
    //       setTransactionRelayFailed(true);
    //     });

    //   return;
    // }

    signer
      .populateTransaction(unsignedTransaction)
      .then(() => {
        signer
          .getTransactionCount()
          .then(nonce => {
            // hot fix for ganache
            unsignedTransaction.nonce = nonce;
            unsignedTransaction.gasLimit = Number.MAX_SAFE_INTEGER - 10;

            signer
              .signTransaction(unsignedTransaction)
              .then(newSignedTransaction => {
                setSignedTransaction(newSignedTransaction);
              })
              .catch(error => {
                console.log('Error signing transaction', error);
              });
          })
          .catch(error => {
            console.log('Error getting transction count', error);
          });
      })
      .catch(error => {
        console.log('Error populating transaction', error);
      });
  }, [
    unsignedTransaction,
    signer,
    setSignedTransaction
    // licenseRegistry,
    // listenForConfirmation,
    // setTransactionRelayFailed,
    // setIsAwaitingTransation,
    // setPendingTransaction,
    // signedTransaction
  ]);

  const onRelay = useCallback(() => {
    listenForConfirmation();

    relayTransaction(provider, signedTransaction)
      .then(transaction => {
        setPendingTransaction(transaction);
        setIsAwaitingTransation(true);
      })
      .catch(error => {
        console.log('Error relaying transaction', error);
        setTransactionRelayFailed(true);
      });
  }, [
    setTransactionRelayFailed,
    setIsAwaitingTransation,
    setPendingTransaction,
    signedTransaction,
    provider,
    listenForConfirmation
  ]);

  useEffect(() => {
    licenseRegistry
      .licensePrice()
      .then(price => {
        setLicensePrice(price);
        setCustomLicensePrice(price);
      })
      .catch(() => {
        setLicensePriceLookupFailed(true);
      });
  }, [
    licenseRegistry,
    setLicensePrice,
    setCustomLicensePrice,
    setLicensePriceLookupFailed
  ]);

  let element: React.ReactNode;

  if (licensePriceLookupFailed) {
    element = (
      <>
        <span
          role="img"
          aria-label="Failed License Price Lookup"
          className={styles.emoji}
        >
          😐
        </span>
        <p>
          Oops, something went wrong while looking up the current price of a
          license...
        </p>
      </>
    );
  } else if (showTransactionGenerator && !transactionGenerationFailed) {
    element = (
      <>
        <p>The price of a single license is:</p>
        <div className={styles.priceContainer}>
          <p>{formatPrice(licensePrice)} ETH</p>
        </div>
        <p>
          If you would like to give a tip, please enter a higher amount below:
        </p>
        <input
          type="text"
          value={formatPrice(customLicensePrice)}
          onChange={event => {
            try {
              const parsedWeiAmount = ethers.utils.parseEther(
                event.target.value
              );

              if (parsedWeiAmount.gte(licensePrice)) {
                setCustomLicensePrice(parsedWeiAmount);
              }
              // eslint-disable-next-line no-empty
            } catch {}
          }}
          className={styles.addressInput}
        />
        <p>
          A contract transaction with appropriate details will be generated that
          you can populate, sign and relay from here afterwards.
        </p>
        <button type="button" onClick={onGenerate}>
          Generate Transaction
        </button>
      </>
    );
  } else if (transactionGenerationFailed) {
    element = (
      <>
        <span
          role="img"
          aria-label="Failed Transaction Generation"
          className={styles.emoji}
        >
          😐
        </span>
        <p>Oops, something went wrong while generating the transaction...</p>
      </>
    );
  } else if (
    showTransactionRelayer &&
    !transactionRelayFailed &&
    !isAwaitingTransaction &&
    !transactionConfirmed
  ) {
    element = (
      <>
        <p>Please sign the following transaction...</p>
        <TextareaAutosize
          value={unsignedTransaction?.data?.toString()}
          readOnly
          className={styles.transaction}
        />
        <p>...and input the result below:</p>
        <TextareaAutosize
          value={signedTransaction}
          onChange={event => setSignedTransaction(event.target.value)}
          className={styles.transaction}
        />
        <button
          type="button"
          onClick={onRelay}
          disabled={signedTransaction === ''}
        >
          Relay Transaction
        </button>
        {ALLOW_SIGNER && signer && (
          <button type="button" onClick={onSign} className={styles.signButton}>
            Use Signer
          </button>
        )}
      </>
    );
  } else if (transactionRelayFailed) {
    element = (
      <>
        <span
          role="img"
          aria-label="Failed Transaction Relay"
          className={styles.emoji}
        >
          😐
        </span>
        <p>Oops, something went wrong while relaying the transaction...</p>
      </>
    );
  } else if (isAwaitingTransaction) {
    element = (
      <>
        <LoadingSpinner />
        <p>Waiting for transaction confirmation...</p>
      </>
    );
  } else if (transactionConfirmed) {
    element = (
      <>
        <span
          role="img"
          aria-label="Successful Activation"
          className={styles.emoji}
        >
          🎉
        </span>
        <p>You&apos;re license was successfully activated.</p>
      </>
    );
  } else {
    element = (
      <>
        <p>
          Please enter the Ethereum address for which you would like to purchase
          a license.
        </p>
        <p className={styles.importantParagraph}>
          <span>Important:</span> You must have access to its private key to
          restore the license in the future.
        </p>
        <input
          type="text"
          value={address}
          onChange={event => {
            setAddress(event.target.value);
          }}
          className={styles.addressInput}
        />
        <button
          type="button"
          disabled={!isValidAddress}
          onClick={() => {
            setShowTransactionGenerator(true);
          }}
        >
          Next
        </button>
      </>
    );
  }

  return (
    <div className={styles.purchasePage}>
      <Link to={location.state?.previousPage ?? AppRoute.Home}>
        <FontAwesomeIcon icon="arrow-left" size="3x" />
      </Link>
      <h2>Purchase</h2>
      {element}
    </div>
  );
};

export default PurchaseLicensePage;
