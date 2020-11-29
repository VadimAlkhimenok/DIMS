import React from 'react';
import classes from './Footer.module.css';
import { Icon } from '../../components/UI/icon/Icon';
import { LoginContext } from '../../context/Contexts';
import { faGithub, faGoogle, faSkype, faTelegramPlane } from '@fortawesome/free-brands-svg-icons';

export const Footer = () => {
  return (
    <div className={classes.Footer}>
      <LoginContext.Consumer>
        {(login) =>
          login ? (
            <a className={classes.Phone} href='tel:+375295278217'>
              Mobile phone: +375-(29)-527-82-17
            </a>
          ) : null
        }
      </LoginContext.Consumer>

      <p className={classes.Copy}>Copyright 2020 &copy; Dev Incubator Management System</p>

      <div className={classes.Links}>
        <Icon href='mailto: vad.alkhimenok@gmail.com' icon={faGoogle} />
        <Icon href='https://github.com/VadimAlkhimenok' icon={faGithub} />

        <LoginContext.Consumer>
          {(login) =>
            login ? (
              <>
                <Icon href={'https://t.me/riddler94'} icon={faTelegramPlane} />
                <Icon href={'skype:live:69d3e7eee13585fb?chat'} icon={faSkype} />
              </>
            ) : null
          }
        </LoginContext.Consumer>
      </div>
    </div>
  );
};
