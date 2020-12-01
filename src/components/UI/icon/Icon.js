import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Icon.module.css';

export const Icon = ({ href, icon, handleClick }) => (
  <a href={href} onClick={handleClick} className={classes.Icon}>
    <FontAwesomeIcon size='2x' icon={icon} />
  </a>
);

Icon.propTypes = {
  icon: PropTypes.object,
  href: PropTypes.string,
  handleClick: PropTypes.func,
};

Icon.defaultProps = {
  icon: null,
  href: '',
  handleClick: null,
};
