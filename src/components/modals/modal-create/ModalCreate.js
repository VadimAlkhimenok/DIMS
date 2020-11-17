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
import { Status } from '../../UI/status/Status';
import { isEmptyInputModal } from '../../helpers/validations/emptyInputModal';
import { ThemeContext } from '../../../context/Contexts';
import { collection } from '../../helpers/commonData/collections';

export default class ModalCreate extends Component {
  state = {
    taskData: {
      deadline: '',
      description: '',
      start: '',
      userName: '',
      userId: null,
      state: 'Active',
    },
    isStatus: false,
    isShowStatus: false,
    message: '',
    isErrorInput: false,
    errorMessageInput: '',
  };

  componentDidMount() {
    const { task } = this.props;
    const { taskData } = this.state;

    const tempTaskData = Object.assign(taskData, task);
    this.setState({ taskData: tempTaskData });
  };

  showError = message => {
    this.setState({
      isShowStatus: true,
      message
    })
  };

  showSuccess = message => {
    this.setState({
      isShowStatus: true,
      message,
      isStatus: true,
    })
  };

  resetStatus = () => {
    this.setState({
      isShowStatus: false,
      message: '',
      isErrorInput: false,
    })
  };

  handleClickSubmit = async (event) => {
    event.preventDefault();

    try {
      const { taskId, state, ...task } = this.state.taskData;
      const { taskData } = this.state;
      const { handleClickCreate } = this.props;

      if (isEmptyInputModal(task)) {
        this.setState({
          isErrorInput: true,
          errorMessageInput: 'Fill important field',
        });
        return;
      }

      if (taskId) {
        try {
          await updateData(taskId, collection.task, taskData);
          this.showSuccess(`Success! Data of task was updated!`);
        } catch (e) {
          this.showError('Something wrong! Data of task wasnt updated!');
        }
      } else {
        try {
          await addData(collection.task, taskData, 'taskId');
          this.showSuccess(`Success! The task was added!`);
        } catch (e) {
          this.showError('Something wrong! The task wasnt added!');
        }
      }
      handleClickCreate();
    } catch (e) {
      this.showError('Something wrong! Check input data!');
    }
  };

  handleChangeModal = ({ target: { id, value } }) => {
    this.setState((prevState) => ({
      taskData: {
        ...prevState.taskData,
        [id]: value,
      }
    }));
    this.resetStatus();
  };

  handleChangeSelect = ({ target: { value, selectedIndex, childNodes } }) => {
    let id = childNodes[selectedIndex].id;

    this.setState((prevState) => {
      return {
        taskData: {
          ...prevState.taskData,
          userName: value,
          userId: id,
        }
      };
    });

    this.resetStatus();
  };

  handleChangeTextarea = ({ target: { value } }) => {
    this.setState((prevState) => ({
      taskData: {
        ...prevState.taskData,
        description: value,
      }
    }));

    this.resetStatus();
  };

  render() {
    const { name, title, handleClickCreate, hidden, disabled, userName } = this.props;
    const { taskData, isErrorInput, errorMessageInput, isShowStatus, message, isStatus } = this.state;

    return (
      <>
        <ThemeContext.Consumer>
          {isBlack => (
            <ModalTemplate handleOpenCloseModal={handleClickCreate}>
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
                    handleClick={handleClickCreate}
                  />
                </ButtonsGroupModal>
              </div>
            </ModalTemplate>
          )}
        </ThemeContext.Consumer>
        {isShowStatus ? <Status message={message} isStatus={isStatus} /> : null}
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
  handleClickCreate: PropTypes.func.isRequired,
  userNameAndId: PropTypes.array,
};
