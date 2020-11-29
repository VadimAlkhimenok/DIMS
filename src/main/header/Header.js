import React from 'react';
import { LoginContext } from '../../context/Contexts';
import classes from './Header.module.css';
import SidebarSwitch from '../../components/side-bar/side-bar-switch/SidebarSwitch';
import { Theme } from '../../components/theme/Theme';
import { NavBar } from '../../components/nav-bar/NavBar';
import { Logout } from '../../components/auth/logout/Logout';
import { User } from '../../components/user/User';

export const Header = ({ user, setLogout }) => (
  <div className={classes.Header}>
    <LoginContext.Consumer>
      {(login) =>
        login ? (
          <>
            <NavBar />
            <SidebarSwitch />
            <Theme />
            <User user={user} />
            <Logout setLogout={setLogout} />
          </>
        ) : (
          <Theme />
        )
      }
    </LoginContext.Consumer>
  </div>
);
