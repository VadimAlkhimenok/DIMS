import React from 'react';
import classes from './ModalTemplate.module.css';
import PropTypes from 'prop-types';

export const ModalTemplate = ({ children, handleOpenCloseModal, handleSubmit }) => {
  return (
    <>
      <div className={classes.Wrapper} onClick={handleOpenCloseModal} />
      <form onSubmit={handleSubmit} className={classes.ModalTemplate}>
        <span className={classes.Cross} onClick={handleOpenCloseModal}>
          &times;
        </span>
        {children}
      </form>
    </>
  );
};

ModalTemplate.propTypes = {
  handleOpenCloseModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  children: PropTypes.node.isRequired,
};
