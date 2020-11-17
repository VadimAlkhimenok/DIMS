import React, { Component } from 'react';
import classes from './App.module.css';
import { Routing } from './main/routing/Routing';
import { Footer } from './main/footer/Footer';
import { Header } from './main/header/Header';
import { LoginContext, RolesContext, ThemeContext } from './context/Contexts';

export default class App extends Component {
  state = {
    isAdmin: false,
    isMentor: false,
    isUser: false,
    userId: null,
    roleEmail: null,
    isBlack: false,
    login: false,
  };

  handleLogin = () => {
    this.setState({ login: !this.state.login });
  };

  handleLogOut = () => {
    this.setState({
      login: false,
      isAdmin: false,
      isMentor: false,
      isUser: false,
      isBlack: false,
    });
  };

  getLoginRole = ({ role, roleEmail, userId = null }) => {
    this.setState({
      [role]: true,
      roleEmail,
      userId
    })
  };

  setTheme = () => {
    this.setState({
      isBlack: !this.state.isBlack
    })
  };

  render() {
    const { login, roleEmail, isBlack } = this.state;

    const routes = Routing(login, this.handleLogin, this.getLoginRole);

    return (
      <RolesContext.Provider value={this.state}>
        <LoginContext.Provider value={login}>
          <ThemeContext.Provider value={isBlack}>
            <div className={isBlack ? classes.AppBlackTheme : classes.App}>
              <Header user={roleEmail} setLogout={this.handleLogOut} setTheme={this.setTheme} />
              {routes}
              <Footer />
            </div>
          </ThemeContext.Provider>
        </LoginContext.Provider>
      </RolesContext.Provider>
    );
  }
}
