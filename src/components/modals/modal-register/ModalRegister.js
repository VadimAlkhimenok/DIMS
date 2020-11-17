import React, { Component } from 'react';
import classes from './ModalRegister.module.css';
import PropTypes from 'prop-types';
import axios from 'axios';
import { inputsModalData, options, radioData } from './ModalRegisterData';
import { color } from '../../UI/colors/colors';
import { Input } from '../../input/Input';
import { InputsGroup } from '../../input/inputs-group/InputsGroup';
import { Select } from '../../select/Select';
import { Title } from '../../title/Title';
import { Button } from '../../UI/button/Button';
import { ModalTemplate } from '../modal-template/ModalTemplate';
import { ButtonsGroupModal } from '../../UI/button-groups-modal/ButtonGroupModal';
import { Radio } from '../../UI/radio-group/radio/Radio';
import { addData, updateData } from '../../firebase/firebaseAPI';
import { calculateAge } from '../../helpers/calculateAge/caluculateAge';
import { Status } from '../../UI/status/Status';
import { isEmptyInputImportantFields } from '../../helpers/validations/emptyInputImportantFields';
import { linkForRegister } from '../../helpers/commonData/config';
import { ThemeContext } from '../../../context/Contexts';
import { RadioGroup } from '../../UI/radio-group/RadioGroup';
import { collection } from '../../helpers/commonData/collections';
import faker from 'faker';
import firebase from 'firebase';
import emailjs from 'emailjs-com'
import { isCorrectPhone } from '../../helpers/validations/correctPhone';
import { isCorrectEmail } from '../../helpers/validations/correctEmail';

export default class ModalRegister extends Component {
  state = {
    userProfileData: {
      name: '',
      email: '',
      lastName: '',
      education: '',
      birthDate: '',
      universityAverageScore: '',
      direction: '',
      mathScore: '',
      address: '',
      mobilePhone: '',
      skype: '',
      startDate: '',
      age: null,
      sex: '',
    },
    isStatus: false,
    isShowStatus: false,
    message: '',
    isErrorInput: false,
    errorMessageInput: '',
  };

  componentDidMount() {
    const { user } = this.props;
    const { userProfileData } = this.state;

    const tempUserData = Object.assign(userProfileData, user);
    this.setState({ userProfileData: tempUserData });
  }

  showError = message => {
    this.setState({
      isShowStatus: true,
      message
    })
  }

  showSuccess = message => {
    this.setState({
      isShowStatus: true,
      message,
      isStatus: true,
    })
  }

  handleClickSubmit = async event =>  {
    event.preventDefault();

    const { name, email, birthDate, mobilePhone, startDate, userId, age } = this.state.userProfileData;
    const { userProfileData } = this.state;
    const { isRegister, handleClickClose } = this.props;

    const authData = {
      email,
      password: `${name.toUpperCase()}${faker.random.number()}`,
      returnSecureToken: true,
    };

    const sendData = {
      name,
      email: authData.email,
      password: authData.password,
      message: 'You can live this password or change them in email: DIMS-change-password"',
      link: 'http://localhost:3000/login'
    }

    try {
      if (isRegister) {
        if (age < 18) {
          this.showError("Error! User can't be elder than 18 years!")
          return;
        }

        if (isEmptyInputImportantFields(name, email, birthDate, mobilePhone, startDate)) {
          this.setState({
            isErrorInput: true,
            errorMessageInput: 'Fill important field',
          });
          return;
        }

        if (isCorrectPhone(mobilePhone)) {
          this.showError('Error! Phone is not correct!');
          return;
        }

        if (isCorrectEmail(email)) {
          this.showError('Error! Email is not correct!');
          return;
        }

        try {
          await axios.post(linkForRegister, authData)
            .then(async () => await addData(collection.profile, userProfileData, 'userId'))
            .then(() => firebase.auth().sendPasswordResetEmail(authData.email, null))
            .then(() => {
              emailjs.send('dims', 'dims_email', sendData, 'user_nchpofRflrXYg5BUr8uNS')
                .then((result) => {
                  console.log(result.text);
                }, (error) => {
                  console.log(error.text);
                });
            })
            this.showSuccess(`Success! User ${authData.email} was added!`)
        } catch (e) {
          this.showError('Something wrong! This email is existed!');
        }
      } else {
        try {
          await updateData(userId, collection.profile, userProfileData);
          this.showSuccess('Success! Data of user was updated!');
        } catch (e) {
          this.showError("Something wrong! User wasn't updated! ");
        }
      }
      handleClickClose();
    } catch (e) {
        this.showError('Something wrong! Check input data!');
    }
  }

  handleChangeModal = ({ target: {id, value} }) => {
    const {birthDate} = this.state.userProfileData;

    if (birthDate !== '') {
      const age = calculateAge(birthDate);
      this.setState(prevState => ({
        userProfileData: {
          ...prevState.userProfileData,
          age,
        }
      }))
    }

    this.setState(prevState => ({
      userProfileData: {
        ...prevState.userProfileData,
        [id]: value,
      },
      isErrorInput: false,
      isShowStatus: false,
    }))
  }

  handleChangeRadio = ({ target: {value} }) => {
    this.setState(prevState => ({
      userProfileData: {
        ...prevState.userProfileData,
        sex: value
      }
    }))
  }

  handleChangeSelect = ({target: {value}}) => {
    this.setState(prevState => {
      return {
        userProfileData: {
          ...prevState.userProfileData,
          direction: value
        }
      }
    })
  }

  render() {
    const { errorMessageInput, isErrorInput, userProfileData, isShowStatus, message, isStatus } = this.state;
    const { disabled, title, name, hidden, handleClickClose } = this.props;

    return (
        <>
          <ThemeContext.Consumer>
            {isBlack => (
              <ModalTemplate handleOpenCloseModal={handleClickClose} handleSubmit={this.handleClickSubmit}>
                <div className={classes.ModalRegister}>
                  <Title text={title} />

                  <InputsGroup>
                    {inputsModalData.map((input, index) => (
                      <Input
                        key={index}
                        id={input.id}
                        name={input.name}
                        type={input.type}
                        disabled={disabled}
                        handleChange={this.handleChangeModal}
                        errorMessage={errorMessageInput}
                        error={isErrorInput}
                        important={input.important}
                        value={userProfileData[input.id]}
                      />
                    ))}
                    <Select
                      options={options}
                      title='Direction'
                      disabled={disabled}
                      handleChange={this.handleChangeSelect}
                      value={userProfileData.direction}
                    />

                    <RadioGroup title='Sex'>
                      {radioData.map((name, index) => (
                          <Radio
                            key={index}
                            disabled={disabled}
                            value={userProfileData.sex}
                            handleChange={this.handleChangeRadio}
                            name={name}
                          />
                        ))}
                    </RadioGroup>
                  </InputsGroup>

                  <ButtonsGroupModal>
                    <Button
                      name={name}
                      color={isBlack ? color.black : color.green}
                      hidden={hidden}
                      handleClick={this.handleClickSubmit}
                    />
                    <Button
                      name='Back to grid'
                      color={isBlack ? color.darkRed : color.red}
                      handleClick={handleClickClose}
                    />
                  </ButtonsGroupModal>
                </div>
              </ModalTemplate>
            )}
          </ThemeContext.Consumer>
          { isShowStatus ? <Status message={message} isStatus={isStatus} /> : null }
        </>
    );
  }
}

ModalRegister.defaultProps = {
  name: 'Create',
  title: 'Registration',
  hidden: false,
  disabled: false,
  user: {},
}

ModalRegister.propTypes = {
  isRegister: PropTypes.bool.isRequired,
}
