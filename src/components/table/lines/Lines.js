import React from 'react';
import PropTypes from 'prop-types';
import classes from './Lines.module.css';

export const Lines = ({ children }) => <div className={classes.Lines}>{children}</div>;

Lines.propTypes = {
  children: PropTypes.node.isRequired,
};
