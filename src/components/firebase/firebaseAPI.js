import { db } from './firebase';
import faker from 'faker';
import { collection } from '../helpers/commonData/collections';
import firebase from 'firebase';
import emailjs from 'emailjs-com';

export const getCollection = (collection) => {
  return db
    .collection(collection)
    .get()
    .then((data) => data.docs.map((item) => ({ ...item.data() })))
    .catch((error) => error);
};

export const updateData = (id, collection, data) => {
  return db
    .collection(collection)
    .doc(id)
    .update({ ...data })
    .catch((error) => error);
};

export const deleteData = (collection, id) => {
  return db
    .collection(collection)
    .doc(id)
    .delete()
    .catch((error) => error);
};

export const addData = (collection, data, nameId) => {
  const generateId = `${faker.random.number()}`;

  return db
    .collection(collection)
    .doc(generateId)
    .set({ ...data, [nameId]: generateId })
    .catch((error) => error);
};

export const getUserOfData = (collection, id, tag = 'userId') => {
  return db
    .collection(collection)
    .where(tag, '==', id)
    .get()
    .then((info) => info.docs.map((info) => ({ ...info.data() })))
    .catch((error) => error);
};

export const deleteUser = async (userId) => {
  return await getCollection(collection.task)
    .then((tasks) => tasks.filter((task) => task.userId === userId))
    .then((tasks) => tasks.map(async (task) => await deleteTask(task.taskId)))
    .then(async () => await deleteData(collection.profile, userId))
    .catch((error) => error);
};

export const deleteTask = async (taskId) => {
  return await getUserOfData(collection.track, taskId, 'taskId')
    .then(async (track) => {
      if (track.length) {
        return track.map(async (track) => await deleteData(collection.track, track.taskTrackId));
      }
    })
    .then(async () => await deleteData(collection.task, taskId))
    .catch((error) => error);
};

export const registerUser = async (email, userData, name) => {
  const { REACT_APP_EMAIL_SERVICE_ID, REACT_APP_EMAIL_TEMPLATE_ID, REACT_APP_EMAIL_USER_ID } = process.env;

  const sendData = {
    email,
    name,
    password: `${name.toUpperCase()}${faker.random.number()}`,
    message: 'Do not answer for this message.',
    link: process.env.REACT_APP_LINK_PROJECT,
  };

  return Promise.all([
    await firebase.auth().createUserWithEmailAndPassword(email, sendData.password),
    await addData(collection.profile, userData, 'userId'),
    await emailjs.send(REACT_APP_EMAIL_SERVICE_ID, REACT_APP_EMAIL_TEMPLATE_ID, sendData, REACT_APP_EMAIL_USER_ID),
  ]).catch((error) => error);
};

export const resetPassword = async (email) => {
  await firebase.auth().sendPasswordResetEmail(email, null);
};
