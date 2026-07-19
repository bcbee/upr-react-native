import { StyleSheet, Text, View } from "react-native";

import { colors, fonts, radii } from "../theme";
import { FormatToken } from "../model/uprkit";

// The six-digit connection token, rendered as pill boxes like the
// website's web-remote pairing card. Shows "·" placeholders until the
// token has been issued by the server.
export default function TokenDigits({ token }) {
  const formatted = FormatToken(token);
  const digits = formatted ? formatted.split("") : Array(6).fill("·");

  return (
    <View style={styles.row}>
      {digits.map((digit, index) => (
        <View key={index} style={styles.digitBox}>
          <Text style={styles.digit}>{digit}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
  digitBox: {
    width: 46,
    height: 60,
    borderRadius: radii.tokenDigit,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  digit: {
    fontFamily: fonts.display,
    fontSize: 32,
    color: colors.accent,
  },
});
