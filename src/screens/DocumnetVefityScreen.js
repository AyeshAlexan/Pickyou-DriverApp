import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { MotiText, MotiView } from "moti";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DocumentVerifyScreen = ({ navigation }) => {
  const [uploads, setUploads] = useState({
    license: false,
    registration: false,
    insurance: false,
    front: false,
    back: false,
    interior: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // PickU Brand Colors
  const BRAND_GREEN = "#00A859";
  const DARK_BG = "#0B1220";

  const handleUpload = async (docKey) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"],
      });

      if (
        result.type === "success" ||
        (result.assets && result.assets.length > 0)
      ) {
        setUploads((prev) => ({ ...prev, [docKey]: true }));
      }
    } catch (err) {
      console.log("Upload error:", err);
    }
  };

  const allDocsUploaded = Object.values(uploads).every(
    (status) => status === true,
  );

  const handleSubmit = () => {
    if (allDocsUploaded) {
      setIsSubmitted(true);
    }
  };

  const renderSteps = () => {
    return [1, 2, 3].map((step) => (
      <View key={step} style={styles.stepWrapper}>
        <View style={[styles.stepCircle, step <= 2 && styles.stepCompleted]}>
          {step <= 2 ? (
            <Feather name="check" size={14} color={BRAND_GREEN} />
          ) : (
            <Text style={[styles.stepText, { color: "rgba(255,255,255,0.6)" }]}>
              {step}
            </Text>
          )}
        </View>
        {step < 3 && (
          <View
            style={[
              styles.stepLine,
              step < 2
                ? { backgroundColor: "#FFF" }
                : { backgroundColor: "rgba(255,255,255,0.2)" },
            ]}
          />
        )}
      </View>
    ));
  };

  const DocumentCard = ({ title, subtitle, icon, docKey, index }) => (
    <MotiView
      from={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 100 + index * 50 }}
      style={styles.docCard}
    >
      <View style={styles.docInfo}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color={uploads[docKey] ? BRAND_GREEN : "#94A3B8"}
          />
        </View>
        <View style={styles.textColumn}>
          <Text style={styles.docTitle}>{title}</Text>
          <Text style={styles.docSubtitle}>{subtitle}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.uploadBtn,
          uploads[docKey] && {
            backgroundColor: "rgba(0, 168, 89, 0.1)",
            borderColor: BRAND_GREEN,
          },
        ]}
        onPress={() => handleUpload(docKey)}
      >
        <Feather
          name={uploads[docKey] ? "check" : "upload"}
          size={16}
          color={uploads[docKey] ? BRAND_GREEN : "#FFF"}
        />
        <Text
          style={[
            styles.uploadBtnText,
            uploads[docKey] && { color: BRAND_GREEN },
          ]}
        >
          {uploads[docKey] ? "Done" : "Upload"}
        </Text>
      </TouchableOpacity>
    </MotiView>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* HEADER MATCHING IMAGE 1 */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButtonCircle}
          >
            <Feather name="arrow-left" size={22} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.progressRow}>{renderSteps()}</View>
          <View style={{ width: 40 }} /> {/* Spacer for centering steps */}
        </View>

        <MotiText
          from={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.headerTitle}
        >
          Verify Details
        </MotiText>
        <Text style={styles.headerSubtitle}>
          Upload documents to verify your account
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionLabel}>Official Documents</Text>

        <DocumentCard
          index={0}
          title="Driving License"
          subtitle="Front & back view (JPEG, PNG)"
          icon="card-account-details-outline"
          docKey="license"
        />
        <DocumentCard
          index={1}
          title="Vehicle Registration"
          subtitle="Latest logbook copy (PDF/JPEG)"
          icon="car-info"
          docKey="registration"
        />
        <DocumentCard
          index={2}
          title="Insurance Certificate"
          subtitle="Valid up-to-date policy (PDF/JPEG)"
          icon="file-certificate-outline"
          docKey="insurance"
        />

        <Text style={[styles.sectionLabel, { marginTop: 25 }]}>
          Vehicle Photos
        </Text>

        <DocumentCard
          index={3}
          title="Front View"
          subtitle="Clear view including plate"
          icon="car-convertible"
          docKey="front"
        />
        <DocumentCard
          index={4}
          title="Back View"
          subtitle="Including plate and model"
          icon="car-back"
          docKey="back"
        />
        <DocumentCard
          index={5}
          title="Interior View"
          subtitle="Dashboard and seating condition"
          icon="car-seat"
          docKey="interior"
        />

        <TouchableOpacity
          style={[
            styles.submitBtn,
            allDocsUploaded && !isSubmitted && { backgroundColor: DARK_BG },
            isSubmitted && { backgroundColor: "#F1F5F9" },
          ]}
          onPress={() => navigation.navigate("Verification")}
          disabled={!allDocsUploaded || isSubmitted}
        >
          {isSubmitted ? (
            <View style={styles.pendingRow}>
              <Feather
                name="clock"
                size={20}
                color="#64748B"
                style={{ marginRight: 10 }}
              />
              <Text style={[styles.submitText, { color: "#64748B" }]}>
                Pending Review
              </Text>
            </View>
          ) : (
            <Text
              style={[
                styles.submitText,
                !allDocsUploaded && { color: "rgba(255,255,255,0.3)" },
              ]}
            >
              Submit for Review
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
      <SafeAreaView edges={["bottom"]} style={styles.bottomSafe} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    backgroundColor: "#00A859", // BRAND_GREEN
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 60,
    paddingHorizontal: 25,
    paddingBottom: 35,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepWrapper: { flexDirection: "row", alignItems: "center" },
  stepCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  stepCompleted: { backgroundColor: "#FFF" },
  stepText: { fontSize: 11, fontWeight: "800" },
  stepLine: { width: 30, height: 2, marginHorizontal: 5, borderRadius: 1 },
  headerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFF",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    marginTop: 4,
  },
  scrollContent: { paddingHorizontal: 25, paddingBottom: 40, paddingTop: 25 },
  sectionLabel: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 15,
  },
  docCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8FAFC",
    borderRadius: 20,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  docInfo: { flexDirection: "row", alignItems: "center", flex: 1 },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textColumn: { flex: 1 },
  docTitle: { fontSize: 14, fontWeight: "700", color: "#0F172A" },
  docSubtitle: { fontSize: 11, color: "#94A3B8", marginTop: 2 },
  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0F172A",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  uploadBtnText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "800",
    marginLeft: 6,
  },
  submitBtn: {
    backgroundColor: "#CBD5E1",
    height: 58,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  pendingRow: { flexDirection: "row", alignItems: "center" },
  submitText: { color: "#FFF", fontSize: 16, fontWeight: "900" },
  bottomSafe: { backgroundColor: "#000" },
});

export default DocumentVerifyScreen;
