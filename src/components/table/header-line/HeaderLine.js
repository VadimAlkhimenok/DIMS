import React from 'react';
import PropTypes from 'prop-types';
import classes from './HeaderLine.module.css';

export const HeaderLine = ({ children }) => <div className={classes.HeaderLine}>{children}</div>;

HeaderLine.propTypes = {
  children: PropTypes.node,
};
