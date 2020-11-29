import React from 'react';
import classes from './SidebarMain.module.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { navigations } from '../../helpers/navigationsOfData/navigations';
import { CrossIcon } from '../../UI/cross-icon/CrossIcon';

export const SidebarMain = ({ open, handleClick }) => {
  return open ? (
    <>
      <div className={classes.Wrapper} onClick={handleClick} />
      <CrossIcon handleClickCross={handleClick} />
      <div className={classes.SidebarMain}>
        <ul className={classes.SidebarAllList}>
          {navigations.map((navigation, index) => (
            <li className={classes.SidebarList} key={`${navigation}${index}`}>
              <Link to={navigation.link} className={classes.SidebarLink} onClick={handleClick}>
                {navigation.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  ) : null;
};

SidebarMain.defaultPropTypes = {
  open: false,
};

SidebarMain.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
