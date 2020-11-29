import { SET_MEMBER, SET_MEMBERS } from '../types';
import { deleteUser, getCollection, getUserOfData } from '../../components/firebase/firebaseAPI';
import { collection } from '../../components/helpers/commonData/collections';
import { db } from '../../components/firebase/firebase';
import { setDisabled, setHidden, setLoading, setModal, setName, setRegister, setTitle } from './appCreators';

export const setMembers = (members) => ({ type: SET_MEMBERS, members });
export const setMember = (member) => ({ type: SET_MEMBER, member });

export const getListMembers = () => async (dispatch) => {
  try {
    let members = await getCollection(collection.profile);
    dispatch(setLoading(false));
    dispatch(setMembers(members));
    dispatch(setLoading(true));
  } catch ({ message }) {
    return message;
  }
};

export const getMember = (userId) => async (dispatch) => {
  try {
    let [user] = await getUserOfData(collection.profile, userId);
    dispatch(setMember([user]));
  } catch ({ message }) {
    return message;
  }
};

export const getUpdatedMembers = () => async (dispatch) => {
  try {
    db.collection(collection.profile).onSnapshot((snapshot) => {
      let members = snapshot.docs.map((data) => ({ ...data.data() }));
      dispatch(setMembers(members));
    });
  } catch ({ message }) {
    return message;
  }
};

export const deleteMember = (userId) => async () => {
  try {
    await deleteUser(userId);
  } catch ({ message }) {
    return message;
  }
};

export const handleClickRegister = () => (dispatch) => {
  dispatch(setMember([]));
  dispatch(setLoading(false));
  dispatch(setModal(true));
  dispatch(setName('Create'));
  dispatch(setTitle('Registration'));
  dispatch(setHidden(false));
  dispatch(setDisabled(false));
  dispatch(setRegister(true));
};
