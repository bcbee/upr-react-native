import { Linking, StyleSheet, Text } from "react-native";

import { colors, fonts } from "../theme";

export default function Link({ url, children }) {
  return (
    <Text
      style={styles.link}
      accessibilityRole="link"
      onPress={() => Linking.openURL(url)}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  link: {
    color: colors.accent,
    fontFamily: fonts.bodySemiBold,
    textDecorationLine: "underline",
  },
});
