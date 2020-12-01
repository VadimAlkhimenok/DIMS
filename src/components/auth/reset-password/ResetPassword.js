import React, { useContext, useState } from 'react';
import classes from './ResetPassword.module.css';
import { resetPassword } from '../../firebase/firebaseAPI';
import { Title } from '../../title/Title';
import { isCorrectEmail } from '../../helpers/validations/correctEmail';
import { RolesContext } from '../../../context/Contexts';
import { LinkTemplate } from '../../link/LinkTemplate';

export const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(true);
  const { showError, showSuccess } = useContext(RolesContext);

  const handleResetPassword = async () => {
    if (isCorrectEmail(email)) {
      showError('Error! Input correct email!');
    } else {
      try {
        await resetPassword(email);
        setEmail('');
        setDisabled(true);
        showSuccess('Success! Check your email!');
      } catch ({ message }) {
        showError(message);
      }
    }
  };

  const handleChangeInput = ({ target: { value } }) => {
    setEmail(value);
    setDisabled(false);
  };

  const handleClickSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.Wrapper}>
      <Title text='Reset password' />
      <form className={classes.Form} onSubmit={handleClickSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            onChange={handleChangeInput}
            value={email}
            type='email'
            className='form-control'
            id='email'
            aria-describedby='resetPassword'
          />
        </div>

        <div className='d-flex'>
          <button type='submit' className='btn btn-primary' onClick={handleResetPassword} disabled={disabled}>
            Reset
          </button>
          <LinkTemplate text='Return to login' link='/login' />
        </div>
      </form>
    </div>
  );
};
