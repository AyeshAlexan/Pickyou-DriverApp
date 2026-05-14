import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DocumentVefityscreen from "../screens/DocumnetVefityScreen";
import ProfileSetScreen from "../screens/ProfileSetupScreen";
import VehicleDetailsScreen from "../screens/VehicleDeatilsScreem";
import VerificationScreen from "../screens/VerificationScreen";
import NotificationScreen from "../screens/NotificationScreen";
import TripDetailsScreen from "../screens/Main Screen/TripDetailsScreen";
import EditProfileScreen from "../screens/Main Screen/EditProfileScreen";
import EditVehicleScreen from "../screens//Main Screen/EditVehicleScreem";

import BottomTabs from "./BottomTabs";

const Stack = createNativeStackNavigator();

const MainNavigator = ({ isNewUser = false, setIsNewUser }) => {
  return (
    <Stack.Navigator
      initialRouteName={isNewUser ? "ProfileSet" : "MainTabs"}
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Setup Flow */}
      <Stack.Screen name="ProfileSet" component={ProfileSetScreen} />
      <Stack.Screen name="VehicleDetails" component={VehicleDetailsScreen} />
      <Stack.Screen name="Documentscreen" component={DocumentVefityscreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />

      {/* Main App */}
      <Stack.Screen name="MainTabs" component={BottomTabs} />

      {/* App Sub-Pages */}
      <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          animation: "slide_from_right", // Smooth transition
        }}
      />
      <Stack.Screen
        name="TripDetails"
        component={TripDetailsScreen}
        options={{
          animation: "slide_from_right", // Smooth transition
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          animation: "slide_from_right", // Smooth transition
        }}
      />
      <Stack.Screen
        name="EditVehicle"
        component={EditVehicleScreen}
        options={{
          animation: "slide_from_right", // Smooth transition
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
