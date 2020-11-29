import React, { Component } from 'react';
import classes from './App.module.css';
import './ThemeStyles.module.css';
import { Routing } from './main/routing/Routing';
import { Footer } from './main/footer/Footer';
import { Header } from './main/header/Header';
import { LoginContext, RolesContext } from './context/Contexts';
import { Status } from './components/UI/status/Status';
import styled from '@emotion/styled';
// import { fakerDataBase } from './components/faker/faker';

// fakerDataBase()

const ThemeWrapper = styled.div({
  backgroundColor: 'var(--color-background)',
});

export default class App extends Component {
  constructor() {
    super();

    this.showError = (message) => {
      this.setState({
        isError: true,
        message,
      });
      setTimeout(() => this.setState({ isError: false }), 1500);
    };

    this.showSuccess = (message) => {
      this.setState({
        isSuccess: true,
        message,
      });
      setTimeout(() => this.setState({ isSuccess: false }), 1500);
    };

    this.state = {
      isAdmin: true,
      isMentor: false,
      isUser: false,
      userId: null,
      roleEmail: null,
      login: false,
      message: '',
      isSuccess: false,
      isError: false,
      showError: this.showError,
      showSuccess: this.showSuccess,
    };
  }

  handleLogin = () => {
    this.setState({ login: !this.state.login });
  };

  handleLogOut = () => {
    this.setState({
      login: false,
      isAdmin: false,
      isMentor: false,
      isUser: false,
    });
  };

  getLoginRole = ({ role, roleEmail, userId = null }) => {
    this.setState({
      [role]: true,
      roleEmail,
      userId,
    });
  };

  render() {
    const { login, roleEmail, isError, message, isSuccess } = this.state;

    const routes = Routing(login, this.handleLogin, this.getLoginRole);

    return (
      <ThemeWrapper>
        <RolesContext.Provider value={this.state}>
          <LoginContext.Provider value={login}>
            <div className={classes.App}>
              <Header user={roleEmail} setLogout={this.handleLogOut} />
              {routes}
              {isError ? <Status message={message} isError={isError} /> : null}
              {isSuccess ? <Status message={message} /> : null}
              <Footer />
            </div>
          </LoginContext.Provider>
        </RolesContext.Provider>
      </ThemeWrapper>
    );
  }
}
