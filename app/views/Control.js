import Button from "../components/Button";
import { SafeAreaView, StyleSheet } from "react-native";

export default function ControlScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Media"
        style={styles.button}
        textStyle={styles.buttonText}
        onPress={() => console.log("Media")}
      />
      <Button
        title="Previous"
        style={styles.button}
        textStyle={styles.buttonText}
        onPress={() => console.log("Previous")}
      />
      <Button
        title="Next"
        style={styles.button}
        textStyle={styles.buttonText}
        onPress={() => console.log("Next")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    alignSelf: "stretch",
    flex: 1,
    margin: 15,
  },
  buttonText: {
    fontSize: 40,
  },
});
