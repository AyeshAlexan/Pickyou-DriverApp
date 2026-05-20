import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Dimensions,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView, MotiText } from "moti";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Customs imported from your friend's architecture
import KeyboardAwareWrapper from "../../components/KeyboardAwareWrapper";
import api from "../../services/api";

const { width, height } = Dimensions.get("window");

const RegisterScreen = ({ navigation }) => {
  // Form State Configurations
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Interactive UI States
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [agree, setAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const BRAND_GREEN = "#00A859";

  // Backend Registration Pipeline Logic
  const handleRegister = async () => {
    if (!agree) {
      Alert.alert("Terms Required", "Please agree to the Terms of Service to continue.");
      return;
    }
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match. Please verify.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await api.post("/register", {
        first_name: firstName,
        last_name: lastName || firstName,
        email,
        phone,
        password,
        password_confirmation: confirmPassword,
        role: "driver"
      });

      if (response.data?.data?.token) {
        await AsyncStorage.setItem("userToken", response.data.data.token);
        navigation?.navigate("OTP", { isRegistration: true, phone: phone });
      }
    } catch (error) {
      console.log("Registration error:", error.response?.data || error.message);
      const resp = error.response?.data;
      const msg = resp?.message || "An error occurred during registration.";

      // Check if phone or user instance is already present in the database setup
      const phoneError = resp?.errors?.phone || /phone|already/i.test(msg);
      if (phoneError) {
        Alert.alert(
          "Number Already Registered",
          "Your mobile number is already registered. Please log in to continue.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Login", onPress: () => navigation.navigate("Login", { phone }) },
          ]
        );
        return;
      }

      Alert.alert("Registration Failed", msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.mainBackground}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* TOP BACKGROUND GEOMETRIC GRAPHIC BLOB */}
      <MotiView
        from={{ opacity: 0, scale: 0.5, rotate: "0deg" }}
        animate={{ opacity: 1, scale: 1, rotate: "-15deg" }}
        transition={{ type: "timing", duration: 2000 }}
        style={[
          styles.graphicBlob,
          {
            top: -100,
            left: -50,
            backgroundColor: "rgba(0, 168, 89, 0.12)",
            width: 350,
            height: 350,
          },
        ]}
      />

      {/* LOWER BACKGROUND GRAPHIC BLOB */}
      <MotiView
        from={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "timing", duration: 1500, delay: 500 }}
        style={[
          styles.graphicBlob,
          {
            bottom: -50,
            right: -80,
            width: 250,
            height: 250,
            backgroundColor: "rgba(203, 213, 225, 0.35)",
          },
        ]}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <KeyboardAwareWrapper showsVerticalScrollIndicator={false} bounces={false}>
          
          {/* HEADER BACK UTILITY ACTION */}
          <MotiView
            from={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 200 }}
            style={styles.header}
          >
            <TouchableOpacity
              onPress={() => navigation?.goBack()}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <Feather name="chevron-left" size={24} color="#1E293B" />
            </TouchableOpacity>
          </MotiView>

          {/* APPLICATION IDENTITY REGISTRATION INTERFACE */}
          <View style={styles.contentContainer}>
            <View style={styles.topSection}>
              
              {/* TOP CIRCULAR SYSTEM LOGO ICON */}
              <MotiView
                from={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", delay: 300 }}
                style={styles.iconCircle}
              >
                <MaterialCommunityIcons
                  name="account-plus"
                  size={34}
                  color={BRAND_GREEN}
                />
              </MotiView>

              {/* WELCOME HEADINGS TEXT EDIT */}
              <MotiText
                from={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 400 }}
                style={styles.title}
              >
                Create Account
              </MotiText>

              <MotiText
                from={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 500 }}
                style={styles.subtitle}
              >
                Start your journey as a driver
              </MotiText>

              {/* INPUT FIELDS STRUCTURAL ELEMENT FORM */}
              <View style={styles.form}>
                
                {/* FIRST NAME INPUT */}
                <MotiView
                  from={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 600 }}
                  style={styles.inputWrapper}
                >
                  <Feather
                    name="user"
                    size={18}
                    color="#94A3B8"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor="#94A3B8"
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                </MotiView>

                {/* LAST NAME INPUT */}
                <MotiView
                  from={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 650 }}
                  style={styles.inputWrapper}
                >
                  <Feather
                    name="user"
                    size={18}
                    color="#94A3B8"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="#94A3B8"
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </MotiView>

                {/* EMAIL ADDRESS INPUT */}
                <MotiView
                  from={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 700 }}
                  style={styles.inputWrapper}
                >
                  <Feather
                    name="mail"
                    size={18}
                    color="#94A3B8"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    placeholderTextColor="#94A3B8"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </MotiView>

                {/* PHONE NUMBER FIELD SYSTEM */}
                <MotiView
                  from={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 800 }}
                  style={styles.inputWrapper}
                >
                  <Feather
                    name="phone"
                    size={18}
                    color="#94A3B8"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    placeholderTextColor="#94A3B8"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                  />
                </MotiView>

                {/* SECURE PASSWORD CREATION FIELD */}
                <MotiView
                  from={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 900 }}
                  style={styles.inputWrapper}
                >
                  <Feather
                    name="lock"
                    size={18}
                    color="#94A3B8"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#94A3B8"
                    value={password}
                    secureTextEntry={!showPassword}
                    onChangeText={setPassword}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Feather
                      name={showPassword ? "eye" : "eye-off"}
                      size={18}
                      color={BRAND_GREEN}
                    />
                  </TouchableOpacity>
                </MotiView>

                {/* CONDITIONAL CONFIRM PASSWORD SUB-INPUT EXPANSION */}
                {(passwordFocused || password.length > 0) && (
                  <MotiView
                    from={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "timing", duration: 300 }}
                    style={styles.inputWrapper}
                  >
                    <Feather
                      name="lock"
                      size={18}
                      color="#94A3B8"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Confirm Password"
                      placeholderTextColor="#94A3B8"
                      value={confirmPassword}
                      secureTextEntry={!showPassword}
                      onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Feather
                        name={showPassword ? "eye" : "eye-off"}
                        size={18}
                        color={BRAND_GREEN}
                      />
                    </TouchableOpacity>
                  </MotiView>
                )}

                {/* POLICY AND TERMS VERIFICATION CHECKBOX LAYOUT */}
                <MotiView
                  from={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1000 }}
                  style={styles.termsRow}
                >
                  <TouchableOpacity
                    onPress={() => setAgree(!agree)}
                    style={[
                      styles.checkbox,
                      agree && {
                        backgroundColor: BRAND_GREEN,
                        borderColor: BRAND_GREEN,
                      },
                    ]}
                  >
                    {agree && (
                      <Feather name="check" size={13} color="#FFF" />
                    )}
                  </TouchableOpacity>

                  <Text style={styles.termsText}>
                    I agree to the{" "}
                    <Text style={styles.linkText}>Terms of Service</Text> and{" "}
                    <Text style={styles.linkText}>Privacy Policy</Text>
                  </Text>
                </MotiView>

                {/* PRIMARY ACTION REGISTRATION EMISSION BUTTON */}
                <MotiView
                  from={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1100, type: "spring" }}
                >
                  <TouchableOpacity
                    style={styles.continueBtn}
                    onPress={handleRegister}
                    activeOpacity={0.9}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator color="#FFF" />
                    ) : (
                      <Text style={styles.continueBtnText}>Continue</Text>
                    )}
                  </TouchableOpacity>
                </MotiView>

                {/* REDIRECT ANCHOR LINK SWITCH TO SIGN IN SCREEN */}
                <MotiView
                  from={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1200 }}
                  style={styles.footer}
                >
                  <Text style={styles.footerText}>Already have an account?</Text>
                  <TouchableOpacity onPress={() => navigation?.navigate("Login")}>
                    <Text style={styles.signInText}> Sign In</Text>
                  </TouchableOpacity>
                </MotiView>

              </View>
            </View>

            {/* ARTWORK VECTOR GRAPHIC LAYOUT PLACEMENT */}
            <MotiView
              from={{ opacity: 0, translateY: 40 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                delay: 1400,
                duration: 900,
                type: "timing",
              }}
              style={styles.carImageWrapper}
            >
              <Image
                source={require("../../assets/three.png")}
                style={styles.carImage}
                resizeMode="contain"
              />
            </MotiView>

          </View>
        </KeyboardAwareWrapper>
      </KeyboardAvoidingView>

      {/* SYSTEM DEVICE LOWER BAR VIEW FILL */}
      <SafeAreaView
        edges={["bottom"]}
        style={styles.bottomSafeArea}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainBackground: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  graphicBlob: {
    position: "absolute",
    borderRadius: 160,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 5 : 45,
    marginBottom: 5,
    zIndex: 10,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    alignItems: "center",
  },
  topSection: {
    width: "100%",
    alignItems: "center",
  },
  iconCircle: {
    width: 74,
    height: 74,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(0, 168, 89, 0.1)",
    shadowColor: "#00A859",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 20,
  },
  form: {
    width: "100%",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 16,
    paddingHorizontal: 15,
    height: 54,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "600",
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 18,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  termsText: {
    flex: 1,
    color: "#64748B",
    fontSize: 12,
    lineHeight: 18,
  },
  linkText: {
    color: "#00A859",
    fontWeight: "700",
  },
  continueBtn: {
    backgroundColor: "#00A859",
    height: 54,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#00A859",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  continueBtnText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 18,
    marginBottom: 0,
  },
  footerText: {
    color: "#64748B",
    fontSize: 13,
  },
  signInText: {
    color: "#00A859",
    fontWeight: "800",
    fontSize: 13,
  },
  carImageWrapper: {
    width: width,
    alignItems: "center",
    marginTop: 5,
  },
  carImage: {
    width: width * 1.08,
    height: height * 0.22,
  },
  bottomSafeArea: {
    backgroundColor: "#000000",
  },
});

export default RegisterScreen;