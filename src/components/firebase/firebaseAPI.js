import { db } from './firebase';
import { errorHandler } from '../helpers/errorHandler/errorHandler';
import faker from 'faker';
import { collection } from '../helpers/commonData/collections';

export const getCollection = (collection) => {
  return db
    .collection(collection)
    .get()
    .then((data) => data.docs.map((item) => ({ ...item.data() })))
    .catch((error) => errorHandler(error));
};

export const updateData = (id, collection, data) => {
  return db
    .collection(collection)
    .doc(id)
    .update({ ...data })
    .catch((error) => errorHandler(error));
};

export const deleteData = (collection, id) => {
  return db
    .collection(collection)
    .doc(id)
    .delete()
    .catch((error) => errorHandler(error));
}

export const addData = (collection, data, nameId) => {
  const generateId = `${faker.random.number()}`;

  return db
    .collection(collection)
    .doc(generateId)
    .set({ ...data, [nameId]: generateId })
    .catch((error) => errorHandler(error));
};

export const getUserOfData = (collection, id, tag = 'userId') => {
  return db
    .collection(collection)
    .where(tag, '==', id)
    .get()
    .then((info) => info.docs.map((info) => ({ ...info.data() })))
    .catch((error) => errorHandler(error));
};

export const deleteUser = async (userId) => {
  return await getCollection(collection.task)
    .then(tasks => tasks.filter(task => task.userId === userId))
    .then(tasks => tasks.map(async task => await deleteTask(task.taskId)))
    .then(async () => await deleteData(collection.profile, userId))
    .catch((error) => errorHandler(error));
};

export const deleteTask = async (taskId) => {
  return await getUserOfData(collection.track, taskId, 'taskId')
    .then(async track => {
      if (track.length) {
        return track.map(async track => await deleteData(collection.track, track.taskTrackId));
      }
    })
    .then(async () => await deleteData(collection.task, taskId))
    .catch((error) => errorHandler(error));
};