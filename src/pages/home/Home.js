import React from 'react';
import logo from '../../img/human1.png';
import classes from './Home.module.css';
import { Title } from '../../components/title/Title';

export const Home = () => {
  return (
    <div className={classes.Home}>
      <Title text='Dev Incubator Management System' />
      <img src={logo} alt='Dev Incubator' className={classes.Logo} />
    </div>
  );
};
