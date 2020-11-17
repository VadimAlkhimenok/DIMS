import faker from 'faker';

export const userId = `${faker.random.number()}`;
export const userTaskId = `${faker.random.number()}`;
export const taskTrackId = `${faker.random.number()}`;
export const stateId = `${faker.random.number()}`;
export const taskId = `${faker.random.number()}`;

const userProfileData = {
  userId,
  name: faker.name.firstName(),
  email: faker.internet.email(),
  lastName: faker.name.lastName(),
  sex: 'female',
  education: 'higher',
  direction: 'Frontend',
  birthDate: '1994-09-12',
  universityAverageScore: Math.round(Math.random() * 10),
  mathScore: Math.round(Math.random() * 10),
  address: faker.address.streetAddress(),
  mobilePhone: faker.phone.phoneNumber(),
  skype: faker.internet.userName(),
  startDate: '2020-10-24',
  age: faker.date.past().getDate(),
};

const taskData = {
  taskId,
  userId,
  userName: userProfileData.name,
  description: 'create smth',
  start: faker.date.past().getFullYear(),
  deadline: faker.date.future().getFullYear(),
  state: 'Active',
};

const taskTrackData = {
  taskTrackId,
  taskId,
  userId,
  description: taskData.description,
  trackDate: faker.date.past().getFullYear(),
  trackNote: faker.company.catchPhrase(),
};

export { userProfileData, taskTrackData, taskData };
