import React, { useState, useContext, useCallback } from 'react';
import Modal, { ModalContentStyle } from '../util/Modal/Modal';
import { history } from '../../global';

interface ModalData {
  content: React.ReactNode;
  style?: ModalContentStyle;
  onClose?: () => void;
  lockFocus?: boolean;
}

interface ModalState {
  stack: ModalData[];
  push: (
    content: React.ReactNode,
    style?: ModalContentStyle,
    lockFocus?: boolean,
    onClose?: () => void
  ) => void;
  pop: () => void;
  flush: () => void;
}

const ModalContext = React.createContext<ModalState>({
  stack: [],
  push: () => null,
  pop: () => null,
  flush: () => null
});

const ModalProvider: React.FC = ({ children }) => {
  const [modals, setModals] = useState<ModalData[]>([]);

  const push = useCallback(
    (
      content: React.ReactNode,
      style?: ModalContentStyle,
      lockFocus?: boolean,
      onClose?: () => void
    ) => {
      setModals([{ content, style, lockFocus, onClose }, ...modals]);
    },
    [setModals, modals]
  );

  const pop = useCallback(() => {
    setModals(modals.slice(1));
  }, [setModals, modals]);

  const flush = useCallback(() => {
    setModals([]);
  }, [setModals]);

  history.listen(() => flush());

  return (
    <ModalContext.Provider value={{ stack: modals, push, pop, flush }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = (): ModalState => useContext(ModalContext);

const ModalRenderer: React.FC = () => {
  const { stack, pop } = useModal();
  const modalData = stack[0];

  if (!modalData) {
    return null;
  }

  return (
    <Modal
      key={stack.length}
      handleClose={() => {
        if (modalData.onClose) {
          modalData.onClose();
        }

        pop();
      }}
      render={() => modalData.content}
      style={modalData.style}
      lockFocus={modalData.lockFocus}
    />
  );
};

export { ModalProvider, ModalRenderer, useModal };
