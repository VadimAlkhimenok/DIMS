import React from 'react';
import classes from './Logout.module.css';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../../context/Contexts';
import LogoutIcon from '../../UI/icons/LogoutIcon';

export const Logout = ({setLogout}) => {

  return (
    <LoginContext.Consumer>
      {login =>
        login
          ? <>
              <Link to='/login' className={classes.Logout} onClick={setLogout}>
                Logout
                <LogoutIcon />
              </Link>
            </>
          : null
      }
    </LoginContext.Consumer>
  )
};

