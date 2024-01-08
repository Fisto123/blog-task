import React from "react";
import { Navigate } from "react-router-dom";
import { getDataFromLocalStorage } from "./localstorage";

export const PrivateRoute = ({ children }) => {
  let isUserAvailable = getDataFromLocalStorage();
  if (isUserAvailable) {
    console.log("yes");
  } else {
    console.log(isUserAvailable);
  }
  if (!isUserAvailable) {
    return <Navigate to="/register" replace />;
  }
  return children;
};
