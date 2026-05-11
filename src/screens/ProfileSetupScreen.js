import { Feather } from "@expo/vector-icons";
import { MotiText, MotiView } from "moti";
import React, { useState, useEffect } from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileSetupScreen = ({ navigation, route }) => {
  const currentStep = route?.params?.step || 1;

  const [formData, setFormData] = useState({
    name: "",
    nic: "",
    dob: "",
    address: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const BRAND_GREEN = "#0B1220";
  const DARK_BG = "#00A859";

  // Load data from local storage on mount
  useEffect(() => {
    loadFormData();
  }, []);

  const loadFormData = async () => {
    try {
      const savedData = await AsyncStorage.getItem("profileFormData");
      if (savedData) {
        setFormData(JSON.parse(savedData));
      }
    } catch (error) {
      console.log("Error loading form data:", error);
    }
  };

  const saveFormData = async (updatedData) => {
    try {
      await AsyncStorage.setItem(
        "profileFormData",
        JSON.stringify(updatedData),
      );
    } catch (error) {
      console.log("Error saving form data:", error);
    }
  };

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    saveFormData(updatedData);
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const formattedDate = formatDate(date);
    handleInputChange("dob", formattedDate);
    setShowDatePicker(false);
  };

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
              currentStep >= step ? { color: "#000" } : { color: "#FFF" },
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
      <View style={[styles.header, { backgroundColor: DARK_BG }]}>
        {/* Progress */}
        <View style={styles.progressRow}>{renderSteps()}</View>

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
            <Feather name="user" size={45} color="#CBD5E1" />
          </View>

          <TouchableOpacity
            style={[styles.cameraBtn, { backgroundColor: BRAND_GREEN }]}
          >
            <Feather name="camera" size={16} color="#FFF" />
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
            <Text style={styles.label}>Full Name</Text>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                placeholderTextColor="#94A3B8"
                value={formData.name}
                onChangeText={(val) => handleInputChange("name", val)}
              />
            </View>
          </MotiView>

          {/* NIC */}
          <MotiView
            from={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 200 }}
          >
            <Text style={styles.label}>National ID / License Number</Text>

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
                onChangeText={(val) => handleInputChange("nic", val)}
              />
            </View>
          </MotiView>

          {/* DOB */}
          <MotiView
            from={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 300 }}
          >
            <Text style={styles.label}>Date of Birth</Text>

            <TouchableOpacity
              style={styles.inputWrapper}
              onPress={() => setShowDatePicker(true)}
            >
              <Feather
                name="calendar"
                size={18}
                color="#94A3B8"
                style={styles.inputIcon}
              />
              <Text
                style={[
                  styles.input,
                  {
                    color: formData.dob ? "#0F172A" : "#94A3B8",
                    paddingVertical: 0,
                  },
                ]}
              >
                {formData.dob || "DD / MM / YYYY"}
              </Text>
            </TouchableOpacity>
          </MotiView>

          {/* Address */}
          <MotiView
            from={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 400 }}
          >
            <Text style={styles.label}>Address</Text>

            <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="123 Main Street, City, State"
                placeholderTextColor="#94A3B8"
                multiline
                numberOfLines={3}
                value={formData.address}
                onChangeText={(val) => handleInputChange("address", val)}
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
              style={[styles.continueBtn, { backgroundColor: BRAND_GREEN }]}
              onPress={() => navigation.navigate("VehicleDetails")}
            >
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          </MotiView>
        </View>
      </ScrollView>

      {/* Bottom Safe Area */}
      <SafeAreaView edges={["bottom"]} style={styles.bottomSafeArea} />

      {/* Date Picker Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={showDatePicker}
        onRequestClose={() => setShowDatePicker(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowDatePicker(false)}>
          <View style={styles.datePickerOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.datePickerContainer}>
                <View style={styles.datePickerHeader}>
                  <Text style={styles.datePickerTitle}>
                    Select Date of Birth
                  </Text>
                  <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                    <Feather name="x" size={24} color="#0F172A" />
                  </TouchableOpacity>
                </View>

                <View style={styles.datePickerContent}>
                  <View style={styles.dateInputGroup}>
                    <Text style={styles.dateLabel}>Day</Text>
                    <View style={styles.dateNumberInput}>
                      <TextInput
                        style={styles.dateInput}
                        placeholder="DD"
                        placeholderTextColor="#94A3B8"
                        value={String(selectedDate.getDate()).padStart(2, "0")}
                        onChangeText={(val) => {
                          if (val && !isNaN(val) && val <= 31) {
                            const newDate = new Date(selectedDate);
                            newDate.setDate(parseInt(val));
                            setSelectedDate(newDate);
                          }
                        }}
                        maxLength={2}
                        keyboardType="number-pad"
                      />
                    </View>
                  </View>

                  <View style={styles.dateInputGroup}>
                    <Text style={styles.dateLabel}>Month</Text>
                    <View style={styles.dateNumberInput}>
                      <TextInput
                        style={styles.dateInput}
                        placeholder="MM"
                        placeholderTextColor="#94A3B8"
                        value={String(selectedDate.getMonth() + 1).padStart(
                          2,
                          "0",
                        )}
                        onChangeText={(val) => {
                          if (val && !isNaN(val) && val <= 12) {
                            const newDate = new Date(selectedDate);
                            newDate.setMonth(parseInt(val) - 1);
                            setSelectedDate(newDate);
                          }
                        }}
                        maxLength={2}
                        keyboardType="number-pad"
                      />
                    </View>
                  </View>

                  <View style={styles.dateInputGroup}>
                    <Text style={styles.dateLabel}>Year</Text>
                    <View style={styles.dateNumberInput}>
                      <TextInput
                        style={styles.dateInput}
                        placeholder="YYYY"
                        placeholderTextColor="#94A3B8"
                        value={String(selectedDate.getFullYear())}
                        onChangeText={(val) => {
                          if (val && !isNaN(val) && val.length === 4) {
                            const newDate = new Date(selectedDate);
                            newDate.setFullYear(parseInt(val));
                            setSelectedDate(newDate);
                          }
                        }}
                        maxLength={4}
                        keyboardType="number-pad"
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.datePickerActions}>
                  <TouchableOpacity
                    style={styles.datePickerBtn}
                    onPress={() => setShowDatePicker(false)}
                  >
                    <Text style={styles.datePickerBtnText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.datePickerBtn,
                      { backgroundColor: BRAND_GREEN },
                    ]}
                    onPress={() => handleDateSelect(selectedDate)}
                  >
                    <Text style={[styles.datePickerBtnText, { color: "#FFF" }]}>
                      Done
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  header: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 25 : 70,

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

  // Date Picker Styles
  datePickerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },

  datePickerContainer: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },

  datePickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  datePickerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },

  datePickerContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },

  dateInputGroup: {
    alignItems: "center",
    flex: 1,
  },

  dateLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    marginBottom: 8,
  },

  dateNumberInput: {
    width: "90%",
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },

  dateInput: {
    width: "100%",
    height: 50,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    color: "#0F172A",
  },

  datePickerActions: {
    flexDirection: "row",
    gap: 12,
  },

  datePickerBtn: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
  },

  datePickerBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
});

export default ProfileSetupScreen;
