import React from 'react';
import classes from './LinkTemplate.module.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const LinkTemplate = ({ text, link }) => (
  <Link to={link} className={classes.Link}>
    {text}
  </Link>
);

LinkTemplate.propTypes = {
  text: PropTypes.string.isRequired,
};
