
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

const AppNavigator = ({
  isLoggedIn,
  setIsLoggedIn,
  isNewUser,
  setIsNewUser,
}) => {
  return isLoggedIn ? (
    <MainNavigator
      isNewUser={isNewUser}
      setIsNewUser={setIsNewUser}
      setIsLoggedIn={setIsLoggedIn}
    />
  ) : (
    <AuthNavigator setIsLoggedIn={setIsLoggedIn} setIsNewUser={setIsNewUser} />
  );
};

export default AppNavigator;
