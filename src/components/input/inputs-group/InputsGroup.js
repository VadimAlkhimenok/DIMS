import React from 'react';
import PropTypes from 'prop-types';
import classes from './InputsGroup.module.css';

export const InputsGroup = ({ children }) => <div className={classes.InputsGroup}>{children}</div>;

InputsGroup.propTypes = {
  children: PropTypes.node,
};
