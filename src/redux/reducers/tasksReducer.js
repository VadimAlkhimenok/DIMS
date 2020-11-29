import {
  SET_NAME_ID,
  SET_TASKS,
  SET_TASK,
  SET_LOADING,
  SET_MODAL,
  SET_NAME,
  SET_TITLE,
  SET_HIDDEN,
  SET_DISABLED,
} from '../types';

const tasksState = {
  isLoading: false,
  userNameAndId: [],
  tasks: [],
  task: null,
  isModal: false,
  name: '',
  title: '',
  isHidden: false,
  isDisabled: false,
};

export const tasksReducer = (state = tasksState, action) => {
  switch (action.type) {
    case SET_NAME_ID:
      return { ...state, userNameAndId: action.userNameAndId };
    case SET_TASKS:
      return { ...state, tasks: action.tasks };
    case SET_TASK:
      return { ...state, task: action.task };
    case SET_LOADING:
      return { ...state, isLoading: action.isLoading };
    case SET_MODAL:
      return { ...state, isModal: action.isModal };
    case SET_NAME:
      return { ...state, name: action.name };
    case SET_TITLE:
      return { ...state, title: action.title };
    case SET_HIDDEN:
      return { ...state, isHidden: action.isHidden };
    case SET_DISABLED:
      return { ...state, isDisabled: action.isDisabled };
    default:
      return state;
  }
};
