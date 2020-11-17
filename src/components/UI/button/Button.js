import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.css';

export const Button = ({ name, color, handleClick, children, hidden }) => {
  return (
    <button
      className={hidden ? classes.Hidden : classes.Button}
      style={{ backgroundColor: color }}
      onClick={handleClick}
    >
      <>
        {name}
        {children}
      </>
    </button>
  );
};

Button.defaultProps = {
  color: '',
  name: '',
  hidden: false,
};

Button.propTypes = {
  handleClick: PropTypes.func,
  children: PropTypes.node,
};
