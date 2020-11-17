import React from 'react';
import PropTypes from 'prop-types';
import classes from './Title.module.css';
import { ThemeContext } from '../../context/Contexts';

export const Title = ({ text }) => {
  return (
    <ThemeContext.Consumer>
      {isBlack => (
        <div className={isBlack ? classes.TitleBlackTheme : classes.Title}>{text}</div>
      )}
    </ThemeContext.Consumer>
  )
};

Title.propTypes = {
  text: PropTypes.string.isRequired,
};
