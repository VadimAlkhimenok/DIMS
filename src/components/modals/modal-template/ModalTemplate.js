import React from 'react';
import classes from './ModalTemplate.module.css';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../../context/Contexts';

export const ModalTemplate = ({ children, handleOpenCloseModal, handleSubmit }) => {
  return (
    <ThemeContext.Consumer>
      {isBlack => (
        <>
          <div className={isBlack ? classes.WrapperBlack : classes.Wrapper} onClick={handleOpenCloseModal} />
          <form
            onSubmit={handleSubmit}
            className={isBlack ? classes.ModalTemplateBlack : classes.ModalTemplate}
          >
            <span className={classes.Cross} onClick={handleOpenCloseModal}>
              &times;
            </span>
            {children}
          </form>
        </>
      )}
    </ThemeContext.Consumer>
  );
};

ModalTemplate.propTypes = {
  handleOpenCloseModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  children: PropTypes.node.isRequired,
};
