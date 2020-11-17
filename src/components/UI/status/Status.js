import React from 'react';
import classes from './Status.module.css';
import PropTypes from 'prop-types';
import ErrorIcon from '../icons/ErrorIcon';
import SuccessIcon from '../icons/SuccessIcon';

export const Status = ({ message, isStatus }) => {
  return (
    <div className={classes.Wrapper}>
      <div className={classes.Status}>
        {isStatus ? <SuccessIcon /> : <ErrorIcon />}
        {message}
      </div>
    </div>
  );
};

Status.defaultProps = {
  message: '',
};

Status.propTypes = {
  isStatus: PropTypes.bool.isRequired,
};