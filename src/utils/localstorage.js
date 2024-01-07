export const setLocalStorage = (userData) => {
  localStorage.setItem("user", JSON.stringify(userData));
};

export const getDataFromLocalStorage = () => {
  const storedUserData = JSON.parse(localStorage.getItem("user"));
  if (storedUserData) {
    return storedUserData;
  }
};

export const getUserId = () => {
  let id = getDataFromLocalStorage()?.id;
  return id;
};
