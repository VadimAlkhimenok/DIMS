import {
  SET_NAME, SET_LOADING, SET_MEMBER,
  SET_MEMBERS, SET_MODAL, SET_TITLE,
  SET_HIDDEN, SET_DISABLED, SET_REGISTER,
  SET_STATUS, SET_SHOW_STATUS, SET_STATUS_MESSAGE,
} from '../types';
import { deleteUser, getCollection, getUserOfData } from '../../components/firebase/firebaseAPI';
import { collection } from '../../components/helpers/commonData/collections';
import { db } from '../../components/firebase/firebase';

export const setLoading = isLoading => ({ type: SET_LOADING, isLoading });
export const setMembers = members => ({type: SET_MEMBERS, members});
export const setMember = member => ({type: SET_MEMBER, member});
export const setModal = isModal => ({type: SET_MODAL, isModal});
export const setName = name => ({ type: SET_NAME, name});
export const setTitle = title => ({ type: SET_TITLE, title});
export const setHidden = isHidden => ({ type: SET_HIDDEN, isHidden});
export const setDisabled = isDisabled => ({ type: SET_DISABLED, isDisabled});
export const setRegister = isRegister => ({ type: SET_REGISTER, isRegister});
export const setStatus = isStatus => ({ type: SET_STATUS, isStatus});
export const setShowStatus = isShowStatus => ({ type: SET_SHOW_STATUS, isShowStatus});
export const setStatusMessage = message => ({ type: SET_STATUS_MESSAGE, message});


export const getListMembers = () => async dispatch => {
  try {
    let members = await getCollection(collection.profile);
    dispatch(setMembers(members));
    dispatch(setLoading(true));
  } catch (e) {
    dispatch(showError("Something wrong! Cannot get users!"))
  }
};

export const getMember = userId => async dispatch => {
  try {
    let [user] = await getUserOfData(collection.profile, userId);
    dispatch(setMember([user]));
  } catch (e) {
    dispatch(showError('Something wrong! Cannot get user!'));
  }
};

export const getUpdatedMembers = () => async dispatch => {
  try {
    db.collection(collection.profile).onSnapshot((snapshot) => {
      let members = snapshot.docs.map((data) => ({ ...data.data() }));
      dispatch(setMembers(members));
    });
  } catch (e) {
    console.log("Something wrong! Cannot get updated user of data!");
  }
};

export const deleteMember = userId => async dispatch => {
  try {
    await deleteUser(userId);
    dispatch(showSuccess('Success! User was deleted!'));
    dispatch(resetStatus());
  } catch (e) {
    dispatch(showError("Something wrong! User wasn't deleted!"));
  }
};

export const showError = message => dispatch => {
  dispatch(setShowStatus(true));
  dispatch(setStatusMessage(message));
};

export const showSuccess = message => dispatch => {
  dispatch(setStatus(true));
  dispatch(setShowStatus(true));
  dispatch(setStatusMessage(message));
};

export const resetStatus = () => dispatch => {
  setTimeout(() => {
    dispatch(setShowStatus(false));
    dispatch(setStatusMessage(''));
  }, 1500)
};

export const handleClickClose = () => dispatch => {
  dispatch(setModal(false));
  dispatch(setLoading(true));
};

export const handleClickRegister = () => dispatch => {
  dispatch(setLoading(false));
  dispatch(setModal(true));
  dispatch(setName('Create'));
  dispatch(setTitle('Registration'));
  dispatch(setHidden(false));
  dispatch(setDisabled(false));
  dispatch(setRegister(true));
};

export const editMember = userId => dispatch => {
  dispatch(getMember(userId));
  dispatch(setModal(true));
  dispatch(setName('Save changes'));
  dispatch(setTitle('Edit'));
  dispatch(setHidden(false));
  dispatch(setDisabled(false));
  dispatch(setRegister(false));
};

export const detailMember = userId => dispatch => {
  dispatch(getMember(userId));
  dispatch(setModal(true));
  dispatch(setTitle('Details'));
  dispatch(setHidden(true));
  dispatch(setDisabled(true));
};
