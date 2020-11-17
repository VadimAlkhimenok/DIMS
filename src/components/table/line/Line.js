import React from 'react';
import PropTypes from 'prop-types';
import classes from './Line.module.css';
import { chooseStateTask } from '../../helpers/chooseStateTask/chooseStateTask';

export const Line = ({text, width, children}) => {
  const {Active, Fail, Line, Success} = classes;

  return (
    <p
      className={chooseStateTask(text, Active, Fail, Line, Success)}
      style={{ width: `${width}%` }}
    >
      {text}
      {children}
    </p>
  );
};

Line.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.number,
};
