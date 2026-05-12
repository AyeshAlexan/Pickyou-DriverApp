import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileSetScreen from "../screens/ProfileSetupScreen";
import VehicleDetailsScreen from "../screens/VehicleDeatilsScreem";
import DocumentVefityscreen from "../screens/DocumnetVefityScreen";
import VerificationScreen from "../screens/VerificationScreen";
import BottomTabs from "./BottomTabs";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="ProfileSet"
        component={ProfileSetScreen}
      />

      <Stack.Screen
        name="VehicleDetails"
        component={VehicleDetailsScreen}
      />

      <Stack.Screen
        name="Documentscreen"
        component={DocumentVefityscreen}
      />

      <Stack.Screen
        name="Verification"
        component={VerificationScreen}
      />

    </Stack.Navigator>
  );
};

export default MainNavigator;