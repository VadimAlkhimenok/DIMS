import React from 'react';
import PropTypes from 'prop-types';
import classes from './ButtonMain.module.css';
import { ThemeContext } from '../../../context/Contexts';

export const ButtonMain = ({ children }) => {
  return (
    <ThemeContext.Consumer>
      {isBlack => (
        <div className={isBlack ? classes.ButtonMainBlack : classes.ButtonMain}>{children}</div>
      )}
    </ThemeContext.Consumer>
  )
};

ButtonMain.propTypes = {
  children: PropTypes.node,
};
