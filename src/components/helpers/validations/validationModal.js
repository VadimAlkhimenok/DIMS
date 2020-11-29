import { isCorrectEmail } from './correctEmail';
import { isEmptyInputImportantFields } from './emptyInputImportantFields';
import { isCorrectPhone } from './correctPhone';

export const validationModal = ({ email, name, birthDate, mobilePhone, startDate, age }) => {
  if (isEmptyInputImportantFields(name, email, birthDate, mobilePhone, startDate)) {
    return {
      isErrorInput: true,
      message: 'Fill important field',
      isValid: true,
    };
  } else if (age < 18) {
    return {
      message: "Error! User can't be under than 18 years!",
      isValid: true,
    };
  } else if (isCorrectPhone(mobilePhone)) {
    return {
      message: 'Error! Incorrect phone!',
      isValid: true,
    };
  } else if (isCorrectEmail(email)) {
    return {
      message: 'Error! Incorrect email!',
      isValid: true,
    };
  } else {
    return {
      isValid: false,
    };
  }
};
