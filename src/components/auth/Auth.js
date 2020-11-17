import React, { PureComponent } from 'react';
import classes from './Auth.module.css';
import firebase from 'firebase';
import axios from 'axios';
import { Title } from '../title/Title';
import { LinkTemplate } from '../link/LinkTemplate';
import GoogleIcon from '../UI/icons/GoogleIcon';
import FacebookIcon from '../UI/icons/FacebookIcon';
import { Status } from '../UI/status/Status';
import { RolesContext } from '../../context/Contexts';
import { getCollection } from '../firebase/firebaseAPI';
import { linkForAuth } from '../helpers/commonData/config';
import { collection } from '../helpers/commonData/collections';
import GithubIcon from '../UI/icons/GithubIcon';
import { validationAuthForm } from '../helpers/validationAuthForm/validationAuthForm';
import { getWhoLoginSystem } from '../helpers/isLogInSystem/isLoginSystem';

export default class Auth extends PureComponent {
  state = {
    email: '',
    password: '',
    errorEmail: '',
    errorPassword: '',
    isErrorEmail: false,
    isErrorPassword: false,
    isShowStatus: false,
    message: '',
    isStatus: false,
    disabled: false,
    isValid: false
  };

  showError = message => {
    this.setState({
      isShowStatus: true,
      message,
    })
  };

  showSuccess = message => {
    this.setState({
      isShowStatus: true,
      message,
      isStatus: true,
      disabled: true,
    })
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
    const [ admin, mentor, user ] = Object.keys(this.context);
    const [{ adminEmail, mentorEmail }] = await getCollection(collection.roles);

    let { errorEmail, errorPassword, isErrorEmail, isErrorPassword, isValid } = validationAuthForm(email, password);
    if (isValid) {
      this.setState({
        errorEmail,
        errorPassword,
        isErrorEmail,
        isErrorPassword
      })
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
      } catch (e) {
        console.log(e);
      }
    }
  };

  loginWithGoogle = async () => {
    try {
      const googleProvider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(googleProvider);
    } catch (e) {
      this.showError('Something wrong! Cannot log in DIMS!')
    }
  }

  loginWithFacebook = async () => {
    try {
      const facebookProvider = new firebase.auth.FacebookAuthProvider();
      await firebase.auth().signInWithPopup(facebookProvider);
    } catch (e) {
      this.showError('Something wrong! Cannot log in DIMS!')
    }
  }

  loginWithGitHub = async () => {
    try {
      const githubProvider = new firebase.auth.GithubAuthProvider();
      await firebase.auth().signInWithPopup(githubProvider);
    } catch (e) {
      this.showError('Something wrong! Cannot log in DIMS!')
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
  };

  authTable = () => {
    const {
      errorEmail,
      isErrorEmail,
      errorPassword,
      isErrorPassword,
      disabled,
      isShowStatus,
      message,
      isStatus,
    } = this.state;

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

              <div className='d-flex flex-row'>
                <button type='submit' className='btn btn-success' onClick={this.handleClickAuth} disabled={disabled}>
                  Confirm
                </button>

                <div className='d-flex justify-content-space-around align-items-center'>
                  <LinkTemplate text='Forgot password?' />
                  <GoogleIcon loginWithGoogle={this.loginWithGoogle}/>
                  <FacebookIcon loginWithFacebook={this.loginWithFacebook} />
                  <GithubIcon loginWithGithub={this.loginWithGitHub} />
                </div>
              </div>
            </form>
          </div>
        </div>
        {isShowStatus ? <Status message={message} isStatus={isStatus} /> : null}
      </>
    );
  };

  render() {
    return this.authTable();
  }
}

Auth.contextType = RolesContext;