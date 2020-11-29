import React, { PureComponent } from 'react';
import classes from './Auth.module.css';
import firebase from 'firebase';
import axios from 'axios';
import { Title } from '../title/Title';
import { RolesContext } from '../../context/Contexts';
import { getCollection } from '../firebase/firebaseAPI';
import { linkForAuth } from '../helpers/commonData/config';
import { collection } from '../helpers/commonData/collections';
import { validationAuthForm } from '../helpers/validationAuthForm/validationAuthForm';
import { getWhoLoginSystem } from '../helpers/isLogInSystem/isLoginSystem';
import { Icon } from '../UI/icon/Icon';
import { successResponseData } from '../helpers/commonData/successResponseData';
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { LinkTemplate } from '../link/LinkTemplate';

export default class Auth extends PureComponent {
  state = {
    email: '',
    password: '',
    errorEmail: '',
    errorPassword: '',
    isErrorEmail: false,
    isErrorPassword: false,
    hasError: false,
    disabled: false,
    isValid: false,
  };

  handleChangeEmail = ({ target: { value } }) => {
    this.setState({
      email: value,
      errorEmail: '',
      isErrorEmail: false,
      isShowStatus: false,
    });
  };

  handleChangePassword = ({ target: { value } }) => {
    this.setState({
      password: value,
      errorPassword: '',
      isErrorPassword: false,
      isShowStatus: false,
    });
  };

  handleClickAuth = async () => {
    const { setLogin, getLoginRole } = this.props;
    const { email, password } = this.state;
    const [admin, mentor, user] = Object.keys(this.context);
    const [{ adminEmail, mentorEmail }] = await getCollection(collection.roles);
    const { showError, showSuccess } = this.context;
    const { login } = successResponseData;

    let { errorEmail, errorPassword, isErrorEmail, isErrorPassword, isValid } = validationAuthForm(email, password);

    if (isValid) {
      this.setState({
        errorEmail,
        errorPassword,
        isErrorEmail,
        isErrorPassword,
      });
    } else {
      const authData = {
        email,
        password,
        returnSecureToken: true,
      };
      try {
        const { data: { email } = {} } = await axios.post(linkForAuth, authData);
        const currentUser = await getWhoLoginSystem(email, adminEmail, mentorEmail, admin, mentor, user);
        getLoginRole(currentUser);
        setLogin();
        showSuccess(login);
      } catch ({
        response: {
          data: {
            error: { message },
          },
        },
      }) {
        showError(message);
      }
    }
  };

  loginWithGoogle = async (event) => {
    try {
      event.preventDefault();
      const googleProvider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(googleProvider);
    } catch ({
      response: {
        data: {
          error: { message },
        },
      },
    }) {
      const { showError } = this.context;
      showError(message);
    }
  };

  loginWithFacebook = async (event) => {
    try {
      event.preventDefault();
      const facebookProvider = new firebase.auth.FacebookAuthProvider();
      await firebase.auth().signInWithPopup(facebookProvider);
    } catch ({
      response: {
        data: {
          error: { message },
        },
      },
    }) {
      const { showError } = this.context;
      showError(message);
    }
  };

  loginWithGitHub = async (event) => {
    try {
      event.preventDefault();
      const githubProvider = new firebase.auth.GithubAuthProvider();
      await firebase.auth().signInWithPopup(githubProvider);
    } catch ({
      response: {
        data: {
          error: { message },
        },
      },
    }) {
      const { showError } = this.context;
      showError(message);
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  authTable = () => {
    const { errorEmail, isErrorEmail, errorPassword, isErrorPassword, disabled } = this.state;

    return (
      <>
        <div className={classes.Wrapper}>
          <Title text='Log in DIMS' />
          <div className={classes.Auth}>
            <form onSubmit={this.handleSubmit} className='needs-validation' noValidate>
              <div className='form-group'>
                <div className={isErrorEmail ? classes.Error : null}>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    className={isErrorEmail ? classes.ErrorInput : classes.Input}
                    id='email'
                    placeholder='Enter email'
                    onChange={this.handleChangeEmail}
                  />
                  <div className={classes.Error}>{errorEmail}</div>
                </div>
              </div>
              <div className='form-group'>
                <div className={isErrorPassword ? classes.Error : null}>
                  <label htmlFor='password'>Password</label>
                  <input
                    type='password'
                    className={isErrorPassword ? classes.ErrorInput : classes.Input}
                    id='password'
                    placeholder='Password'
                    onChange={this.handleChangePassword}
                    disabled={disabled}
                  />
                  <div className={classes.Error}>{errorPassword}</div>
                </div>
              </div>

              <div className='d-flex flex-row justify-content-between'>
                <button type='submit' className='btn btn-success' onClick={this.handleClickAuth} disabled={disabled}>
                  Confirm
                </button>

                <LinkTemplate text='Forgot password?' />

                <div className='d-flex justify-content-space-around align-items-center'>
                  <Icon handleClick={this.loginWithGoogle} icon={faGoogle} />
                  <Icon handleClick={this.loginWithFacebook} icon={faFacebook} />
                  <Icon handleClick={this.loginWithGitHub} icon={faGithub} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  };

  render() {
    return this.authTable();
  }
}

Auth.contextType = RolesContext;
