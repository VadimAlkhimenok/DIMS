import { isEmptyEmailAndPassword } from '../validations/emptyEmailAndPassword';
import { isCorrectEmail } from '../validations/correctEmail';
import { isLengthPassword } from '../validations/lengthPassword';
import { isPasswordIncludeUpper } from '../validations/includeUpperLetterPassword';

export const validationAuthForm = (email, password) => {
  if (isEmptyEmailAndPassword(email, password)) {
    return {
      errorEmail: "Input can't be empty",
      errorPassword: "Input can't be empty",
      isErrorEmail: true,
      isErrorPassword: true,
      isValid: true
    }
  } else if (isCorrectEmail(email)) {
    return {
      errorEmail: "Invalid email",
      isErrorEmail: true,
      isValid: true
    }
  } else if (isLengthPassword(password)) {
    return {
      errorPassword: "Password must be more than 6",
      isErrorPassword: true,
      isValid: true
    }
  } else if (isPasswordIncludeUpper(password)) {
    return {
      errorPassword: "Password must have one upper letter",
      isErrorPassword: true,
      isValid: true
    }
  } else {
    return {
      isValid: false
    }
  }
}