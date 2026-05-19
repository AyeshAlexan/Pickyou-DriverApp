import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const DocumentsScreen = ({ navigation }) => {
  const [docStatuses, setDocStatuses] = useState({
    licenseFront: "verified",
    licenseBack: "verified",
    vehicleRegistration: "pending",
    insuranceCertificate: "not_set",

    vehicleFront: "verified",
    vehicleBack: "pending",
    vehicleSide: "not_set",
  });

  const DocumentRow = ({
    title,
    subtitle,
    status,
    icon,
    onPress,
  }) => {
    const renderBadge = () => {
      switch (status) {
        case "verified":
          return (
            <View style={[styles.badge, styles.badgeVerified]}>
              <Feather
                name="check"
                size={12}
                color="#00A859"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.badgeTextVerified}>
                Verified
              </Text>
            </View>
          );

        case "pending":
          return (
            <View style={[styles.badge, styles.badgePending]}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={12}
                color="#B45309"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.badgeTextPending}>
                Pending
              </Text>
            </View>
          );

        default:
          return (
            <View style={[styles.badge, styles.badgeNotSet]}>
              <Text style={styles.badgeTextNotSet}>
                Missing
              </Text>
            </View>
          );
      }
    };

    return (
      <TouchableOpacity
        style={styles.rowCard}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.rowLeft}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={icon}
              size={24}
              color="#64748B"
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.rowTitle}>{title}</Text>
            <Text style={styles.rowSubtitle}>
              {subtitle}
            </Text>
          </View>
        </View>

        <View style={styles.rowRight}>
          {renderBadge()}

          <Feather
            name="chevron-right"
            size={18}
            color="#94A3B8"
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#00A859"
      />

      {/* HEADER */}
      <LinearGradient
        colors={["#00A859", "#007A41"]}
        style={styles.header}
      >
        <SafeAreaView>
          {/* NAVIGATION */}
          <View style={styles.navRow}>
            <TouchableOpacity
              onPress={() => navigation?.goBack()}
              style={styles.backBtn}
            >
              <Feather
                name="arrow-left"
                size={24}
                color="#FFF"
              />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>
              Documents
            </Text>

            <View style={{ width: 44 }} />
          </View>

          {/* STATS */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>
                Total
              </Text>

              <Text style={styles.statValue}>7</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statLabel}>
                Verified
              </Text>

              <Text
                style={[
                  styles.statValue,
                  { color: "#86EFAC" },
                ]}
              >
                3
              </Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statLabel}>
                Pending
              </Text>

              <Text
                style={[
                  styles.statValue,
                  { color: "#FCD34D" },
                ]}
              >
                2
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* BODY */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* OFFICIAL DOCUMENTS */}
        <Text style={styles.sectionHeading}>
          Official Documents
        </Text>

        <DocumentRow
          title="Driving License Front"
          subtitle="Front side clear image"
          status={docStatuses.licenseFront}
          icon="card-account-details-outline"
          onPress={() => {}}
        />

        <DocumentRow
          title="Driving License Back"
          subtitle="Back side clear image"
          status={docStatuses.licenseBack}
          icon="card-account-details-outline"
          onPress={() => {}}
        />

        <DocumentRow
          title="Vehicle Registration"
          subtitle="Vehicle ownership registration"
          status={docStatuses.vehicleRegistration}
          icon="file-document-outline"
          onPress={() => {}}
        />

        <DocumentRow
          title="Insurance Certificate"
          subtitle="Valid insurance certificate"
          status={docStatuses.insuranceCertificate}
          icon="shield-check-outline"
          onPress={() => {}}
        />

        {/* VEHICLE PHOTOS */}
        <Text style={styles.sectionHeading}>
          Vehicle Photos
        </Text>

        <DocumentRow
          title="Front View"
          subtitle="Front side vehicle photo"
          status={docStatuses.vehicleFront}
          icon="car-outline"
          onPress={() => {}}
        />

        <DocumentRow
          title="Back View"
          subtitle="Rear side vehicle photo"
          status={docStatuses.vehicleBack}
          icon="car-back"
          onPress={() => {}}
        />

        <DocumentRow
          title="Side View"
          subtitle="Side angle vehicle photo"
          status={docStatuses.vehicleSide}
          icon="car-side"
          onPress={() => {}}
        />

        {/* INFO BOX */}
        <View style={styles.infoBox}>
          <Feather
            name="info"
            size={18}
            color="#64748B"
          />

          <Text style={styles.infoText}>
            Document verification usually takes less
            than 24 hours. Make sure all uploaded
            images are clear and readable.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  /* HEADER */
  header: {
    paddingHorizontal: 16,
    paddingTop:
      Platform.OS === "android"
        ? (StatusBar.currentHeight || 0) + 12
        : 18,

    paddingBottom: 24,

    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  navRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,

    backgroundColor: "rgba(255,255,255,0.15)",

    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "800",
  },

  /* STATS */
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    gap: 12,
  },

  statBox: {
    flex: 1,

    backgroundColor: "rgba(255,255,255,0.14)",

    borderRadius: 18,
    paddingVertical: 15,

    alignItems: "center",
  },

  statLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 5,
  },

  statValue: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "900",
  },

  /* CONTENT */
  scrollContent: {
    padding: 18,
    paddingBottom: 40,
  },

  sectionHeading: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 14,
    marginTop: 10,
  },

  /* ROW */
  rowCard: {
    backgroundColor: "#FFF",

    borderRadius: 20,
    padding: 16,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 12,

    borderWidth: 1,
    borderColor: "#F1F5F9",

    elevation: 2,

    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 10,
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 14,

    backgroundColor: "#F1F5F9",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  textContainer: {
    flex: 1,
    paddingRight: 8,
  },

  rowTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },

  rowSubtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 3,
  },

  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  /* BADGES */
  badge: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 10,
    paddingVertical: 5,

    borderRadius: 12,
  },

  badgeVerified: {
    backgroundColor: "#F0FDF4",
  },

  badgePending: {
    backgroundColor: "#FFFBEB",
  },

  badgeNotSet: {
    backgroundColor: "#FEF2F2",
  },

  badgeTextVerified: {
    color: "#00A859",
    fontSize: 12,
    fontWeight: "700",
  },

  badgeTextPending: {
    color: "#B45309",
    fontSize: 12,
    fontWeight: "700",
  },

  badgeTextNotSet: {
    color: "#EF4444",
    fontSize: 12,
    fontWeight: "700",
  },

  /* INFO BOX */
  infoBox: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    padding: 16,
    borderRadius: 18,

    marginTop: 24,

    gap: 12,

    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  infoText: {
    flex: 1,
    fontSize: 12,
    color: "#64748B",
    lineHeight: 18,
  },
});

export default DocumentsScreen;