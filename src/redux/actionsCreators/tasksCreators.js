import { SET_TASK, SET_TASKS, SET_NAME_ID } from '../types';
import { deleteTask, getCollection, getUserOfData } from '../../components/firebase/firebaseAPI';
import { collection } from '../../components/helpers/commonData/collections';
import { setDisabled, setHidden, setLoading, setModal, setName, setRegister, setTitle } from './appCreators';
import { db } from '../../components/firebase/firebase';

export const setTasks = (tasks) => ({ type: SET_TASKS, tasks });
export const setTask = (task) => ({ type: SET_TASK, task });
export const setNameAndId = (userNameAndId) => ({ type: SET_NAME_ID, userNameAndId });

export const getTasks = () => async (dispatch) => {
  try {
    const tasks = await getCollection(collection.task);
    dispatch(setLoading(false));
    dispatch(setTasks(tasks));
    dispatch(setLoading(true));
  } catch ({ message }) {
    return message;
  }
};

export const getTask = (taskId) => async (dispatch) => {
  try {
    let [task] = await getUserOfData(collection.task, taskId, 'taskId');
    dispatch(setTask(task));
  } catch ({ message }) {
    return message;
  }
};

export const getUserNameAndId = () => async (dispatch) => {
  try {
    let usersData = await getCollection(collection.profile);
    const userNameAndId = usersData.map((user) => ({ name: user.name, id: user.userId }));
    dispatch(setNameAndId(userNameAndId));
  } catch ({ message }) {
    return message;
  }
};

export const getUpdatedTasks = () => async (dispatch) => {
  try {
    db.collection(collection.task).onSnapshot((snapshot) => {
      let tasks = snapshot.docs.map((data) => ({ ...data.data() }));
      dispatch(setTasks(tasks));
    });
  } catch ({ message }) {
    return message;
  }
};

export const delTask = (taskId) => async () => {
  try {
    await deleteTask(taskId);
  } catch ({ message }) {
    return message;
  }
};

export const handleClickCreate = () => (dispatch) => {
  dispatch(setTask([]));
  dispatch(setModal(true));
  dispatch(setLoading(false));
  dispatch(setName('Create'));
  dispatch(setTitle('Create task'));
  dispatch(setHidden(false));
  dispatch(setDisabled(false));
  dispatch(setRegister(true));
};
