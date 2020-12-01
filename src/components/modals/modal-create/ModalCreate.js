import React, { Component } from 'react';
import classes from './ModalCreate.module.css';
import PropTypes from 'prop-types';
import { inputsModalData } from './ModalCreateData';
import { color } from '../../UI/colors/colors';
import { Input } from '../../input/Input';
import { InputsGroup } from '../../input/inputs-group/InputsGroup';
import { Title } from '../../title/Title';
import { Button } from '../../UI/button/Button';
import { ModalTemplate } from '../modal-template/ModalTemplate';
import { Textarea } from '../../textarea/Textarea';
import { ButtonsGroupModal } from '../../UI/button-groups-modal/ButtonGroupModal';
import { addData, updateData } from '../../firebase/firebaseAPI';
import { Select } from '../../select/Select';
import { isEmptyInputModal } from '../../helpers/validations/emptyInputModal';
import { RolesContext } from '../../../context/Contexts';
import { collection } from '../../helpers/commonData/collections';
import { successResponseData } from '../../helpers/commonData/successResponseData';

let userNames = [];
let foundUser = false;

export default class ModalCreate extends Component {
  state = {
    taskData: {
      deadline: '',
      description: '',
      start: '',
      userName: '',
      userNames: [],
      userId: null,
      state: 'Active',
    },
    isErrorInput: false,
    errorMessageInput: '',
  };

  componentDidMount() {
    const { task } = this.props;
    const { taskData } = this.state;

    const tempTaskData = Object.assign(taskData, task);
    this.setState({ taskData: tempTaskData });
  }

  handleClickSubmit = async (event) => {
    event.preventDefault();

    const { updateTask, addTask } = successResponseData;
    const { showSuccess } = this.context;
    this.setState({ userData: { userNames: [] } });
    userNames = [];

    try {
      const { taskId, state, ...task } = this.state.taskData;
      const { taskData } = this.state;
      const { handleClickClose } = this.props;
      const { showError } = this.context;

      if (isEmptyInputModal(task)) {
        this.setState({
          isErrorInput: true,
        });
        showError('Fill important field');
        return;
      }

      if (taskId) {
        await updateData(taskId, collection.task, taskData);
        showSuccess(updateTask);
      } else {
        await addData(collection.task, taskData, 'taskId');
        showSuccess(addTask);
      }

      handleClickClose();
    } catch ({ message }) {
      const { showError } = this.context;
      showError(message);
    }
  };

  handleChangeModal = ({ target: { id, value } }) => {
    this.setState((prevState) => ({
      taskData: {
        ...prevState.taskData,
        [id]: value,
      },
    }));
  };

  handleChangeSelect = ({ target: { value, selectedIndex, childNodes } }) => {
    const { showError } = this.context;
    let id = childNodes[selectedIndex].id;

    for (let i = 0; i < userNames.length; i++) {
      if (userNames[i].id === id) {
        foundUser = true;
      }
    }

    if (foundUser) {
      showError('Erorr! User already got this task!');
      foundUser = false;
    } else {
      userNames.push({ value, id });
    }

    this.setState((prevState) => {
      return {
        taskData: {
          ...prevState.taskData,
          userName: value,
          userNames,
          userId: id,
        },
      };
    });
  };

  handleChangeTextarea = ({ target: { value } }) => {
    this.setState((prevState) => ({
      taskData: {
        ...prevState.taskData,
        description: value,
      },
    }));
  };

  render() {
    const { name, title, handleClickClose, hidden, disabled, userName } = this.props;
    const { taskData, isErrorInput, errorMessageInput } = this.state;

    return (
      <>
        <ModalTemplate handleOpenCloseModal={handleClickClose}>
          <div className={classes.ModalCreate}>
            <Title text={title} />

            <Textarea
              name='Description'
              disabled={disabled}
              handleChange={this.handleChangeTextarea}
              errorMessage={errorMessageInput}
              error={isErrorInput}
              value={taskData.description}
              important={true}
            />

            <InputsGroup>
              {inputsModalData.map((input, idx) => (
                <Input
                  key={idx}
                  id={input.id}
                  name={input.name}
                  type={input.type}
                  disabled={disabled}
                  handleChange={this.handleChangeModal}
                  errorMessage={errorMessageInput}
                  error={isErrorInput}
                  important={input.important}
                  value={taskData[input.id]}
                />
              ))}
              {
                <Select
                  options={userName}
                  title='Members'
                  disabled={disabled}
                  handleChange={this.handleChangeSelect}
                  value={taskData.userName}
                  important={true}
                  error={isErrorInput}
                  errorMessage={errorMessageInput}
                />
              }
            </InputsGroup>

            <div className={classes.AddedTasks}>
              <div className={classes.Title}>Add task for:&nbsp;</div>
              {this.state.taskData.userNames.map((user) => {
                return (
                  <span key={user.id} className={classes.User}>
                    {' '}
                    {user.value}&sbquo;&nbsp;
                  </span>
                );
              })}
            </div>

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

ModalCreate.defaultProps = {
  name: 'Create',
  title: 'Create task',
  hidden: false,
  disabled: false,
  task: {},
};

ModalCreate.propTypes = {
  handleClickClose: PropTypes.func.isRequired,
  userNameAndId: PropTypes.array,
};

ModalCreate.contextType = RolesContext;
