import React from 'react';
import classes from './RadioGroup.module.css';

export const RadioGroup = ({ children, title }) => (
  <div className={classes.RadioGroup}>
    <label htmlFor={title} className={classes.Title}>
      {title}
    </label>
    {children}
  </div>
);
