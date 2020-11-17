import React from 'react';
import classes from './SidebarMain.module.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../../context/Contexts';
import { Logout } from '../../auth/logout/Logout';
import { navigations } from '../../helpers/navigationsOfData/navigations';
import { CrossIcon } from '../../UI/cross-icon/CrossIcon';

export const SidebarMain = ({ open, handleClick }) => {
  return open ? (
    <>
      <div className={classes.Wrapper} onClick={handleClick}/>
      <CrossIcon handleClickCross={handleClick} />
      <ThemeContext.Consumer>
        {isBlack => (
          <div className={isBlack ? classes.SidebarBlackTheme : classes.SidebarMain}>
            <ul className={classes.SidebarAllList}>
              {navigations.map((navigation, index) => (
                <li className={classes.SidebarList} key={`${navigation}${index}`}>
                  <Link to={navigation.link} className={classes.SidebarLink} onClick={handleClick}>
                    {navigation.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className={classes.SidebarLogout}>
              <Logout />
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    </>
  ) : null;
};

SidebarMain.defaultPropTypes = {
  open: false,
};

SidebarMain.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
