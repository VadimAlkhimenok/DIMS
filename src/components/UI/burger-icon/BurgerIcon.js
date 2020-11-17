import React from 'react';
import PropTypes from 'prop-types';

export const BurgerIcon = ({ handleClickBurger }) => {
  return <i className='fa fa-bars' onClick={handleClickBurger} />;
};

BurgerIcon.propTypes = {
  handleClickBurger: PropTypes.func.isRequired,
};
