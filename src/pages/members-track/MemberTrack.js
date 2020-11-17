import React, { Component } from 'react';
import classes from './MemberTrack.module.css';
import { HeaderLine } from '../../components/table/header-line/HeaderLine';
import { Button } from '../../components/UI/button/Button';
import { Line } from '../../components/table/line/Line';
import { Lines } from '../../components/table/lines/Lines';
import { LineLink } from '../../components/table/line-link/LineLink';
import { ButtonsGroup } from '../../components/UI/buttons-group/ButtonsGroup';
import { Spinner } from '../../components/UI/spinner/Spinner';
import { color } from '../../components/UI/colors/colors';
import ModalTrack from '../../components/modals/modal-track/ModalTrack';
import { headerLineData } from './MembersTrackData';
import { Title } from '../../components/title/Title';
import { ButtonMain } from '../../components/UI/button-main/ButtonMain';
import { db } from '../../components/firebase/firebase';
import { Status } from '../../components/UI/status/Status';
import { ThemeContext } from '../../context/Contexts';
import { collection } from '../../components/helpers/commonData/collections';
import { deleteData, getCollection } from '../../components/firebase/firebaseAPI';

export default class MembersTrack extends Component {
  state = {
    task: null,
    currentTask: null,
    taskName: '',
    membersTrack: null,
    isShowModalTrack: false,
    name: '',
    title: '',
    hidden: false,
    disabled: false,
    isLoading: false,

    isStatus: false,
    isShowStatus: false,
    statusMessage: '',
  };

  async componentDidMount() {
    const { taskId, userId } = this.props.match.params;

    await this.getTracks(taskId);
    await this.getUpdatedTrack(taskId);
    await this.getTaskName(taskId);
    this.setState({ currentTask: {taskId, userId} });
    document.title = 'Members Track';
  };

  showError = message => {
    this.setState({
      isShowStatus: true,
      statusMessage: message,
    })
  };

  showSuccess = message => {
    this.setState({
      isShowStatus: true,
      statusMessage: message,
      isStatus: true,
    })
  };

  resetStatus = () => {
    this.setState({
      isShowStatus: false,
      statusMessage: ''
    })
  };

  handleClickTrack = () => {
    this.setState({
      isShowModalTrack: !this.state.isShowModalTrack,
      isLoading: !this.state.isLoading,
      hidden: false,
      disabled: false,
      name: 'Save',
      title: 'Task Track',
    });
  };

  handleClickDetail = (event, taskTrackId) => async () => {
    event.preventDefault();

    try {
      await this.getTrack(taskTrackId);
    } catch (e) {
      this.showError("Something wrong! Cannot get user's track data");
    }

    this.setState({
      isShowModalTrack: !this.state.isShowModalTrack,
      isLoading: !this.state.isLoading,
      hidden: true,
      disabled: true,
      title: 'Details',
    });
  };

  handleClickEdit = (taskTrackId) => async () => {
    try {
      await this.getTrack(taskTrackId);
    } catch (e) {
      this.showError("Something wrong! Cannot get user's track data");
    }

    this.setState({
      isShowModalTrack: !this.state.isShowModalTrack,
      isLoading: !this.state.isLoading,
      name: 'Save changes',
      hidden: false,
      disabled: false,
      title: 'Edit',
    });
  };

  handleClickDelete = (taskTrackId) => async () => {
    try {
      await deleteData(collection.track, taskTrackId);
      this.showSuccess("Success! Subtask was deleted!");
      this.resetStatus();
    } catch (e) {
      this.showError("Error! Task track wasn't deleted!")
    }
  };

  getTracks = async taskId => {
    try {
      let membersTrack = await getCollection(collection.track).then(tracks => tracks.filter(track => taskId === track.taskId));
      this.setState({
        membersTrack,
        isLoading: !this.state.isLoading,
      });
    } catch (e) {
      this.showError("Something wrong! Cannot get task!");
    }
  };

  getTrack = async taskTrackId => {
    try {
      let [task] = await getCollection(collection.track).then(tracks => tracks.filter(track => taskTrackId === track.taskTrackId));
      this.setState({ task });
    } catch (e) {
      this.showError("Something wrong! Cannot get task!");
    }
  };

  getTaskName = async taskId => {
    try {
      let tasksData = await getCollection(collection.task);
      const [taskName] = tasksData.filter((task) => taskId === task.taskId).map(task => task.description);
      this.setState({ taskName });
    } catch (e) {
      this.showError("Something wrong! Cannot get task of data!");
    }
  };

  getUpdatedTrack = async taskId => {
    try {
      db.collection(collection.track).where('taskId', '==', taskId).onSnapshot((snapshot) => {
        let membersTrack = snapshot.docs.map((data) => ({ ...data.data() }));
        this.setState({ membersTrack });
      });
    } catch (e) {
      this.showError("Something wrong! Cannot get updated user's track data!");
    }
  }

  membersTrackTable = () => {
    const { membersTrack } = this.state;

    return (
      <div className={classes.MembersTrackTable}>
        <Title text='This is your task track:' />

        <ButtonMain>
          <Button name='Add' handleClick={this.handleClickTrack} />
        </ButtonMain>

        <HeaderLine>
          {headerLineData.map((line, idx) => (
            <Line key={idx} width={line.width} text={line.text} />
          ))}
        </HeaderLine>

        {membersTrack.map((track, index) => {
          return (
            <Lines key={`${track.taskTrackId}track`}>
              <Line width={5} text={index + 1} />
              <LineLink
                width={25}
                text={track.description}
                handleClick={this.handleClickDetail(track.taskTrackId)}
              />
              <Line width={25} text={track.trackNote} />
              <Line width={20} text={track.trackDate} />

              <ThemeContext.Consumer>
                {isBlack => (
                  <ButtonsGroup width={25}>
                    <Button
                      color={isBlack ? color.black : color.lightBlue}
                      name='Edit'
                      handleClick={this.handleClickEdit(track.taskTrackId)}
                    />
                    <Button
                      color={isBlack ? color.darkRed : color.red}
                      name='Delete'
                      handleClick={this.handleClickDelete(track.taskTrackId)}
                    />
                  </ButtonsGroup>
                )}
              </ThemeContext.Consumer>
            </Lines>
          );
        })}
      </div>
    );
  };

  render() {
    const { isLoading, isShowModalTrack, name, title, hidden, disabled, task, currentTask, taskName, isShowStatus, statusMessage, isStatus } = this.state;

    return (
      <>
        {
          isLoading
            ? this.membersTrackTable()
            : isShowModalTrack || task
                ? <ModalTrack
                    task={task}
                    name={name}
                    title={title}
                    handleClickTrack={this.handleClickTrack}
                    hidden={hidden}
                    disabled={disabled}
                    currentTask={currentTask}
                    taskName={taskName}
                  />
                  : <Spinner />
        }
        { isShowStatus ? <Status message={statusMessage} isStatus={isStatus} /> : null }
      </>
    );
  }
}
