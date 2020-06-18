import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ethers, BigNumber } from 'ethers';
import AppRoute from '../../constants/AppRoute';
import { useLicense } from '../../components/provider/LicenseProvider';
import styles from './PurchaseLicensePage.scss';

type LocationState = {
  previousPage?: string;
};

type Props = RouteComponentProps<{}, {}, LocationState>;

const PurchaseLicensePage: React.FC<Props> = ({ location }) => {
  const { registry } = useLicense();

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
  const [rawTransaction, setRawTransaction] = useState<
    ethers.UnsignedTransaction
  >();

  const [showTransactionRelayer, setShowTransactionRelayer] = useState(false);
  const [
    transactionGenerationFailed,
    setTransactionGenerationFailed
  ] = useState(false);

  const onGenerate = useCallback(() => {
    registry
      .generatePurchaseTransaction(address, customLicensePrice)
      .then(rawTx => {
        setRawTransaction(rawTx);
        setShowTransactionRelayer(true);

        return null;
      })
      .catch(() => {
        setTransactionGenerationFailed(true);
      });
  }, [setShowTransactionRelayer]);

  useEffect(() => {
    registry
      .licensePrice()
      .then(price => {
        setLicensePrice(price);
        setCustomLicensePrice(price);

        return null;
      })
      .catch(() => {
        setLicensePriceLookupFailed(true);
      });
  }, []);

  let element: React.ReactNode;

  if (licensePriceLookupFailed) {
    element = (
      <>
        <span
          role="img"
          aria-label="Failed Activation"
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
          Click below to generate a contract transaction that you can sign and
          relay from here afterwards.
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
          aria-label="Failed Activation"
          className={styles.emoji}
        >
          😐
        </span>
        <p>Oops, something went wrong while generating the transaction...</p>
      </>
    );
  } else if (showTransactionRelayer) {
    element = (
      <>
        <p>
          Please sign the following transaction.
          {/* You can verify the details via  */}
        </p>
        {/* <textarea value={} readOnly className={styles.challenge} /> */}
        {/* <p>...and input the result below:</p>
        <textarea
          value={response}
          onChange={event => {
            setResponse(event.target.value);
          }}
          className={styles.response}
        />
        <button
          type="button"
          onClick={() => completeActivation(response)}
          disabled={response === ''}
        >
          Activate
        </button> */}
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
