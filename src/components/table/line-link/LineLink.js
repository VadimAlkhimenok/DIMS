import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classes from './LineLink.module.css';

export const LineLink = ({ text, width, children, handleClick }) => (
  <Link to='#' className={classes.LineLink} style={{ width: `${width}%` }} onClick={handleClick}>
    {text}
    {children}
  </Link>
);

LineLink.defaultProps = {
  text: PropTypes.string,
  width: 25,
};

LineLink.propTypes = {
  handleClick: PropTypes.func,
  children: PropTypes.node,
};
