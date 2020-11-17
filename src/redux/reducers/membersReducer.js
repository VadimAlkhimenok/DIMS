import {
  SET_MEMBERS, SET_LOADING, SET_MEMBER,
  SET_MODAL, SET_NAME, SET_TITLE,
  SET_HIDDEN, SET_DISABLED, SET_REGISTER,
  SET_STATUS, SET_SHOW_STATUS, SET_STATUS_MESSAGE,

} from '../types';

const initialState = {
  isLoading: false,
  members: null,
  member: null,
  isModal: false,
  name: '',
  title: '',
  isHidden: false,
  isDisabled: false,
  isRegister: false,
  isStatus: false,
  isShowStatus: false,
  statusMessage: '',
}

export const membersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {...state, isLoading: action.isLoading}
    case SET_MEMBERS:
      return {...state, members: action.members}
    case SET_MEMBER:
      return {...state, member: action.member}
    case SET_MODAL:
      return {...state, isModal: action.isModal}
    case SET_NAME:
      return {...state, name: action.name}
    case SET_TITLE:
      return {...state, title: action.title}
    case SET_HIDDEN:
      return {...state, isHidden: action.isHidden}
    case SET_DISABLED:
      return {...state, isDisabled: action.isDisabled}
    case SET_REGISTER:
      return {...state, isRegister: action.isRegister}
    case SET_STATUS:
      return {...state, isStatus: action.isStatus}
    case SET_SHOW_STATUS:
      return {...state, isShowStatus: action.isShowStatus}
    case SET_STATUS_MESSAGE:
      return {...state, statusMessage: action.statusMessage}
    default: return state
  }
}