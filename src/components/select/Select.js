import React from 'react';
import PropTypes from 'prop-types';
import classes from './Select.module.css';

export const Select = ({ options, title, disabled, handleChange, value, important, error }) => (
  <div className={error && important ? classes.ErrorSelectMain : classes.SelectMain}>
    <label htmlFor={title} className={classes.Label}>
      {title}
      {important && <span className={classes.Important}>*</span>}
    </label>

    <select className={classes.Select} disabled={disabled} onChange={handleChange} name={title} value={value}>
      <option value='' disabled hidden>
        Choose
      </option>
      {options.map((option, index) => (
        <option key={`${option}${index}`} id={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
);

Select.defaultProps = {
  title: '',
  disabled: false,
  options: false,
  value: '',
  important: false,
  error: false,
};

Select.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
