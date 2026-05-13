import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  return (
    <NavigationContainer>
      <AppNavigator
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        isNewUser={isNewUser}
        setIsNewUser={setIsNewUser}
      />
    </NavigationContainer>
  );
}
