import { Pressable, StyleSheet, Text } from "react-native";
import Icon from "@react-native-vector-icons/feather";

import { colors, fonts, radii } from "../theme";

// Variants:
//  - primary (default): white label on accent magenta
//  - ghost: outline button for dark surfaces (e.g. "End session")
//  - icon-only: pass `icon` with no `title` for header actions
export default function UPRButton({
  title,
  icon,
  iconColor = colors.ink,
  variant = "primary",
  onPress,
  disabled,
  style,
  textStyle,
}) {
  if (icon && !title) {
    return (
      <Pressable
        onPress={onPress}
        hitSlop={10}
        style={({ pressed }) => [
          styles.iconButton,
          pressed && { opacity: 0.6 },
        ]}
      >
        <Icon name={icon} size={24} color={iconColor} />
      </Pressable>
    );
  }

  const isGhost = variant === "ghost";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        isGhost ? styles.ghost : styles.primary,
        !isGhost && pressed && styles.primaryPressed,
        isGhost && pressed && styles.ghostPressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text
        style={[
          isGhost ? styles.ghostText : styles.primaryText,
          disabled && styles.disabledText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primary: {
    backgroundColor: colors.accent,
    borderRadius: radii.button,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 28,
  },
  primaryPressed: {
    backgroundColor: colors.accentActive,
  },
  primaryText: {
    color: "#FFFFFF",
    fontFamily: fonts.displayBold,
    fontSize: 16,
  },

  ghost: {
    backgroundColor: "transparent",
    borderRadius: radii.ghost,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  ghostPressed: {
    backgroundColor: colors.onDarkFill,
  },
  ghostText: {
    color: "rgba(255,255,255,0.7)",
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
  },

  disabled: {
    backgroundColor: colors.disabledBg,
  },
  disabledText: {
    color: colors.disabledText,
  },

  iconButton: {
    padding: 6,
  },
});
