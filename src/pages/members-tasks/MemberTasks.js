import React, { Component } from 'react';
import classes from './MemberTasks.module.css';
import { Button } from '../../components/UI/button/Button';
import { HeaderLine } from '../../components/table/header-line/HeaderLine';
import { Line } from '../../components/table/line/Line';
import { Lines } from '../../components/table/lines/Lines';
import { LineLink } from '../../components/table/line-link/LineLink';
import { ButtonsGroup } from '../../components/UI/buttons-group/ButtonsGroup';
import { Title } from '../../components/title/Title';
import { Spinner } from '../../components/UI/spinner/Spinner';
import { getCollection, getUserOfData, updateData } from '../../components/firebase/firebaseAPI';
import { headerData, headerDataMentor, headerDataUser } from './MemberTasksData';
import { color } from '../../components/UI/colors/colors';
import ModalTrack from '../../components/modals/modal-track/ModalTrack';
import { Link } from 'react-router-dom';
import { stateOfTask } from '../tasks/TasksData';
import { RolesContext, ThemeContext } from '../../context/Contexts';
import { db } from '../../components/firebase/firebase';
import { collection } from '../../components/helpers/commonData/collections';

export default class MemberTasks extends Component {
  state = {
    stateTask: '',
    isShowModalTrack: false,
    memberTasks: null,
    isLoading: false,
    hidden: false,
    disabled: false,
    name: '',
    userName: '',
    isStatus: false,
    isShowStatus: false,
    statusMessage: '',
    isMount: false,
  };

  async componentDidMount() {
    const { userId } = this.props.match.params;
    await this.getUserTasks(userId);
    await this.getUserName(userId);
    document.title = 'Member Tasks';
  };

  async componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
    if (this.state.isMount !== prevState.isMount) {
      const { userId } = this.props.match.params;
      this.setState({ isMount: false });
      await this.getUpdatedUserTasks(userId);
    }
  }

  showError = message => {
    this.setState({
      isShowStatus: true,
      statusMessage: message,
    })
  };

  handleChangeStatusTask = (taskId, stateTask) => async () => {
    try {
      await this.getTask(taskId, stateTask);
      this.setState({ stateTask, isMount: true });
    } catch (e) {
      this.showError('Something wrong! Cannot get task of data!');
    }
  };

  handleClickTrack = () => {
    this.setState({
      isShowModalTrack: !this.state.isShowModalRegister,
      isLoading: !this.state.isLoading,
      hidden: false,
      disabled: false,
      name: 'Save',
    });
  };

  getUserTasks = async (userId) => {
    try {
      let memberTasks = await getCollection(collection.task).then(tasks => tasks.filter(task => userId === task.userId));
      this.setState({
        memberTasks,
        isLoading: !this.state.isLoading,
      });
    } catch (e) {
      this.showError("Something wrong! Cannot get task!");
    }
  };

  getUserName = async userId => {
    try {
      let usersData = await getCollection(collection.profile);
      const [userName] = usersData.filter((user) => userId === user.userId).map(user => user.name);
      this.setState({ userName });
    } catch (e) {
      this.showError("Something wrong! Cannot get task of data!");
    }
  };

  getTask = async (taskId, state) => {
    try {
      await getUserOfData(collection.task, taskId, 'taskId')
        .then(task => updateData(taskId, collection.task, { ...task, state }))
    } catch (e) {
      this.showError("Something wrong! Status of task wasn't updated!");
    }
  };

  getUpdatedUserTasks = async userId => {
    try {
      db.collection(collection.task)
        .where('userId', '==', userId)
        .onSnapshot((snapshot) => {
          let memberTasks = snapshot.docs.map((data) => ({ ...data.data() }));
          this.setState({ memberTasks });
        });
    } catch (e) {
      this.showError("Something wrong! Cannot get updated user of data!");
    }
  };

  render() {
    const {
      isLoading,
      isShowModalTrack,
      name,
      hidden,
      disabled,
      memberTasks,
      userName,
    } = this.state;

    return isLoading ? (
      <div className={classes.MemberTasks}>
        <Title text={`Hi, dear ${userName}! This is your current tasks:`} />

        <HeaderLine>
          <RolesContext.Consumer>
            {({isUser, isMentor}) => (
              isUser
                ? <>{headerDataUser.map((line, index) => (
                    <Line key={index} width={line.width} text={line.text} />
                  ))}</>
                : isMentor
                    ? <>{headerDataMentor.map((line, index) => (
                        <Line key={index} width={line.width} text={line.text} />
                      ))}</>
                    : <>{headerData.map((line, index) => (
                        <Line key={index} width={line.width} text={line.text} />
                      ))}</>
            )}
          </RolesContext.Consumer>
        </HeaderLine>

        <ThemeContext.Consumer>
          {isBlack => (
            <>{memberTasks.map((task, index) => {
                return (
                  <Lines key={`${index}${task.name}`}>
                    <Line width={5} text={index + 1} />
                    <LineLink width={15} text={task.description} />
                    <Line width={20} text={task.start} />
                    <Line width={20} text={task.deadline} />
                    <Line width={15} text={task.state} />
                    <RolesContext.Consumer>
                      {({isMentor, isAdmin}) => (
                        isMentor || isAdmin ? null : <Line width={10} text=''>
                          <RolesContext.Consumer>
                            {({isAdmin, isMentor}) => (
                              isAdmin || isMentor
                                ? null
                                : <Button color={isBlack ? color.black : color.lightBlue}>
                                  <Link to={`/users/${task.userId}/tasks/${task.taskId}/track`} className={classes.Link}>
                                    Track
                                  </Link>
                                </Button>
                            )}
                          </RolesContext.Consumer>
                        </Line>
                      )}
                    </RolesContext.Consumer>
                    <RolesContext.Consumer>
                      {({isUser, isMentor}) => (
                        isUser || isMentor
                          ? null
                          : <>
                            <ButtonsGroup>
                              <Button
                                name='Success'
                                color={isBlack ? color.black : color.lightBlue}
                                handleClick={this.handleChangeStatusTask(task.taskId, stateOfTask.success)}
                              />
                              <Button
                                name='Fail'
                                color={isBlack ? color.darkRed : color.red}
                                handleClick={this.handleChangeStatusTask(task.taskId, stateOfTask.fail)}
                              />
                            </ButtonsGroup>
                          </>
                      )}
                    </RolesContext.Consumer>
                  </Lines>
                );
              })}</>
          )}
        </ThemeContext.Consumer>
      </div>
    ) : <Spinner /> && isShowModalTrack ? (
      <ModalTrack
        name={name}
        handleClickTrack={this.handleClickTrack}
        handleSubmit={this.handleClickSubmit}
        hidden={hidden}
        disabled={disabled}
      />
    ) : (
      <Spinner />
    );
  }
}
