import Button from "./Button";
import {
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function InstructionPage({ navigation, image, text, nextPage }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imagePanel}>
        <Image source={image} style={styles.image} resizeMode="contain" />
      </View>
      <ScrollView style={styles.textScrollContainer}>
        <Text style={styles.text}>{text}</Text>
      </ScrollView>
      <Button
        title={nextPage ? "Next" : "Close"}
        style={styles.button}
        onPress={() =>
          nextPage
            ? navigation.navigate(nextPage)
            : navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  textScrollContainer: {
    flex: 1,
    padding: 15,
  },
  text: {
    color: "black",
    fontFamily: "SugarcubesRegular",
    fontSize: 17,
  },
  button: {
    margin: 15,
    width: 280,
    height: 50,
    marginBottom: 25,
  },

  imagePanel: {
    height: 160,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B30298",
  },
  image: {
    flex: 1,
    margin: 10,
  },
});
