import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView, MotiText } from "moti";

const AppBuildingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0F172A"
      />

      <View style={styles.content}>
        <MotiView
          from={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            delay: 300,
          }}
          style={styles.iconCircle}
        >
          <MaterialCommunityIcons
            name="tools"
            size={70}
            color="#00A859"
          />
        </MotiView>

        <MotiText
          from={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 500 }}
          style={styles.title}
        >
          App Under Development
        </MotiText>

        <MotiText
          from={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 700 }}
          style={styles.subtitle}
        >
          We re currently building the full driver experience.
          New features and ride services will be available soon.
        </MotiText>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Coming Soon
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AppBuildingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  iconCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(0,168,89,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },

  title: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 20,
  },

  subtitle: {
    color: "#94A3B8",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 40,
  },

  button: {
    backgroundColor: "#00A859",
    paddingHorizontal: 40,
    height: 55,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "800",
  },
});