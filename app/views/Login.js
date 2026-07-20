import { useContext, useEffect, useRef } from "react";
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

import Button from "../components/Button";
import TokenDigits from "../components/TokenDigits";
import StatusDot from "../components/StatusDot";
import { colors, fonts, radii, spacing } from "../theme";
import {
  AcquireSession,
  SessionInitializing,
  UPRContext,
  TempSession,
} from "../model/uprkit";

// Below this window width the pairing card stacks under the hero copy;
// at or above it (landscape phones, tablets) the two sit side by side.
const WIDE_LAYOUT_MIN_WIDTH = 800;

export default function Login({ navigation }) {
  const { session, setSession, setHoldFor, ready, setReady } =
    useContext(UPRContext);
  const isFocused = useIsFocused();
  const { width } = useWindowDimensions();
  const isWide = width >= WIDE_LAYOUT_MIN_WIDTH;

  const checkReadyIntervalRef = useRef(null);
  const acquiringSessionRef = useRef(null);

  async function checkReady(newSession, newHoldFor) {
    let tempSessionResponse;
    try {
      tempSessionResponse = await TempSession(newSession, newHoldFor);
    } catch (e) {
      // Network hiccup; keep polling.
      return;
    }

    switch (tempSessionResponse) {
      case 0:
        // Session expired or errored server-side; start over.
        acquireSession();
        break;
      case 1:
        // Keep waiting for the control software.
        break;
      case 2:
        // Control software connected. Ready to present.
        clearInterval(checkReadyIntervalRef.current);
        checkReadyIntervalRef.current = null;
        setReady(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }

  async function acquireSession() {
    // A transition to initializing is an explicit refresh of an older attempt.
    const isRefresh =
      session === SessionInitializing &&
      acquiringSessionRef.current?.session !== SessionInitializing;

    if (acquiringSessionRef.current !== null && !isRefresh) {
      return;
    }

    const acquisition = { session };
    acquiringSessionRef.current = acquisition;
    setReady(false);

    try {
      const newSession = await AcquireSession();

      if (acquiringSessionRef.current !== acquisition) {
        return;
      }

      setSession(newSession);

      if (checkReadyIntervalRef.current !== null) {
        clearInterval(checkReadyIntervalRef.current);
      }

      const newHoldFor = Math.floor(Math.random() * 900000) + 100000;
      setHoldFor(newHoldFor);

      checkReadyIntervalRef.current = setInterval(
        () => checkReady(newSession, newHoldFor),
        1000,
      );
    } finally {
      if (acquiringSessionRef.current === acquisition) {
        acquiringSessionRef.current = null;
      }
    }
  }

  useEffect(() => {
    if (isFocused && session === SessionInitializing) {
      acquireSession();
    }
  }, [isFocused, session]);

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <View style={[styles.content, isWide && styles.contentWide]}>
        <View style={[styles.hero, isWide && styles.heroWide]}>
          <Image
            source={require("../../assets/images/upr_logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.eyebrow}>Universal Presenter Remote</Text>
          <Text style={styles.title}>Pair your remote</Text>
          <Text style={styles.lead}>
            Enter the token below into the UPR control software on your
            presenting computer. As soon as it connects, you can begin.
          </Text>
        </View>

        <View style={[styles.pairing, isWide && styles.pairingWide]}>
          <View style={styles.tokenCard}>
            <Text style={styles.tokenLabel}>Your connection token</Text>
            <TokenDigits token={session} />
          </View>

          <View style={styles.statusRow}>
            <StatusDot connected={ready} />
            <Text style={ready ? styles.statusReady : styles.statusWaiting}>
              {ready
                ? "Control software connected"
                : "Waiting for the control software..."}
            </Text>
          </View>

          <Button
            title={ready ? "Begin" : "Waiting..."}
            onPress={() => navigation.navigate("Control")}
            style={styles.beginButton}
            disabled={!ready}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.section,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
  contentWide: {
    flexDirection: "row",
    gap: spacing.xxl,
  },
  // Grows so the logo inside can absorb leftover vertical space, exactly as
  // it did when it was a direct child of content.
  hero: {
    flexGrow: 1,
    flexShrink: 1,
    alignItems: "center",
    alignSelf: "stretch",
  },
  heroWide: {
    flex: 1,
    maxWidth: 400,
    justifyContent: "center",
  },
  pairing: {
    alignItems: "center",
    alignSelf: "stretch",
  },
  pairingWide: {
    flex: 1,
    maxWidth: 420,
    alignSelf: "center",
  },
  // Basis 0 + grow means the logo only consumes leftover vertical space,
  // so it scales down on short screens and caps at 280px on tall ones.
  logo: {
    flexBasis: 0,
    flexGrow: 1,
    flexShrink: 1,
    maxHeight: 280,
    maxWidth: 280,
    aspectRatio: 1,
    marginBottom: spacing.lg,
  },
  eyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: colors.accent,
    marginBottom: spacing.xs,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 34,
    color: colors.ink,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  lead: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 24,
    color: colors.muted,
    textAlign: "center",
    maxWidth: 320,
    marginBottom: spacing.xl,
  },

  tokenCard: {
    backgroundColor: colors.card,
    borderRadius: radii.card,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    // Full width on phones, but capped so the card doesn't sprawl past the
    // rest of the copy on tablets and other wide screens.
    width: "100%",
    maxWidth: 380,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.ink,
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  tokenLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    color: colors.muted2,
    marginBottom: spacing.md,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.xl,
  },
  statusWaiting: {
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.muted,
  },
  statusReady: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 15,
    color: colors.greenInk,
  },

  beginButton: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
    alignSelf: "center",
    width: "100%",
    maxWidth: 320,
  },
});
