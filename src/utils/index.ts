/* eslint-disable  @typescript-eslint/no-explicit-any */
export const isEmpty = (obj: Record<string, any>): boolean => {
  for (let i in obj) return false;
  return true;
};

/** Input Validations */
export const inputValidator = (input: string, name: string) => {
  if (!input) {
    return `${name} is required`;
  }
  return '';
};
export const emailValidator = (email: string) => {
  if (!email) {
    return 'Email is required';
  } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
    return 'Incorrect email format';
  }
  return '';
};

export const passwordValidator = (password: string) => {
  if (!password) {
    return 'Password is required';
  } else if (password.length < 8) {
    return 'Password must have a minimum 8 characters';
  }
  return '';
};

export const confirmPasswordValidator = (confirmPassword: string, password: string) => {
  if (!confirmPassword) {
    return 'Confirm password is required';
  } else if (confirmPassword.length < 8) {
    return 'Confirm password must have a minimum 8 characters';
  } else if (confirmPassword !== password) {
    return 'Passwords do not match';
  }
  return '';
};
