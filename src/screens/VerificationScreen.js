import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiText, MotiView } from "moti";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const VerificationScreen = ({ navigation }) => {
  // PickU Brand Colors
  const BRAND_GREEN = "#00A859";
  const BRAND_YELLOW = "#FDE047";
  const DARK_BG = "#0B1220";
  const CARD_BG = "#1E293B";

  const StatusItem = ({ icon, title, status, isComplete, index }) => (
    <MotiView
      from={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 400 + index * 100 }}
      style={styles.statusCard}
    >
      <View style={styles.statusLeft}>
        <View
          style={[
            styles.statusIconCircle,
            { borderColor: isComplete ? BRAND_GREEN : BRAND_YELLOW },
          ]}
        >
          <Feather
            name={isComplete ? "check" : "clock"}
            size={16}
            color={isComplete ? BRAND_GREEN : BRAND_YELLOW}
          />
        </View>
        <Text style={styles.statusTitle}>{title}</Text>
      </View>
      <Text
        style={[
          styles.statusLabel,
          { color: isComplete ? "#94A3B8" : BRAND_YELLOW },
        ]}
      >
        {status}
      </Text>
    </MotiView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.content}>
        {/* Slowly Blinking Top Icon */}
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
            style={styles.pulseRing}
          />
          <View style={styles.mainIconCircle}>
            <Feather name="clock" size={40} color={BRAND_YELLOW} />
          </View>
        </View>

        <MotiText
          from={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.headerTitle}
        >
          Verification in Progress
        </MotiText>

        <Text style={styles.headerSubtitle}>
          We re reviewing your documents. This usually takes 24-48 hours. We ll
          notify you once approved.
        </Text>

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
            status="In Review"
            isComplete={false}
          />
        </View>

        <MotiView
          from={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 800 }}
          style={styles.nextStepBox}
        >
          <View style={styles.nextStepHeader}>
            <MaterialCommunityIcons
              name="file-document-outline"
              size={20}
              color="#FFF"
            />
            <Text style={styles.nextStepTitle}>Whats Next?</Text>
          </View>
          <Text style={styles.nextStepText}>
            You ll receive an email once your account is approved. In the
            meantime, you can explore the app!
          </Text>
        </MotiView>
      </View>

      <TouchableOpacity
        style={styles.exploreBtn}
        onPress={() => navigation.replace("MainTabs")}
      >
        <Text style={styles.exploreText}>Explore the App</Text>
      </TouchableOpacity>
      <SafeAreaView edges={["bottom"]} style={styles.bottomSafe} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1220", // DARK_BG
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    alignItems: "center",
    paddingTop: 40,
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
    backgroundColor: "rgba(253, 224, 71, 0.1)",
  },
  mainIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(253, 224, 71, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(253, 224, 71, 0.3)",
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
    fontWeight: "600",
  },
  nextStepBox: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
    padding: 20,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
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
  exploreBtn: {
    backgroundColor: "#00A859", // BRAND_GREEN
    height: 58,
    marginHorizontal: 25,
    marginBottom: 20,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  exploreText: {
    color: "#0B1220",
    fontSize: 16,
    fontWeight: "900",
  },
  bottomSafe: { backgroundColor: "#000" },
});

export default VerificationScreen;
