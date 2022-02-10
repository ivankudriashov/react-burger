import ReactDOM from 'react-dom'

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import modalStyles from './modal.module.css';

import ModalOverlay from '../modalOverlay/modalOverlay';

import { FC, useEffect } from 'react';

import { TModalProps } from '../../services/types/types';

const modalRoot = document.getElementById("react-modals");

const Modal: FC<TModalProps> = ({onClose, children}) => {

  if (!modalRoot) {
    throw new Error("The element #portal wasn't found");
  }

  useEffect(() => {
      const close = (e: { key: string; }) => {
        if(e.key === "Escape"){
          onClose();
        }
      }
      window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  },[onClose]);

  return ReactDOM.createPortal((
      <div className={modalStyles.popup} onClick={onClose}>
          <ModalOverlay />
          <div className={modalStyles.modal} onClick={(evt) => {
              evt.stopPropagation()}}>
              <div className={modalStyles.cross} onClick={onClose}>
                  <CloseIcon type="primary"/>
              </div>
              {children}
          </div>
      </div>
    ),
    modalRoot
  )
}

export default Modal;