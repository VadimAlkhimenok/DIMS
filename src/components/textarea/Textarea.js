import React from 'react';
import PropTypes from 'prop-types';
import classes from './Textarea.module.css';

export const Textarea = ({ name, handleChange, disabled, errorMessage, error, value, id }) => {
  return (
    <>
      <textarea
        disabled={disabled}
        name={name}
        onChange={handleChange}
        placeholder={name}
        className={error ? classes.ErrorTextarea : classes.Textarea}
        value={value}
        id={id}
      />
      <small className={classes.ErrorMessage}>{error ? errorMessage : null}</small>
    </>
  );
};

Textarea.defaultProps = {
  name: 'Description',
  disabled: false,
  errorMessage: '',
  error: false,
  value: '',
};

Textarea.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
