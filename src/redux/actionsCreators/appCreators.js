import { SET_LOADING, SET_MODAL, SET_NAME, SET_TITLE, SET_HIDDEN, SET_DISABLED, SET_REGISTER } from '../types';

export const setLoading = (isLoading) => ({ type: SET_LOADING, isLoading });
export const setModal = (isModal) => ({ type: SET_MODAL, isModal });
export const setName = (name) => ({ type: SET_NAME, name });
export const setTitle = (title) => ({ type: SET_TITLE, title });
export const setHidden = (isHidden) => ({ type: SET_HIDDEN, isHidden });
export const setDisabled = (isDisabled) => ({ type: SET_DISABLED, isDisabled });
export const setRegister = (isRegister) => ({ type: SET_REGISTER, isRegister });

export const handleClickClose = () => (dispatch) => {
  dispatch(setModal(false));
  dispatch(setLoading(true));
};

export const setEdit = () => (dispatch) => {
  dispatch(setLoading(false));
  dispatch(setModal(true));
  dispatch(setName('Save'));
  dispatch(setTitle('Edit'));
  dispatch(setHidden(false));
  dispatch(setDisabled(false));
  dispatch(setRegister(false));
};

export const setDetail = () => (dispatch) => {
  dispatch(setLoading(false));
  dispatch(setModal(true));
  dispatch(setTitle('Details'));
  dispatch(setHidden(true));
  dispatch(setDisabled(true));
};
