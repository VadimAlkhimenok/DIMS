import React from 'react';
import PropTypes from 'prop-types';
import classes from './ButtonsGroupModal.module.css';

export const ButtonsGroup = ({ children }) => {
  return <div className={classes.ButtonsGroup}>{children}</div>;
};

ButtonsGroup.propTypes = {
  children: PropTypes.node,
};
