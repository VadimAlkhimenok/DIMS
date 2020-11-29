export const calculateAge = (birthDate) => {
  const birth = new Date(birthDate);
  const ageDate = new Date(Date.now() - birth.getTime());
  return new Date(Math.abs(ageDate.getUTCFullYear() - 1970));
};
