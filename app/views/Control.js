import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Icon from "@react-native-vector-icons/feather";
import * as Haptics from "expo-haptics";

import Button from "../components/Button";
import StatusDot from "../components/StatusDot";
import { colors, fonts, radii, spacing } from "../theme";
import {
  FormatToken,
  SessionInitializing,
  UPRContext,
  SlideUp,
  SlideDown,
  PlayMedia,
} from "../model/uprkit";

const MAX_ACTIVITY_ITEMS = 6;

function RemoteTile({ label, icon, primary, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.tile,
        primary ? styles.tilePrimary : styles.tileDark,
        pressed &&
          (primary ? styles.tilePrimaryPressed : styles.tileDarkPressed),
      ]}
    >
      <Icon name={icon} size={40} color="#FFFFFF" />
      <Text style={styles.tileLabel}>{label}</Text>
    </Pressable>
  );
}

export default function ControlScreen({ navigation }) {
  const { session, holdFor, setSession, setReady } = useContext(UPRContext);
  const [activity, setActivity] = useState([]);

  function sendCommand(label, action) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    action(session, holdFor);
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setActivity((current) =>
      [{ label, timestamp, id: Date.now() }, ...current].slice(
        0,
        MAX_ACTIVITY_ITEMS,
      ),
    );
  }

  function endSession() {
    setReady(false);
    setSession(SessionInitializing);
    navigation.popToTop();
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="light" />
      <View style={styles.statusBar}>
        <View style={styles.statusLeft}>
          <StatusDot connected />
          <Text style={styles.statusText}>
            Connected · Token {FormatToken(session)}
          </Text>
        </View>
        <Button title="End session" variant="ghost" onPress={endSession} />
      </View>

      <View style={styles.activity}>
        <Text style={styles.activityHeading}>Activity</Text>
        {activity.length === 0 ? (
          <Text style={styles.activityEmpty}>
            Press a control to send a command to your computer.
          </Text>
        ) : (
          activity.map((item) => (
            <View key={item.id} style={styles.activityItem}>
              <Text style={styles.activityLabel}>{item.label}</Text>
              <Text style={styles.activityTime}>{item.timestamp}</Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.controls}>
        <Pressable
          onPress={() => sendCommand("Play / pause media", PlayMedia)}
          style={({ pressed }) => [
            styles.mediaPill,
            pressed && styles.mediaPillPressed,
          ]}
        >
          <Icon name="play" size={20} color="#FFFFFF" />
          <Text style={styles.mediaLabel}>Play / pause media</Text>
        </Pressable>

        <View style={styles.remoteRow}>
          <RemoteTile
            label="Previous"
            icon="chevron-left"
            onPress={() => sendCommand("Previous", SlideDown)}
          />
          <RemoteTile
            label="Next"
            icon="chevron-right"
            primary
            onPress={() => sendCommand("Next", SlideUp)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
    padding: spacing.lg,
  },

  statusBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  statusLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  statusText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 15,
    color: colors.onDark,
  },

  remoteRow: {
    flex: 1,
    flexDirection: "row",
    gap: spacing.md,
  },
  tile: {
    flex: 1,
    borderRadius: radii.tile,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    borderWidth: 1,
  },
  tileDark: {
    backgroundColor: colors.darkPanel,
    borderColor: "rgba(255,255,255,0.08)",
  },
  tileDarkPressed: {
    backgroundColor: colors.darkPanelActive,
  },
  tilePrimary: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  tilePrimaryPressed: {
    backgroundColor: colors.accentActive,
  },
  tileLabel: {
    fontFamily: fonts.displayBold,
    fontSize: 18,
    color: "#FFFFFF",
  },

  mediaPill: {
    height: 64,
    marginBottom: spacing.md,
    borderRadius: radii.tile,
    backgroundColor: colors.onDarkFill,
    borderWidth: 1,
    borderColor: colors.onDarkBorder,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
  },
  mediaPillPressed: {
    backgroundColor: colors.onDarkFillHover,
  },
  mediaLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 15,
    color: colors.onDark,
  },

  // Fixed 40/60 split between history and controls so the buttons never
  // move as the activity list grows.
  activity: {
    flex: 4,
    overflow: "hidden",
    marginBottom: spacing.lg,
  },
  controls: {
    flex: 6,
  },
  activityHeading: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    color: colors.onDarkFaint,
    marginBottom: spacing.sm,
  },
  activityEmpty: {
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.onDarkFaint,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: radii.row,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xs,
  },
  activityLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
    color: colors.onDark,
  },
  activityTime: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.onDarkFaint,
  },
});
