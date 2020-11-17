import React from 'react';
import PropTypes from 'prop-types';
import classes from './ButtonGroupModal.module.css';

export const ButtonsGroupModal = ({ children }) => {
  return <div className={classes.ButtonsGroupModal}>{children}</div>;
};

ButtonsGroupModal.propTypes = {
  children: PropTypes.node,
};
