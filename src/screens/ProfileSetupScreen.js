import { Feather } from "@expo/vector-icons";
import { MotiText, MotiView } from "moti";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileSetupScreen = ({ navigation, route }) => {

  const currentStep = route?.params?.step || 1;

  const [formData, setFormData] = useState({
    name: "",
    nic: "",
    dob: "",
    address: "",
  });

  const BRAND_GREEN = "#0B1220";
  const DARK_BG = "#00A859";

  const renderSteps = () => {
    return [1, 2, 3].map((step) => (
      <View key={step} style={styles.stepWrapper}>
        <View
          style={[
            styles.stepCircle,
            currentStep >= step
              ? { backgroundColor: "#FFF" }
              : { backgroundColor: "rgba(255,255,255,0.2)" },
          ]}
        >
          <Text
            style={[
              styles.stepText,
              currentStep >= step
                ? { color: "#000" }
                : { color: "#FFF" },
            ]}
          >
            {step}
          </Text>
        </View>

        {step < 3 && <View style={styles.stepLine} />}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={DARK_BG}
        translucent
      />

      {/* Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: DARK_BG },
        ]}
      >

        {/* Progress */}
        <View style={styles.progressRow}>
          {renderSteps()}
        </View>

        <MotiText
          from={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.headerTitle}
        >
          {currentStep === 1
            ? "Driver Profile"
            : currentStep === 2
            ? "Vehicle Details"
            : "Documents"}
        </MotiText>

        <Text style={styles.headerSubtitle}>
          {currentStep === 1
            ? "Let's set up your personal profile"
            : "Tell us about your vehicle"}
        </Text>
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* Avatar */}
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={styles.avatarContainer}
        >
          <View style={styles.avatarCircle}>
            <Feather
              name="user"
              size={45}
              color="#CBD5E1"
            />
          </View>

          <TouchableOpacity
            style={[
              styles.cameraBtn,
              { backgroundColor: BRAND_GREEN },
            ]}
          >
            <Feather
              name="camera"
              size={16}
              color="#FFF"
            />
          </TouchableOpacity>
        </MotiView>

        {/* Form */}
        <View style={styles.form}>

          {/* Name */}
          <MotiView
            from={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 100 }}
          >
            <Text style={styles.label}>
              Full Name
            </Text>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Ayesh Anthonythasan"
                placeholderTextColor="#94A3B8"
                value={formData.name}
                onChangeText={(val) =>
                  setFormData({
                    ...formData,
                    name: val,
                  })
                }
              />
            </View>
          </MotiView>

          {/* NIC */}
          <MotiView
            from={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 200 }}
          >
            <Text style={styles.label}>
              National ID / License Number
            </Text>

            <View style={styles.inputWrapper}>
              <Feather
                name="credit-card"
                size={18}
                color="#94A3B8"
                style={styles.inputIcon}
              />

              <TextInput
                style={styles.input}
                placeholder="V-XXXXXXXXX"
                placeholderTextColor="#94A3B8"
                value={formData.nic}
                onChangeText={(val) =>
                  setFormData({
                    ...formData,
                    nic: val,
                  })
                }
              />
            </View>
          </MotiView>

          {/* DOB */}
          <MotiView
            from={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 300 }}
          >
            <Text style={styles.label}>
              Date of Birth
            </Text>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="DD / MM / YYYY"
                placeholderTextColor="#94A3B8"
                value={formData.dob}
                onChangeText={(val) =>
                  setFormData({
                    ...formData,
                    dob: val,
                  })
                }
              />
            </View>
          </MotiView>

          {/* Address */}
          <MotiView
            from={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 400 }}
          >
            <Text style={styles.label}>
              Address
            </Text>

            <View
              style={[
                styles.inputWrapper,
                styles.textAreaWrapper,
              ]}
            >
              <TextInput
                style={[
                  styles.input,
                  styles.textArea,
                ]}
                placeholder="123 Main Street, City, State"
                placeholderTextColor="#94A3B8"
                multiline
                numberOfLines={3}
                value={formData.address}
                onChangeText={(val) =>
                  setFormData({
                    ...formData,
                    address: val,
                  })
                }
              />
            </View>
          </MotiView>

          {/* Button */}
          <MotiView
            from={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 500,
              type: "timing",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.continueBtn,
                { backgroundColor: BRAND_GREEN },
              ]}
            >
              <Text style={styles.continueText}>
                Continue
              </Text>
            </TouchableOpacity>
          </MotiView>

        </View>
      </ScrollView>

      {/* Bottom Safe Area */}
      <SafeAreaView
        edges={["bottom"]}
        style={styles.bottomSafeArea}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  header: {
    paddingTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight + 25
        : 70,

    paddingHorizontal: 25,
    paddingBottom: 28,

    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    marginBottom: 24,
  },

  stepWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  stepCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,

    justifyContent: "center",
    alignItems: "center",
  },

  stepText: {
    fontWeight: "800",
    fontSize: 14,
  },

  stepLine: {
    width: 42,
    height: 2,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginHorizontal: 8,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFF",
    letterSpacing: -0.5,
  },

  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    marginTop: 6,
  },

  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 28,
    paddingBottom: 40,
  },

  avatarContainer: {
    alignSelf: "center",
    marginBottom: 32,
  },

  avatarCircle: {
    width: 115,
    height: 115,
    borderRadius: 57.5,

    backgroundColor: "#F8FAFC",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1.5,
    borderColor: "#E2E8F0",
  },

  cameraBtn: {
    position: "absolute",
    bottom: 4,
    right: 4,

    width: 38,
    height: 38,
    borderRadius: 19,

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 3,
    borderColor: "#FFF",

    elevation: 3,
  },

  form: {
    width: "100%",
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",

    marginBottom: 10,
    marginLeft: 4,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#F1F5F9",

    borderRadius: 18,

    paddingHorizontal: 18,

    height: 60,

    marginBottom: 22,
  },

  inputIcon: {
    marginRight: 12,
  },

  input: {
    flex: 1,
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "600",
  },

  textAreaWrapper: {
    height: 110,
    alignItems: "flex-start",
    paddingTop: 16,
  },

  textArea: {
    textAlignVertical: "top",
  },

  continueBtn: {
    height: 64,
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    marginTop: 10,

    shadowColor: "#00A859",
    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.3,
    shadowRadius: 12,

    elevation: 8,
  },

  continueText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  bottomSafeArea: {
    backgroundColor: "#000",
  },
});

export default ProfileSetupScreen;