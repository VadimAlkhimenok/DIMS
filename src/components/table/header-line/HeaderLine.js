import React from 'react';
import PropTypes from 'prop-types';
import classes from './HeaderLine.module.css';
import { ThemeContext } from '../../../context/Contexts';

export const HeaderLine = ({ children }) => {
  return (
    <ThemeContext.Consumer>
      {isBlack => (
        <div className={isBlack ? classes.HeaderLineBlackTheme : classes.HeaderLine}>{children}</div>
      )}
    </ThemeContext.Consumer>
  )
};

HeaderLine.propTypes = {
  children: PropTypes.node,
};
