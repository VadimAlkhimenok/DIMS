import React, { useContext, useEffect, useState } from 'react';
import classes from './MemberTasks.module.css';
import { useParams } from 'react-router-dom';
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
import { Link } from 'react-router-dom';
import { stateOfTask } from '../tasks/TasksData';
import { RolesContext } from '../../context/Contexts';
import { db } from '../../components/firebase/firebase';
import { collection } from '../../components/helpers/commonData/collections';
import ModalCreate from '../../components/modals/modal-create/ModalCreate';

export const MemberTasks = () => {
  const [statTask, setStateTask] = useState('');
  const [isModal, setModal] = useState(false);
  const [memberTasks, setMemberTasks] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isHidden, setHidden] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [userName, setUserName] = useState([]);
  const [name, setName] = useState('');
  const [task, setTask] = useState([]);
  const [title, setTitle] = useState('');
  const { userId } = useParams();

  const { showError } = useContext(RolesContext);

  useEffect(() => {
    document.title = 'Member Tasks';

    const getUserTasks = async (userId) => {
      try {
        await getCollection(collection.task)
          .then((tasks) => tasks.filter((task) => userId === task.userId))
          .then((memberTasks) => {
            setMemberTasks(memberTasks);
          });
      } catch ({ message }) {
        showError(message);
      }
    };
    const getUpdatedUserTasks = async (userId) => {
      try {
        db.collection(collection.task)
          .where('userId', '==', userId)
          .onSnapshot((snapshot) => {
            let memberTasks = snapshot.docs.map((data) => ({ ...data.data() }));
            setMemberTasks(memberTasks);
          });
      } catch ({
        response: {
          data: {
            error: { message },
          },
        },
      }) {
        showError(message);
      }
    };
    const getUserNameAndId = async (userId) => {
      try {
        await getCollection(collection.profile)
          .then((userData) => {
            return userData
              .filter((user) => userId === user.userId)
              .map((user) => ({ name: user.name, id: user.userId }));
          })
          .then((name) => {
            setUserName(name);
            setName(name[0].name);
          });
      } catch ({ message }) {
        showError(message);
      }
    };

    getUpdatedUserTasks(userId).then(() => setLoading(true));
    getUserNameAndId(userId);
    getUserTasks(userId);
  }, [userId, showError]);

  const handleChangeStatusTask = (taskId, stateTask) => async () => {
    await getTaskStatus(taskId, stateTask);
    setStateTask(statTask);
  };

  const handleClickClose = () => {
    setLoading(true);
    setModal(false);
    setHidden(false);
    setDisabled(false);
  };

  const handleClickDetail = async (taskId) => {
    await getTask(taskId).then(() => {
      setLoading(false);
      setModal(true);
      setTitle('Details');
      setHidden(true);
      setDisabled(true);
    });
  };

  const getTaskStatus = async (taskId, state) => {
    try {
      await getUserOfData(collection.task, taskId, 'taskId').then((task) =>
        updateData(taskId, collection.task, { ...task, state }),
      );
    } catch ({ message }) {
      showError(message);
    }
  };

  const getTask = async (taskId) => {
    try {
      await getUserOfData(collection.task, taskId, 'taskId').then((task) => {
        setTask(task[0]);
      });
    } catch ({ message }) {
      showError(message);
    }
  };

  const memberTasksTable = () => (
    <div className={classes.MemberTasks}>
      <Title text={`Hi, dear ${name}! This is your current tasks:`} />

      <HeaderLine>
        <RolesContext.Consumer>
          {({ isUser, isMentor }) =>
            isUser ? (
              <>
                {headerDataUser.map((line, index) => (
                  <Line key={index} width={line.width} text={line.text} />
                ))}
              </>
            ) : isMentor ? (
              <>
                {headerDataMentor.map((line, index) => (
                  <Line key={index} width={line.width} text={line.text} />
                ))}
              </>
            ) : (
              <>
                {headerData.map((line, index) => (
                  <Line key={index} width={line.width} text={line.text} />
                ))}
              </>
            )
          }
        </RolesContext.Consumer>
      </HeaderLine>

      {memberTasks.map((task, index) => {
        return (
          <Lines key={`${index}${task.name}`}>
            <Line width={6} text={index + 1} />
            <LineLink width={40} text={task.description} handleClick={() => handleClickDetail(task.taskId)} />
            <Line width={30} text={task.start} />
            <Line width={30} text={task.deadline} />
            <Line width={15} text={task.state} />
            <RolesContext.Consumer>
              {({ isMentor, isAdmin }) =>
                isMentor || isAdmin ? null : (
                  <Line width={10} text=''>
                    <Button color={'var(--background-table)'}>
                      <Link to={`/users/${task.userId}/tasks/${task.taskId}/track`} className={classes.Link}>
                        Track
                      </Link>
                    </Button>
                  </Line>
                )
              }
            </RolesContext.Consumer>
            <RolesContext.Consumer>
              {({ isUser, isMentor }) =>
                isUser || isMentor ? null : (
                  <>
                    <ButtonsGroup>
                      <Button
                        name='Success'
                        color={'var(--background-table)'}
                        handleClick={handleChangeStatusTask(task.taskId, stateOfTask.success)}
                      />
                      <Button
                        name='Fail'
                        color={'var(--color-button-delete)'}
                        handleClick={handleChangeStatusTask(task.taskId, stateOfTask.fail)}
                      />
                    </ButtonsGroup>
                  </>
                )
              }
            </RolesContext.Consumer>
          </Lines>
        );
      })}
    </div>
  );

  return isLoading ? (
    memberTasksTable()
  ) : isModal || task ? (
    <ModalCreate
      name={userName.name}
      title={title}
      handleClickClose={handleClickClose}
      hidden={isHidden}
      disabled={isDisabled}
      userName={userName}
      task={task}
    />
  ) : (
    <Spinner />
  );
};
