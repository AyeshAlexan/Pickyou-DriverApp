import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiText, MotiView } from "moti";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const VerificationStatusScreen = ({ navigation }) => {
  /* =========================
     BRAND COLORS
  ========================= */
  const BRAND_GREEN = "#00A859";
  const BRAND_YELLOW = "#FDE047";
  const BRAND_RED = "#EF4444";
  const DARK_BG = "#0B1220";

  /* =========================
     TEMP STATUS
     later this comes from backend
     
     possible values:
     pending
     approved
     rejected
  ========================= */
  const [verificationStatus, setVerificationStatus] = useState("pending");

  const [loading, setLoading] = useState(true);

  /* =========================
     SIMULATE BACKEND CALL
     REMOVE THIS LATER
  ========================= */
  useEffect(() => {
    setTimeout(() => {
      // CHANGE THIS TO TEST
      // pending
      // approved
      // rejected

      setVerificationStatus("pending");

      setLoading(false);
    }, 1500);
  }, []);

  /* =========================
     AUTO NAVIGATE WHEN APPROVED
  ========================= */
  useEffect(() => {
    if (verificationStatus === "approved") {
      const timer = setTimeout(() => {
        navigation.replace("MainTabs");
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [verificationStatus]);

  /* =========================
     STATUS CONFIG
  ========================= */
  const statusConfig = {
    pending: {
      title: "Verification in Progress",
      subtitle:
        "We are reviewing your documents. This usually takes 24-48 hours.",
      icon: "clock",
      color: BRAND_YELLOW,
      buttonText: "Waiting For Approval",
      buttonDisabled: true,
    },

    approved: {
      title: "Account Approved",
      subtitle:
        "Your documents have been verified successfully. Redirecting to app...",
      icon: "check-circle",
      color: BRAND_GREEN,
      buttonText: "Opening App...",
      buttonDisabled: true,
    },

    rejected: {
      title: "Verification Rejected",
      subtitle:
        "Some of your documents were rejected. Please re-upload valid documents.",
      icon: "x-circle",
      color: BRAND_RED,
      buttonText: "Upload Again",
      buttonDisabled: false,
    },
  };

  const current = statusConfig[verificationStatus];

  /* =========================
     STATUS ITEM COMPONENT
  ========================= */
  const StatusItem = ({
    title,
    status,
    isComplete,
    isRejected,
    index,
  }) => (
    <MotiView
      from={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 300 + index * 100 }}
      style={styles.statusCard}
    >
      <View style={styles.statusLeft}>
        <View
          style={[
            styles.statusIconCircle,
            {
              borderColor: isRejected
                ? BRAND_RED
                : isComplete
                  ? BRAND_GREEN
                  : BRAND_YELLOW,
            },
          ]}
        >
          <Feather
            name={
              isRejected
                ? "x"
                : isComplete
                  ? "check"
                  : "clock"
            }
            size={16}
            color={
              isRejected
                ? BRAND_RED
                : isComplete
                  ? BRAND_GREEN
                  : BRAND_YELLOW
            }
          />
        </View>

        <Text style={styles.statusTitle}>{title}</Text>
      </View>

      <Text
        style={[
          styles.statusLabel,
          {
            color: isRejected
              ? BRAND_RED
              : isComplete
                ? "#94A3B8"
                : BRAND_YELLOW,
          },
        ]}
      >
        {status}
      </Text>
    </MotiView>
  );

  /* =========================
     LOADING SCREEN
  ========================= */
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={BRAND_GREEN} />

          <Text style={styles.loadingText}>
            Checking verification status...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.content}>
        {/* TOP ICON */}
        <View style={styles.iconContainer}>
          <MotiView
            from={{ opacity: 0.4, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1.1 }}
            transition={{
              type: "timing",
              duration: 2000,
              loop: true,
              repeatReverse: true,
            }}
            style={[
              styles.pulseRing,
              {
                backgroundColor:
                  verificationStatus === "approved"
                    ? "rgba(0,168,89,0.12)"
                    : verificationStatus === "rejected"
                      ? "rgba(239,68,68,0.12)"
                      : "rgba(253,224,71,0.12)",
              },
            ]}
          />

          <View
            style={[
              styles.mainIconCircle,
              {
                borderColor: current.color,
              },
            ]}
          >
            <Feather
              name={current.icon}
              size={40}
              color={current.color}
            />
          </View>
        </View>

        {/* TITLE */}
        <MotiText
          from={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.headerTitle}
        >
          {current.title}
        </MotiText>

        {/* SUBTITLE */}
        <Text style={styles.headerSubtitle}>
          {current.subtitle}
        </Text>

        {/* STATUS LIST */}
        <View style={styles.statusList}>
          <StatusItem
            index={0}
            title="Profile Submitted"
            status="Complete"
            isComplete={true}
          />

          <StatusItem
            index={1}
            title="Vehicle Details"
            status="Complete"
            isComplete={true}
          />

          <StatusItem
            index={2}
            title="Document Verification"
            status={
              verificationStatus === "approved"
                ? "Approved"
                : verificationStatus === "rejected"
                  ? "Rejected"
                  : "In Review"
            }
            isComplete={verificationStatus === "approved"}
            isRejected={verificationStatus === "rejected"}
          />
        </View>

        {/* INFO BOX */}
        <MotiView
          from={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 700 }}
          style={styles.nextStepBox}
        >
          <View style={styles.nextStepHeader}>
            <MaterialCommunityIcons
              name="information-outline"
              size={20}
              color="#FFF"
            />

            <Text style={styles.nextStepTitle}>
              {verificationStatus === "approved"
                ? "Welcome!"
                : verificationStatus === "rejected"
                  ? "Action Required"
                  : "Whats Next?"}
            </Text>
          </View>

          <Text style={styles.nextStepText}>
            {verificationStatus === "approved"
              ? "Your account is now active and ready to receive rides."
              : verificationStatus === "rejected"
                ? "Please upload clear and valid documents to continue."
                : "You will receive an email once your account is approved."}
          </Text>
        </MotiView>
      </View>

      {/* BUTTON */}
      <TouchableOpacity
        activeOpacity={0.9}
        disabled={current.buttonDisabled}
        style={[
          styles.actionBtn,
          {
            backgroundColor: current.color,
            opacity: current.buttonDisabled ? 0.7 : 1,
          },
        ]}
        onPress={() => {
          if (verificationStatus === "rejected") {
            navigation.navigate("Documentscreen");
          }
        }}
      >
        <Text style={styles.actionText}>
          {current.buttonText}
        </Text>
      </TouchableOpacity>

      <SafeAreaView
        edges={["bottom"]}
        style={styles.bottomSafe}
      />
    </SafeAreaView>
  );
};

export default VerificationStatusScreen;

/* =========================
   STYLES
========================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1220",
  },

  content: {
    flex: 1,
    paddingHorizontal: 25,
    alignItems: "center",
    paddingTop: 40,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#FFF",
    marginTop: 20,
    fontSize: 15,
    fontWeight: "600",
  },

  iconContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  pulseRing: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  mainIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 15,
  },

  headerSubtitle: {
    fontSize: 15,
    color: "#94A3B8",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 40,
  },

  statusList: {
    width: "100%",
    marginBottom: 30,
  },

  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1E293B",
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
  },

  statusLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  statusTitle: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "700",
  },

  statusLabel: {
    fontSize: 13,
    fontWeight: "700",
  },

  nextStepBox: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
    padding: 20,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  nextStepHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  nextStepTitle: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "800",
    marginLeft: 10,
  },

  nextStepText: {
    color: "#94A3B8",
    fontSize: 13,
    lineHeight: 20,
  },

  actionBtn: {
    height: 58,
    marginHorizontal: 25,
    marginBottom: 20,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  actionText: {
    color: "#0B1220",
    fontSize: 16,
    fontWeight: "900",
  },

  bottomSafe: {
    backgroundColor: "#000",
  },
});