import Button from "../components/Button";
import { useContext, useEffect, useRef } from "react";
import { StyleSheet, Image, Text, View, SafeAreaView } from "react-native";
import * as Haptics from "expo-haptics";
import {
  AcquireSession,
  SessionInitializing,
  UPRContext,
  TempSession,
} from "../model/uprkit";

export default function Login({ navigation }) {
  const { session, setSession, setHoldFor, ready, setReady } =
    useContext(UPRContext);

  const checkReadyIntervalRef = useRef(null);

  async function checkReady(newSession, newHoldFor) {
    const tempSessionResponse = await TempSession(newSession, newHoldFor);
    console.log("checking ready", newSession, newHoldFor, tempSessionResponse);

    switch (tempSessionResponse) {
      case 0:
        // Error, reset session.
        console.log("error acquiring session, resetting");
        acquireSession();
        break;
      case 1:
        // Keep waiting.
        break;
      case 2:
        // Session acquired. Ready to present.
        console.log("ready to present");
        const intervalId = checkReadyIntervalRef.current;
        console.log("clear interval", intervalId);
        clearInterval(intervalId);
        checkReadyIntervalRef.current = null;
        setReady(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }

  async function acquireSession() {
    setReady(false);

    const newSession = await AcquireSession();
    console.log("acquired", newSession);
    setSession(newSession);

    if (checkReadyIntervalRef.current !== null) {
      // Clear the previous interval if it exists
      const intervalId = checkReadyIntervalRef.current;
      console.log("clear interval", intervalId);
      clearInterval(intervalId);
    } else {
      console.log("no interval to clear");
    }

    const newHoldFor = Math.floor(Math.random() * 900000) + 100000;
    setHoldFor(newHoldFor);

    const intervalId = setInterval(
      () => checkReady(newSession, newHoldFor),
      1000,
    );
    checkReadyIntervalRef.current = intervalId;

    console.log("set interval", intervalId);
  }

  useEffect(() => {
    if (session === SessionInitializing) {
      console.log("acquire session via useEffect");
      acquireSession();
    }
  }, [session]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/upr_logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Image
          source={require("../../assets/images/banner.png")}
          style={styles.banner}
          resizeMode="contain"
        />
      </View>
      <View style={styles.session}>
        <Text style={styles.token}>{session}</Text>
        <Text style={styles.prompt}>Enter token on presenting device</Text>
        <Button
          title={ready ? "Join session" : "Waiting..."}
          onPress={() => navigation.navigate("Control")}
          style={styles.joinButton}
          disabled={!ready}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    flex: 1,
    margin: 10,
  },
  banner: {
    height: 50,
  },

  session: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 25,
  },
  prompt: {
    fontSize: 18,
    height: 30,
    textAlign: "center",
    color: "black",
    fontFamily: "SugarcubesRegular",
  },
  token: {
    fontSize: 38,
    height: 50,
    textAlign: "center",
    color: "black",
    fontFamily: "BatmanForeverAlternate",
  },
  joinButton: {
    margin: 15,
    width: 280,
    height: 50,
  },
});
