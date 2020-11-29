import React, { PureComponent } from 'react';
import classes from './Tasks.module.css';
import { HeaderLine } from '../../components/table/header-line/HeaderLine';
import { Button } from '../../components/UI/button/Button';
import { Line } from '../../components/table/line/Line';
import { Lines } from '../../components/table/lines/Lines';
import { LineLink } from '../../components/table/line-link/LineLink';
import { ButtonsGroup } from '../../components/UI/buttons-group/ButtonsGroup';
import { ButtonMain } from '../../components/UI/button-main/ButtonMain';
import { Spinner } from '../../components/UI/spinner/Spinner';
import ModalCreate from '../../components/modals/modal-create/ModalCreate';
import { headerLine } from './TasksData';
import { RolesContext } from '../../context/Contexts';
import { connect } from 'react-redux';
import { handleClickClose, setEdit, setDetail } from '../../redux/actionsCreators/appCreators';
import {
  getTask,
  getTasks,
  getUpdatedTasks,
  getUserNameAndId,
  handleClickCreate,
  delTask,
} from '../../redux/actionsCreators/tasksCreators';
import { successResponseData } from '../../components/helpers/commonData/successResponseData';

class Tasks extends PureComponent {
  async componentDidMount() {
    const { getTasks, getUpdatedTasks, getUserNameAndId } = this.props;
    await Promise.all([await getTasks(), await getUpdatedTasks(), await getUserNameAndId()]);
    document.title = 'Tasks';
  }

  handleClickEdit = (taskId) => async () => {
    const { getTask, setEdit } = this.props;
    const { showError } = this.context;
    try {
      await getTask(taskId).then(() => setEdit(taskId));
    } catch ({ message }) {
      showError(message);
    }
  };

  handleClickDetail = (taskId) => async () => {
    const { setDetail, getTask } = this.props;
    const { showError } = this.context;
    try {
      await getTask(taskId).then(() => setDetail(taskId));
    } catch ({ message }) {
      showError(message);
    }
  };

  handleClickDelete = (taskId) => async () => {
    const { delTask } = this.props;
    const { showError, showSuccess } = this.context;
    const { deleTask } = successResponseData;
    try {
      await delTask(taskId);
      showSuccess(deleTask);
    } catch ({ message }) {
      showError(message);
    }
  };

  tasksTable = () => {
    const { tasks } = this.props.tasks;
    const { handleClickCreate } = this.props;

    return (
      <div className={classes.TasksTable}>
        <ButtonMain>
          <Button name='Create' handleClick={handleClickCreate} />
        </ButtonMain>

        <HeaderLine>
          {headerLine.map((line, idx) => (
            <Line key={idx} width={line.width} text={line.text} />
          ))}
        </HeaderLine>

        {tasks.map((task, index) => {
          return (
            <Lines key={`${task.taskId}task`}>
              <Line width={5} text={index + 1} />
              <LineLink width={20} text={task.userName} handleClick={this.handleClickDetail(task.taskId)} />
              <Line width={25} text={task.start} />
              <Line width={25} text={task.deadline} />

              <ButtonsGroup>
                <Button name='Edit' color={'var(--background-table)'} handleClick={this.handleClickEdit(task.taskId)} />
                <Button
                  name='Delete'
                  color={'var(--color-button-delete)'}
                  handleClick={this.handleClickDelete(task.taskId)}
                />
              </ButtonsGroup>
            </Lines>
          );
        })}
      </div>
    );
  };

  render() {
    const { isLoading, userNameAndId, task, isModal, name, title, isHidden, isDisabled } = this.props.tasks;
    const { handleClickClose } = this.props;

    return (
      <>
        {isLoading ? (
          this.tasksTable()
        ) : isModal || task ? (
          <ModalCreate
            name={name}
            title={title}
            handleClickClose={handleClickClose}
            hidden={isHidden}
            disabled={isDisabled}
            userName={userNameAndId}
            task={task}
          />
        ) : (
          <Spinner />
        )}
      </>
    );
  }
}

Tasks.contextType = RolesContext;

const mapStateToProps = (state) => {
  const { isLoading, userNameAndId, tasks, task, isModal, name, title, isHidden, isDisabled } = state;

  return { isLoading, userNameAndId, tasks, task, isModal, name, title, isHidden, isDisabled };
};

export default connect(mapStateToProps, {
  getTask,
  getTasks,
  getUpdatedTasks,
  getUserNameAndId,
  handleClickClose,
  handleClickCreate,
  setEdit,
  setDetail,
  delTask,
})(Tasks);
