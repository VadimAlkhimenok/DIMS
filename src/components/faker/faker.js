import { db } from '../firebase/firebase';

import { userId, taskId, userProfileData, taskData, taskTrackData, taskTrackId } from './fakerDB';

const createUserProfile = () => {
  db.collection('UserProfile')
    .doc(userId)
    .set(userProfileData)
    .catch((error) => console.log('Error: ', error));
};

const createTaskTrack = () => {
  db.collection('TaskTrack')
    .doc(taskTrackId)
    .set(taskTrackData)
    .catch((error) => console.log('Error: ', error));
};

const createTask = () => {
  db.collection('Task')
    .doc(taskId)
    .set(taskData)
    .catch((error) => console.log('Error: ', error));
};

export const fakerDataBase = () => {
  createUserProfile();
  createTaskTrack();
  createTask();
};
