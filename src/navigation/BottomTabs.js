import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import ActivityScreen from "../screens/Main Screen/ActivityScreen";
import EarningsScreen from "../screens/Main Screen/EarningScreen";
import HomeScreen from "../screens/Main Screen/HomeScreen";
import ProfileScreen from "../screens/Main Screen/ProfileScreen";

const Tab = createBottomTabNavigator();

/* =========================
   ANIMATED TAB ITEM
========================= */
const AnimatedTabIcon = ({ focused, iconName }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(focused ? -8 : 0, {
            damping: 12,
            stiffness: 120,
          }),
        },
        {
          scale: withSpring(focused ? 1.15 : 1, {
            damping: 12,
            stiffness: 120,
          }),
        },
      ],
      opacity: withSpring(focused ? 1 : 0.7),
    };
  });

  return (
    <Animated.View style={[animatedStyle, { zIndex: 1 }]}>
      <Feather
        name={iconName}
        size={22}
        color={focused ? "#00A859" : "#94A3B8"}
      />
    </Animated.View>
  );
};

/* =========================
   CUSTOM TAB BAR
========================= */
const CustomTabBar = ({ state, navigation }) => {
  return (
    <View style={styles.wrapper}>
      <BlurView intensity={80} tint="dark" style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let iconName =
            route.name === "Home"
              ? "home"
              : route.name === "Earnings"
                ? "dollar-sign"
                : route.name === "Activity"
                  ? "clock"
                  : "user";

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={0.8}
              style={styles.tabItem}
            >
              {/* ACTIVE PILL BACKGROUND */}
              {focused && <View style={styles.activePill} />}

              <AnimatedTabIcon focused={focused} iconName={iconName} />
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </View>
  );
};

/* =========================
   NAVIGATION
========================= */
const BottomTabs = () => {
  return (
    <SafeAreaView edges={["bottom"]} style={styles.safeAreaContainer}>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Earnings" component={EarningsScreen} />
        <Tab.Screen name="Activity" component={ActivityScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default BottomTabs;

/* =========================
   STYLES
========================= */
const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  wrapper: {
    position: "absolute",
    bottom: 40, // lifted up from gesture bar
    left: 0,
    right: 0,
    alignItems: "center",
  },

  tabBar: {
    flexDirection: "row",
    width: "90%",
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(0,0,0,0.9)",
    alignItems: "center",
    justifyContent: "space-evenly",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  tabItem: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  activePill: {
    position: "absolute",
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(0,168,89,0.18)",

    top: "50%",
    left: "50%",
    marginTop: -23,
    marginLeft: -23,

    zIndex: 0,
  },
});
