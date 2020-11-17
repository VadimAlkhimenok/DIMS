import React from 'react';
import classes from './Text.module.css';
import { ThemeContext } from '../../../context/Contexts';

export const Text = ({ text }) => (
  <ThemeContext.Consumer>
    {isBlack => (
      <div className={isBlack ? classes.TextBlack : classes.Text}>{text}</div>
    )}
  </ThemeContext.Consumer>
)