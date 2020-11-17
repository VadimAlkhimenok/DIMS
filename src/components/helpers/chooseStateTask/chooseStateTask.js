import { stateOfTask } from '../../../pages/tasks/TasksData';

export const chooseStateTask = (text, active, fail, def, success) => (
  text === stateOfTask.success ? success
  : text === stateOfTask.fail ? fail
  : text === stateOfTask.active ? active
  : def
)