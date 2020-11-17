export const calculateAge = (birthDate) => {
  const birth = new Date(birthDate);
  const ageDate = new Date(Date.now() - birth.getTime());
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
