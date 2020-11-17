import React from 'react';
import classes from './List.module.css';
import { ThemeContext } from '../../../context/Contexts';

export const List = ({ list }) => (
  <ThemeContext.Consumer>
    {isBlack => (
      <ul>
        {
          list.map((item, index) => (
            <li className={isBlack ? classes.ListBlack : classes.List} key={index}>{item}</li>
          ))
        }
      </ul>
    )}
  </ThemeContext.Consumer>
)