
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};


export const validatePassword = (password) => {
  // At least 6 chars, 1 letter, 1 number
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*!]{6,}$/;
  return regex.test(password);
};


export const validateName = (name) => {
  return typeof name === "string" && name.trim().length >= 3;
};


export const validateObjectId = (id) => {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  return objectIdRegex.test(id);
};