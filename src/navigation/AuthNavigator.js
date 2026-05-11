import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import GetStartedScreen from "../screens/GetStartedScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import OTPScreen from "../screens/OtpScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator = ({ setIsLoggedIn }) => {

  return (
    <Stack.Navigator
      initialRouteName="GetStarted"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="GetStarted"
        component={GetStartedScreen}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
      />

      <Stack.Screen name="OTP">
        {(props) => (
          <OTPScreen
            {...props}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
      </Stack.Screen>

    </Stack.Navigator>
  );
};

export default AuthNavigator;