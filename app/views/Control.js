import { useContext } from "react";
import Button from "../components/Button";
import { SafeAreaView, StyleSheet } from "react-native";
import { UPRContext, SlideUp, SlideDown, PlayMedia } from "../model/uprkit";

export default function ControlScreen() {
  const { session, holdFor } = useContext(UPRContext);

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Media"
        style={styles.button}
        textStyle={styles.buttonText}
        onPress={() => PlayMedia(session, holdFor)}
      />
      <Button
        title="Previous"
        style={styles.button}
        textStyle={styles.buttonText}
        onPress={() => SlideDown(session, holdFor)}
      />
      <Button
        title="Next"
        style={styles.button}
        textStyle={styles.buttonText}
        onPress={() => SlideUp(session, holdFor)}
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
