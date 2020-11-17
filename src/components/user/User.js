import React from 'react';
import classes from './User.module.css';

export const User = ({ user }) => {
  return <div className={classes.User}>{user}</div>
};
