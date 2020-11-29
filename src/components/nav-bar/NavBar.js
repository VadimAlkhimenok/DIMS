import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavBar.module.css';
import { LoginContext, RolesContext } from '../../context/Contexts';
import { navigations } from '../helpers/navigationsOfData/navigations';

export const NavBar = () => {
  return (
    <nav className={classes.Navigation}>
      <ul className={classes.List}>
        <LoginContext.Consumer>
          {(login) =>
            login ? (
              <RolesContext.Consumer>
                {({ isUser }) =>
                  isUser
                    ? null
                    : navigations.map((navigation, index) => (
                        <li className={classes.LinkItem} key={`${navigation}${index}`}>
                          <NavLink
                            to={`${navigation.link}`}
                            exact={navigation.exact}
                            className={classes.Link}
                            activeClassName={classes.Active}
                          >
                            {navigation.title}
                          </NavLink>
                        </li>
                      ))
                }
              </RolesContext.Consumer>
            ) : null
          }
        </LoginContext.Consumer>
      </ul>
    </nav>
  );
};
