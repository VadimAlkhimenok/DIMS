import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classes from './LineLink.module.css';
import { ThemeContext } from '../../../context/Contexts';

export const LineLink = ({ text, width, children, handleClick }) => {
  return (
    <ThemeContext.Consumer>
      {isBlack => (
        <Link
          to='#'
          className={isBlack ? classes.LineLinkBlackTheme : classes.LineLink}
          style={{ width: `${width}%` }}
          onClick={handleClick}
        >
          {text}
          {children}
        </Link>
      )}
    </ThemeContext.Consumer>
  );
};

LineLink.defaultProps = {
  text: PropTypes.string,
  width: 25,
};

LineLink.propTypes = {
  handleClick: PropTypes.func,
  children: PropTypes.node,
};
