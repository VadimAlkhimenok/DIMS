import { getCollection } from '../../firebase/firebaseAPI';
import { collection } from '../commonData/collections';

export const getWhoLoginSystem = async (email, adminEmail, mentorEmail, admin, mentor, user) => {
  if (email === adminEmail) {
    return { role: admin, roleEmail: email };
  } else if (email === mentorEmail) {
    return { role: mentor, roleEmail: email };
  } else {
    const [{ userId }] = await getCollection(collection.profile).then((users) =>
      users.filter((user) => user.email === email),
    );
    return { role: user, roleEmail: email, userId };
  }
};
