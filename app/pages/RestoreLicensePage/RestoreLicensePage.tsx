import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ethers } from 'ethers';
import AppRoute from '../../constants/AppRoute';
import { useLicense } from '../../components/provider/LicenseProvider';
import { LoadStatus } from '../../utils/load-status';
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner';
import styles from './RestoreLicensePage.scss';

type LocationState = {
  previousPage?: string;
};

type Props = RouteComponentProps<{}, {}, LocationState>;

const RestoreLicensePage: React.FC<Props> = ({ location }) => {
  const {
    status: licenseStatus,
    activationStatus: licenseActivationStatus,
    isValid: isLicenseValid,
    startActivation,
    completeActivation,
    stopActivation,
    registry
  } = useLicense();

  const [address, setAddress] = useState('');
  const isValidAddress = useMemo(
    () => address !== '' && ethers.utils.isAddress(address),
    [address]
  );

  const [isCheckingRegistry, setIsCheckingRegistry] = useState(false);
  const [completedRegistryLookup, setCompletedRegistryLookup] = useState(false);
  const [registryLookupFailed, setRegistryLookupFailed] = useState(false);
  const [addressHasLicense, setAddressHasLicense] = useState(false);

  const [challenge, setChallenge] = useState('');
  const [response, setResponse] = useState('');

  const onNext = useCallback(() => {
    setIsCheckingRegistry(true);

    registry
      .hasLicense(address)
      .then(hasLicense => {
        setIsCheckingRegistry(false);
        setCompletedRegistryLookup(true);
        setAddressHasLicense(hasLicense);

        if (hasLicense) {
          // setChallenge(startActivation(address));
          setChallenge('0x034u0');
        }
      })
      .catch(() => {
        setIsCheckingRegistry(false);
        setRegistryLookupFailed(true);
      });
  }, [address]);

  useEffect(() => {
    // unmount hook
    return () => {
      stopActivation();
    };
  }, []);

  let element: React.ReactNode;

  if (licenseStatus !== LoadStatus.Loading && isLicenseValid) {
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
  } else if (
    licenseStatus === LoadStatus.Loading ||
    licenseActivationStatus === LoadStatus.Loading
  ) {
    element = (
      <>
        <LoadingSpinner />
        <p>You&apos;re license is being activated...</p>
      </>
    );
  } else if (licenseActivationStatus === LoadStatus.Error) {
    element = (
      <>
        <span
          role="img"
          aria-label="Failed Activation"
          className={styles.emoji}
        >
          😐
        </span>
        <p>Sorry, you&apos;re license couldn&apos;t be activated.</p>
      </>
    );
  } else if (isCheckingRegistry) {
    element = (
      <>
        <LoadingSpinner />
        <p>Checking if license exists for this address...</p>
      </>
    );
  } else if (registryLookupFailed) {
    element = (
      <>
        <span
          role="img"
          aria-label="Failed Activation"
          className={styles.emoji}
        >
          😐
        </span>
        <p>Oops, something went wrong while looking up the registry...</p>
      </>
    );
  } else if (completedRegistryLookup && !addressHasLicense) {
    element = (
      <>
        <p>
          No license has been associated with this address.
          <br />
          <br />
          Click <Link to={AppRoute.PurchaseLicense}>here</Link> to purchase a
          license.
        </p>
      </>
    );
  } else if (completedRegistryLookup && addressHasLicense) {
    element = (
      <>
        <p>
          To verify that you&apos;re the owner of this address, please sign the
          following data...
        </p>
        <textarea value={challenge} readOnly className={styles.challenge} />
        <p>...and input the result below:</p>
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
        </button>
      </>
    );
  } else {
    element = (
      <>
        <p>Please enter the Ethereum address used to purchase your license:</p>
        <input
          type="text"
          value={address}
          onChange={event => {
            setAddress(event.target.value);
          }}
          className={styles.addressInput}
        />
        <button type="button" disabled={!isValidAddress} onClick={onNext}>
          Next
        </button>
      </>
    );
  }

  return (
    <div className={styles.restoreLicensePage}>
      <Link to={location.state?.previousPage ?? AppRoute.Home}>
        <FontAwesomeIcon icon="arrow-left" size="3x" />
      </Link>
      <h2>Restore</h2>
      {element}
    </div>
  );
};

export default RestoreLicensePage;
