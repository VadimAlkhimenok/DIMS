import React from 'react';
import PropTypes from 'prop-types';
import classes from './ButtonMain.module.css';

export const ButtonMain = ({ children }) => <div className={classes.ButtonMain}>{children}</div>;

ButtonMain.propTypes = {
  children: PropTypes.node,
};
