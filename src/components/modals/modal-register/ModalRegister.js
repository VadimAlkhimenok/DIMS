import React, { Component } from 'react';
import classes from './ModalRegister.module.css';
import PropTypes from 'prop-types';
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
import { registerUser, updateData } from '../../firebase/firebaseAPI';
import { calculateAge } from '../../helpers/calculateAge/caluculateAge';
import { RolesContext } from '../../../context/Contexts';
import { RadioGroup } from '../../UI/radio-group/RadioGroup';
import { collection } from '../../helpers/commonData/collections';
import { validationModal } from '../../helpers/validations/validationModal';
import { successResponseData } from '../../helpers/commonData/successResponseData';

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
    isErrorInput: false,
  };

  componentDidMount() {
    const { user } = this.props;
    const { userProfileData } = this.state;

    const tempUserData = Object.assign(userProfileData, ...user);
    this.setState({ userProfileData: tempUserData });
  }

  handleClickSubmit = async (event) => {
    event.preventDefault();

    const { name, email, userId } = this.state.userProfileData;
    const { userProfileData } = this.state;
    const { isRegister, handleClickClose } = this.props;
    const { message, isErrorInput, isValid } = validationModal(userProfileData);
    const { showError, showSuccess } = this.context;
    const { updateUser, addUser } = successResponseData;

    if (isValid) {
      this.setState({
        isErrorInput,
      });
      showError(message);
      return;
    }

    try {
      if (isRegister) {
        await registerUser(email, userProfileData, name);
        showSuccess(addUser);
      } else {
        await updateData(userId, collection.profile, userProfileData);
        showSuccess(updateUser);
      }
      handleClickClose();
    } catch ({ message }) {
      showError(message);
      handleClickClose();
    }
  };

  handleChangeModal = ({ target: { id, value } }) => {
    const { birthDate } = this.state.userProfileData;

    if (birthDate !== '') {
      const age = calculateAge(birthDate);
      this.setState((prevState) => ({
        userProfileData: {
          ...prevState.userProfileData,
          age,
        },
      }));
    }

    this.setState((prevState) => ({
      userProfileData: {
        ...prevState.userProfileData,
        [id]: value,
      },
      isErrorInput: false,
    }));
  };

  handleChangeRadio = ({ target: { value } }) => {
    this.setState((prevState) => ({
      userProfileData: {
        ...prevState.userProfileData,
        sex: value,
      },
    }));
  };

  handleChangeSelect = ({ target: { value } }) => {
    this.setState((prevState) => {
      return {
        userProfileData: {
          ...prevState.userProfileData,
          direction: value,
        },
      };
    });
  };

  render() {
    const { isErrorInput, userProfileData } = this.state;
    const { disabled, title, name, hidden, handleClickClose } = this.props;

    return (
      <>
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
                error={isErrorInput}
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
              <Button name={name} color={color.green} hidden={hidden} handleClick={this.handleClickSubmit} />
              <Button name='Back' color={'var(--color-button-delete)'} handleClick={handleClickClose} />
            </ButtonsGroupModal>
          </div>
        </ModalTemplate>
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
};

ModalRegister.propTypes = {
  isRegister: PropTypes.bool.isRequired,
};

ModalRegister.contextType = RolesContext;
