import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import { FocusOn } from 'react-focus-on';
import styles from './Modal.scss';

export type ModalContentStyle = Pick<React.CSSProperties, 'width' | 'height'>;

interface WithFocusLockProps {
  activate: boolean;
  onEscapeKey?: (event: Event) => void;
  onClickOutside?: (event: MouseEvent | TouchEvent) => void;
  children: React.ReactNode;
}

const WithFocusLock: React.FC<WithFocusLockProps> = ({
  activate,
  onEscapeKey,
  onClickOutside,
  children
}) => {
  if (!activate) {
    return <>{children}</>;
  }

  return (
    <FocusOn onEscapeKey={onEscapeKey} onClickOutside={onClickOutside}>
      {children}
    </FocusOn>
  );
};

interface ModalProps {
  render: () => React.ReactNode;
  handleClose: () => void;
  style?: ModalContentStyle;
  lockFocus?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  handleClose,
  render,
  style,
  lockFocus = true
}) => {
  return (
    <div className={styles.overlay} data-testid="modalOverlay">
      <div className={cx(styles.modalContainer, 'container')}>
        <WithFocusLock
          activate={lockFocus}
          onEscapeKey={handleClose}
          onClickOutside={handleClose}
        >
          <div
            className={styles.modalContent}
            style={{ width: style?.width, height: style?.height }}
          >
            <div className={styles.header}>
              <button
                type="button"
                className={styles.closeButton}
                onClick={handleClose}
              >
                <FontAwesomeIcon icon="times" />
              </button>
            </div>
            <div className={styles.main}>{render()}</div>
          </div>
        </WithFocusLock>
      </div>
    </div>
  );
};

export default Modal;
