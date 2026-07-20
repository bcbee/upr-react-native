import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "./Button";
import { colors, fonts, radii, spacing } from "../theme";

export default function InstructionPage({
  navigation,
  image,
  step,
  title,
  text,
  nextPage,
}) {
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.imagePanel}>
          <Image source={image} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.stepRow}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepNumber}>{step}</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
        </View>
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
    backgroundColor: colors.section,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },

  imagePanel: {
    height: 220,
    borderRadius: radii.tile,
    backgroundColor: colors.dark,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  image: {
    width: "80%",
    height: "80%",
  },

  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumber: {
    fontFamily: fonts.display,
    fontSize: 16,
    color: "#FFFFFF",
  },
  title: {
    flex: 1,
    fontFamily: fonts.display,
    fontSize: 22,
    color: colors.ink,
  },
  text: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 24,
    color: colors.muted,
  },

  button: {
    marginVertical: spacing.lg,
    alignSelf: "center",
    width: "100%",
    maxWidth: 320,
  },
});
