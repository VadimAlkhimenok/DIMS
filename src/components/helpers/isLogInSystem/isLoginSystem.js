import { getCollection } from '../../firebase/firebaseAPI';
import { collection } from '../commonData/collections';

export const getWhoLoginSystem = async (email, adminEmail, mentorEmail, admin, mentor, user) => {
  if (email === adminEmail) {
    return { role: admin, roleEmail: email };
  } else if (email === mentorEmail) {
    return { role: mentor, roleEmail: email };
  } else {
    let userId;
    await getCollection(collection.profile).then((users) =>
      users.map((user) => {
        if (user.email === email) {
          userId = user.userId;
          return { role: user, roleEmail: email, userId };
        }
        return { role: user, roleEmail: email, userId };
      }),
    );
    return { role: user, roleEmail: email, userId };
  }
};
