import React from 'react';
import classes from './CrossIcon.module.css';
import PropTypes from 'prop-types';

export const CrossIcon = ({ handleClickCross }) => {
  return (
    <div className={classes.CrossIcon}>
      <i className='fa fa-times' aria-hidden='true' onClick={handleClickCross} />
    </div>
  );
};

CrossIcon.propTypes = {
  handleClickCross: PropTypes.func.isRequired,
};
