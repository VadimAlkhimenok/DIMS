import React from 'react';
import classes from './List.module.css';

export const List = ({ list }) => (
  <ul>
    {list.map((item, index) => (
      <li className={classes.List} key={index}>
        {item}
      </li>
    ))}
  </ul>
);
