import React from 'react';
import PropTypes from 'prop-types';
import classes from './Textarea.module.css';

export const Textarea = ({ name, handleChange, disabled, error, value, id }) => {
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
    </>
  );
};

Textarea.defaultProps = {
  name: 'Description',
  disabled: false,
  error: false,
  value: '',
};

Textarea.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
