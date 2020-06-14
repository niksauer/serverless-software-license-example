import React from 'react';
// import { LicenseManager, LicenseRegistry } from 'serverless-software-license';

interface LicenseState {
  isValid: boolean;
}

const LicenseContext = React.createContext<LicenseState>({
  isValid: false
});

export const LicenseProvider: React.FC = ({ children }) => {
  // const [isValid, setIsValid] = useState(false);
  // const registry = useMemo(() => new LicenseRegistry(''), []);
  // const manager = useMemo(() => new LicenseManager(), []);

  // useEffect(() => {
  //   manager.emitter.on(
  //     LicenseManagerEvent.LicenseValidityChanged,
  //     (isLicenseValid: boolean) => {
  //       setIsValid(isLicenseValid);
  //     }
  //   );

  //   manager.checkValidity();
  // });

  return (
    <LicenseContext.Provider value={{ isValid: false }}>
      {children}
    </LicenseContext.Provider>
  );
};

export const useLicense = () => React.useContext(LicenseContext);
