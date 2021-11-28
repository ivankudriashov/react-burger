import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import modalStyles from './modal.module.css';

import ModalOverlay from '../modalOverlay/modalOverlay';

const modalRoot = document.getElementById("root");

const Modal = (props) => {
  
    const { onClose } = props;

    React.useEffect(() => {
        const close = (e) => {
          if(e.keyCode === 27){
            onClose();
          }
        }
        window.addEventListener('keydown', close)
      return () => window.removeEventListener('keydown', close)
    },[]);

    return ReactDOM.createPortal((
        <div className={modalStyles.popup} onClick={onClose}>
            <ModalOverlay />
            <div className={modalStyles.modal} onClick={(evt) => {
                evt.stopPropagation()}}>
                <div className={modalStyles.cross} onClick={onClose}>
                    <CloseIcon type="primary"/>
                </div>
                {props.children}
            </div>
        </div>
      ),
      modalRoot
    )
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default Modal;