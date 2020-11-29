import React from 'react';
import PropTypes from 'prop-types';
import classes from './Input.module.css';

export const Input = ({ name, id, type, handleChange, disabled, error, important, value }) => (
  <div className={error && important ? classes.ErrorInputMain : classes.InputMain}>
    <label htmlFor={name} className={classes.Label}>
      {name}
      {important && <span className={classes.Important}>*</span>}
    </label>

    <input
      disabled={disabled}
      id={id}
      name={name}
      type={type}
      onChange={handleChange}
      className={error && important ? classes.ErrorInput : classes.Input}
      value={value}
    />
  </div>
);

Input.defaultProps = {
  title: 'Title input',
  type: 'text',
  error: '',
  disabled: false,
  important: false,
};

Input.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
