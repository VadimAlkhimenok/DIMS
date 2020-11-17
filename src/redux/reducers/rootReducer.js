import { combineReducers } from 'redux';
import { membersReducer } from './membersReducer';

export const rootReducer = combineReducers({
  members: membersReducer,
});