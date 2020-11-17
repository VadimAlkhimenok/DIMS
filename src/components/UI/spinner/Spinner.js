import React from 'react';
import classes from './Spinner.module.css';
import { ThemeContext } from '../../../context/Contexts';

export const Spinner = () => (
  <ThemeContext.Consumer>
    {isBlack => (
      <div className={classes.Wrapper}>
        <div className={isBlack ? classes.SpinnerBlack : classes.Spinner} />
      </div>
    )}
  </ThemeContext.Consumer>
);
