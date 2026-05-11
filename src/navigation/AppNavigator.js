import React from "react";

import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

const AppNavigator = ({
  isLoggedIn,
  setIsLoggedIn,
}) => {

  return isLoggedIn ? (
    <MainNavigator />
  ) : (
    <AuthNavigator
      setIsLoggedIn={setIsLoggedIn}
    />
  );
};

export default AppNavigator;