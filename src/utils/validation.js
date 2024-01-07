export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateForm = (userData) => {
  const isEmailValid = validateEmail(userData?.email);
  const isAllFieldsFilled = Object.values(userData).every(
    (value) => value !== ""
  );

  // Check each property of the location object
  const isLocationFilled = Object.values(userData.location).every(
    (value) => value !== ""
  );

  return isAllFieldsFilled && isEmailValid && isLocationFilled;
};
