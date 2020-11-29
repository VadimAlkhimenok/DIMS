import React from 'react';
import classes from './Status.module.css';
import ErrorIcon from '../icons/ErrorIcon';
import SuccessIcon from '../icons/SuccessIcon';

export const Status = ({ message, isError }) => {
  return (
    <div className={classes.Wrapper}>
      <div className={classes.Status}>
        {isError ? <ErrorIcon /> : <SuccessIcon />}
        {message}
      </div>
    </div>
  );
};

Status.defaultProps = {
  message: '',
  isError: false,
};
