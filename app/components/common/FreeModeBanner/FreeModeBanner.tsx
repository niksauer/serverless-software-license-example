import React from 'react';
import styles from './FreeModeBanner.scss';
import { useModal } from '../../provider/ModalProvider';

const FreeModeBanner: React.FC = () => {
  const { push: pushModal } = useModal();

  return (
    <div className={styles.freeModeBanner}>
      <div className={styles.tagline}>Free Mode</div>
      <button
        type="button"
        onClick={() =>
          pushModal(
            <div>
              <h2>Ready to go Premium?</h2>
              <span>
                You can either purchase a new license or restore a previous.
              </span>
            </div>
          )
        }
      >
        Unlock
      </button>
    </div>
  );
};

export default FreeModeBanner;
