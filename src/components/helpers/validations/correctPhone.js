export const isCorrectPhone = phone => {
  const regExp = /^((8|\+7)[ ]?)?(\(?\d{3}\)?[ ]?)?[\d ]{7,10}$/;
  return !regExp.test(phone);
};