import Button from "../components/Button";
import { useContext, useEffect } from "react";
import { StyleSheet, Image, Text, View, SafeAreaView } from "react-native";
import {
  AcquireSession,
  SessionInitializing,
  UPRContext,
} from "../model/uprkit";

export default function Login({ navigation }) {
  const { session, setSession } = useContext(UPRContext);

  async function acquireSession() {
    const newSession = await AcquireSession();
    console.log("acquired", newSession);
    setSession(newSession);
  }

  useEffect(() => {
    if (session === SessionInitializing) {
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
          title="Join session"
          onPress={() => navigation.navigate("Control")}
          style={styles.joinButton}
          disabled={session === SessionInitializing}
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
