import React, { Component } from 'react';
import classes from './MemberTrack.module.css';
import { HeaderLine } from '../../components/table/header-line/HeaderLine';
import { Button } from '../../components/UI/button/Button';
import { Line } from '../../components/table/line/Line';
import { Lines } from '../../components/table/lines/Lines';
import { LineLink } from '../../components/table/line-link/LineLink';
import { ButtonsGroup } from '../../components/UI/buttons-group/ButtonsGroup';
import { Spinner } from '../../components/UI/spinner/Spinner';
import ModalTrack from '../../components/modals/modal-track/ModalTrack';
import { headerLineData } from './MembersTrackData';
import { Title } from '../../components/title/Title';
import { ButtonMain } from '../../components/UI/button-main/ButtonMain';
import { db } from '../../components/firebase/firebase';
import { RolesContext } from '../../context/Contexts';
import { collection } from '../../components/helpers/commonData/collections';
import { deleteData, getCollection } from '../../components/firebase/firebaseAPI';
import { successResponseData } from '../../components/helpers/commonData/successResponseData';

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
  };

  async componentDidMount() {
    const { taskId, userId } = this.props.match.params;

    await this.getTracks(taskId);
    await this.getUpdatedTrack(taskId);
    await this.getTaskName(taskId);
    this.setState({ currentTask: { taskId, userId } });
    document.title = 'Members Track';
  }

  handleClickTrack = () => {
    this.setState({
      isShowModalTrack: !this.state.isShowModalTrack,
      isLoading: !this.state.isLoading,
      hidden: false,
      disabled: false,
      name: 'Save',
      title: 'Task Track',
      task: null,
    });
  };

  handleClickDetail = (taskTrackId) => async () => {
    await this.getTrack(taskTrackId);

    this.setState({
      isShowModalTrack: !this.state.isShowModalTrack,
      isLoading: !this.state.isLoading,
      hidden: true,
      disabled: true,
      title: 'Details',
    });
  };

  handleClickEdit = (taskTrackId) => async () => {
    await this.getTrack(taskTrackId);

    this.setState({
      isShowModalTrack: !this.state.isShowModalTrack,
      isLoading: !this.state.isLoading,
      name: 'Save',
      hidden: false,
      disabled: false,
      title: 'Edit',
    });
  };

  handleClickDelete = (taskTrackId) => async () => {
    const { showError, showSuccess } = this.context;
    const { deleteTrack } = successResponseData;

    try {
      await deleteData(collection.track, taskTrackId);
      showSuccess(deleteTrack);
    } catch ({ message }) {
      showError(message);
    }
  };

  getTracks = async (taskId) => {
    const { showError } = this.context;
    try {
      let membersTrack = await getCollection(collection.track).then((tracks) =>
        tracks.filter((track) => taskId === track.taskId),
      );
      this.setState({
        membersTrack,
        isLoading: !this.state.isLoading,
      });
    } catch ({ message }) {
      showError(message);
    }
  };

  getTrack = async (taskTrackId) => {
    const { showError } = this.context;

    try {
      let [task] = await getCollection(collection.track).then((tracks) =>
        tracks.filter((track) => taskTrackId === track.taskTrackId),
      );
      this.setState({ task });
    } catch ({ message }) {
      showError(message);
    }
  };

  getTaskName = async (taskId) => {
    const { showError } = this.context;

    try {
      let tasksData = await getCollection(collection.task);
      const [taskName] = tasksData.filter((task) => taskId === task.taskId).map((task) => task.description);
      this.setState({ taskName });
    } catch ({ message }) {
      showError(message);
    }
  };

  getUpdatedTrack = async (taskId) => {
    const { showError } = this.context;

    try {
      db.collection(collection.track)
        .where('taskId', '==', taskId)
        .onSnapshot((snapshot) => {
          let membersTrack = snapshot.docs.map((data) => ({ ...data.data() }));
          this.setState({ membersTrack });
        });
    } catch ({ message }) {
      showError(message);
    }
  };

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
              <LineLink width={25} text={track.description} handleClick={this.handleClickDetail(track.taskTrackId)} />
              <Line width={25} text={track.trackNote} />
              <Line width={20} text={track.trackDate} />

              <ButtonsGroup width={25}>
                <Button
                  color={'var(--background-table)'}
                  name='Edit'
                  handleClick={this.handleClickEdit(track.taskTrackId)}
                />
                <Button
                  color={'var(--color-button-delete)'}
                  name='Delete'
                  handleClick={this.handleClickDelete(track.taskTrackId)}
                />
              </ButtonsGroup>
            </Lines>
          );
        })}
      </div>
    );
  };

  render() {
    const { isLoading, isShowModalTrack, name, title, hidden, disabled, task, currentTask, taskName } = this.state;

    return (
      <>
        {isLoading ? (
          this.membersTrackTable()
        ) : isShowModalTrack || task ? (
          <ModalTrack
            task={task}
            name={name}
            title={title}
            handleClickTrack={this.handleClickTrack}
            hidden={hidden}
            disabled={disabled}
            currentTask={currentTask}
            taskName={taskName}
          />
        ) : (
          <Spinner />
        )}
      </>
    );
  }
}

MembersTrack.contextType = RolesContext;
