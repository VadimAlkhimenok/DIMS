import { combineReducers } from 'redux';
import { membersReducer } from './membersReducer';
import { tasksReducer } from './tasksReducer';

export const rootReducer = combineReducers({
  members: membersReducer,
  tasks: tasksReducer,
});
