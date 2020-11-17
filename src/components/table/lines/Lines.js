import React from 'react';
import PropTypes from 'prop-types';
import classes from './Lines.module.css';
import { ThemeContext } from '../../../context/Contexts';

export const Lines = ({ children }) => {
  return (
    <ThemeContext.Consumer>
      {isBlack => (
        <div className={isBlack ? classes.LinesBlackTheme : classes.Lines}>
          {children}
        </div>
      )}
    </ThemeContext.Consumer>
  );
};

Lines.propTypes = {
  children: PropTypes.node.isRequired,
};
