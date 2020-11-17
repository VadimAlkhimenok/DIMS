import React, { Component } from 'react';
import classes from './Tasks.module.css';
import { HeaderLine } from '../../components/table/header-line/HeaderLine';
import { Button } from '../../components/UI/button/Button';
import { Line } from '../../components/table/line/Line';
import { Lines } from '../../components/table/lines/Lines';
import { LineLink } from '../../components/table/line-link/LineLink';
import { ButtonsGroup } from '../../components/UI/buttons-group/ButtonsGroup';
import { ButtonMain } from '../../components/UI/button-main/ButtonMain';
import { Spinner } from '../../components/UI/spinner/Spinner';
import { deleteTask, getCollection, getUserOfData } from '../../components/firebase/firebaseAPI';
import ModalCreate from '../../components/modals/modal-create/ModalCreate';
import { headerLine } from './TasksData';
import { color } from '../../components/UI/colors/colors';
import { db } from '../../components/firebase/firebase';
import { Status } from '../../components/UI/status/Status';
import { ThemeContext } from '../../context/Contexts';
import { collection } from '../../components/helpers/commonData/collections';

export default class Tasks extends Component {
  state = {
    userNameAndId: [],
    tasks: null,
    task: null,
    isLoading: false,
    isShowModalCreate: false,
    name: '',
    title: '',
    hidden: false,
    disabled: false,
    isRegister: false,
    isStatus: false,
    isShowStatus: false,
    message: '',
  };

  async componentDidMount() {
    await this.getUpdatedTasks();
    await this.getUserNameAndId();
    await this.getTasks();
    document.title = 'Tasks';
  }

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
    })
  };

  resetStatus = () => {
    this.setState({
      isShowStatus: false,
      message: ''
    })
  };

  getUserNameAndId = async () => {
    try {
      let usersData = await getCollection('UserProfile');
      const userNameAndId = usersData.map((user) => ({ name: user.name, id: user.userId }));
      this.setState({ userNameAndId });
    } catch (e) {
      this.showError("Something wrong! Cannot get task of data!");
    }
  };

  handleClickCreate = () => {
    this.setState({
      isShowModalCreate: true,
      isLoading: !this.state.isLoading,
      name: 'Create',
      title: 'Create task',
      hidden: false,
      disabled: false,
      task: null,
      isRegister: true,
    });
  };

  handleClickEdit = (taskId) => async () => {
    try {
      await this.getTask(taskId);
    } catch (e) {
      this.showError("Something wrong! Cannot get task of data!");
    }

    this.setState({
      isShowModalCreate: false,
      isLoading: !this.state.isLoading,
      name: 'Save changes',
      title: 'Edit',
      hidden: false,
      disabled: false,
      isRegister: false,
    });
  };

  handleClickDetail = taskId => async () => {
    try {
      await this.getTask(taskId);
    } catch (e) {
      this.showError("Something wrong! Cannot get task of data!");
    }

    this.setState({
      isShowModalCreate: false,
      isLoading: !this.state.isLoading,
      hidden: true,
      disabled: true,
      title: 'Details',
    });
  };

  handleClickDelete = (taskId) => async () => {
    try {
      await deleteTask(taskId);
      this.showSuccess('Success! Task was deleted!');
      this.resetStatus();
    } catch (e) {
      this.showError("Error! Task wasn't deleted");
    }
  };

  getTasks = async () => {
    try {
      const tasks = await getCollection(collection.task);
      this.setState({
        tasks,
        isLoading: !this.state.isLoading,
      });
    } catch (e) {
      this.showError("Something wrong! Cannot get tasks!");
    }
  };

  getTask = async (taskId) => {
    try {
      let [task] = await getUserOfData(collection.task, taskId, 'taskId');
      this.setState({ task });
    } catch (e) {
      this.showError("Something wrong! Cannot get task!");
    }
  };

  getUpdatedTasks = async () => {
    try {
      db.collection('Task').onSnapshot((snapshot) => {
        let tasks = snapshot.docs.map((data) => ({ ...data.data() }));
        this.setState({ tasks });
      });
    } catch (e) {
      this.showError("Something wrong! Cannot get updated task of data!");
    }
  };

  tasksTable = () => (
    <div className={classes.TasksTable}>
      <ButtonMain>
        <Button name='Create' handleClick={this.handleClickCreate} />
      </ButtonMain>

      <HeaderLine>
        {headerLine.map((line, idx) => (
          <Line key={idx} width={line.width} text={line.text} />
        ))}
      </HeaderLine>

      {this.state.tasks.map((task, index) => {
        return (
          <Lines key={`${task.taskId}task`}>
            <Line width={5} text={index + 1} />
            <LineLink
              width={20}
              text={task.userName}
              handleClick={this.handleClickDetail(task.taskId)}
            />
            <Line width={25} text={task.start} />
            <Line width={25} text={task.deadline} />

            <ThemeContext.Consumer>
              {isBlack => (
                <ButtonsGroup>
                  <Button name='Edit' color={isBlack ? color.black : color.lightBlue} handleClick={this.handleClickEdit(task.taskId)} />
                  <Button name='Delete' color={isBlack ? color.darkRed : color.red} handleClick={this.handleClickDelete(task.taskId)} />
                </ButtonsGroup>
              )}
            </ThemeContext.Consumer>
          </Lines>
        );
      })}
    </div>
  );

  render() {
    const { isLoading, isShowModalCreate, name, title, hidden, disabled,
      userNameAndId, task, isShowStatus, message, isStatus
    } = this.state;

    return (
      <>
        {isLoading ? (
          this.tasksTable()
        ) : isShowModalCreate || task ? (
          <ModalCreate
            name={name}
            title={title}
            handleClickCreate={this.handleClickCreate}
            hidden={hidden}
            disabled={disabled}
            userName={userNameAndId}
            task={task}
          />
        ) : (
          <Spinner />
        )}
        { isShowStatus ? <Status message={message} isStatus={isStatus} /> : null }
      </>
    );
  }
}
