import React, { Component } from 'react';
import classes from './MemberProgress.module.css';
import { headerLineData } from './MemberProgressData';
import { Title } from '../../components/title/Title';
import { HeaderLine } from '../../components/table/header-line/HeaderLine';
import { Line } from '../../components/table/line/Line';
import { Lines } from '../../components/table/lines/Lines';
import { LineLink } from '../../components/table/line-link/LineLink';
import { Spinner } from '../../components/UI/spinner/Spinner';
import ModalCreate from '../../components/modals/modal-create/ModalCreate';
import { getCollection, getUserOfData } from '../../components/firebase/firebaseAPI';
import { collection } from '../../components/helpers/commonData/collections';

export default class MemberProgress extends Component {
  state = {
    tasksProgress: null,
    isShowModalCreate: false,
    isLoading: false,
    hidden: false,
    disabled: false,
    name: '',
    userName: '',
    isStatus: false,
    isShowStatus: false,
    statusMessage: '',
    task: null,
    userNameAndId: null,
  };

  async componentDidMount() {
    const { userId } = this.props.match.params;
    await this.getUserNameAndId(userId);
    await this.getUserProgress(userId);
    document.title = 'Member Progress';
  }

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

  handleClickCreate = () => {
    this.setState({
      isLoading: !this.state.isLoading,
      isShowModalCreate: !this.state.isShowModalCreate,
      hidden: false,
      disabled: false,
    });
  };

  handleClickDetail = (taskId) => async () => {
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

  getUserProgress = async userId => {
    try {
      const tasksProgress = await getUserOfData(collection.track, userId);
      this.setState({
        tasksProgress,
        isLoading: !this.state.isLoading,
      });
    } catch (e) {
      this.showError("Something wrong! Cannot get task of progress!")
    }
  };

  getUserNameAndId = async userId => {
    try {
      let usersData = await getCollection(collection.profile);
      const [name, id] = usersData.filter((user) => userId === user.userId).map(user => ({ name: user.name, id: user.userId }));
      this.setState({ userNameAndId: name, id });
    } catch (e) {
      this.showError("Something wrong! Cannot get task of data!");
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

  render() {
    const { isLoading, userNameAndId, tasksProgress, isShowModalCreate, name, title, hidden, disabled, task } = this.state;

    return isLoading ? (
      <div className={classes.MemberProgressTable}>
        <Title text={`${userNameAndId.name}'s progress:`} />

        <HeaderLine>
          {headerLineData.map((line, idx) => (
            <Line key={idx} width={line.width} text={line.text} />
          ))}
        </HeaderLine>

        {tasksProgress.map((progress, index) => (
          <Lines key={`${progress.taskId}${index}progress`}>
            <Line width={10} text={index + 1} />
            <LineLink width={30} text={progress.description} handleClick={this.handleClickDetail(progress.taskId)} />
            <Line width={30} text={progress.trackNote} />
            <Line width={30} text={progress.trackDate} />
          </Lines>
        ))}
      </div>
    ) : isShowModalCreate || task ? (
      <ModalCreate
        name={name}
        title={title}
        handleClickCreate={this.handleClickCreate}
        hidden={hidden}
        disabled={disabled}
        task={task}
        userName={userNameAndId}
      />
    ) : (
      <Spinner />
    );
  }
}
