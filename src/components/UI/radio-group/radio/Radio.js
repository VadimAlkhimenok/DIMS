import React from 'react';
import classes from './Radio.module.css';
import PropTypes from 'prop-types';

export const Radio = ({ disabled, value, handleChange, name }) => {
  return (
    <>
      <div className={classes.Radio}>
        <input type='radio' checked={name === value} value={name} disabled={disabled} onChange={handleChange} />
        <label className={classes.Label} htmlFor={name}>
          {name}
        </label>
      </div>
    </>
  );
};

Radio.defaultProps = {
  disabled: false,
  value: '',
  name: '',
};

Radio.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
