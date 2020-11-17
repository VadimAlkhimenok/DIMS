import React from 'react';
import classes from './Footer.module.css';
import GoogleIcon from '../../components/UI/icons/GoogleIcon';
import TelegramIcon from '../../components/UI/icons/TelegramIcon';
import GithubIcon from '../../components/UI/icons/GithubIcon';
import SkypeIcon from '../../components/UI/icons/SkypeIcon';
import { LoginContext, ThemeContext } from '../../context/Contexts';

export const Footer = () => {
  return (
    <ThemeContext.Consumer>
      {isBlack => (
        <div
          className={isBlack ? classes.FooterBlackTheme : classes.Footer}
        >
          <LoginContext.Consumer>
            {login =>
              login ? (
                <a className={classes.Phone} href='tel:+375295278217'>
                  Mobile phone: +375-(29)-527-82-17
                </a>
              ) : null
            }
          </LoginContext.Consumer>

          <p className={classes.Copy}>Copyright 2020 &copy; Dev Incubator Management System</p>

          <div className={classes.Links}>
            <a href='mailto: vad.alkhimenok@gmail.com' target='_blank' rel='noopener noreferrer'>
              <GoogleIcon />
            </a>
            <a href='https://github.com/VadimAlkhimenok' target='_blank' rel='noopener noreferrer'>
              <GithubIcon />
            </a>
            <LoginContext.Consumer>
              {login =>
                login ? (
                  <>
                    <a href='https://t.me/riddler94' target='_blank' rel='noopener noreferrer'>
                      <TelegramIcon />
                    </a>
                    <a href='skype:live:69d3e7eee13585fb?chat' target='_blank' rel='noopener noreferrer'>
                      <SkypeIcon />
                    </a>
                  </>
                ) : null
              }
            </LoginContext.Consumer>
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  );
};
