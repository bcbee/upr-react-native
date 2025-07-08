import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native";
import Icon from "@react-native-vector-icons/feather";

export default function UPRButton({
  title,
  icon,
  onPress,
  disabled,
  style,
  textStyle,
}) {
  if (icon) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.imageButton}>
        <Icon name={icon} size={28} color="#FFF" />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled ? styles.disabled : undefined, style]}
    >
      <Text
        style={[
          styles.buttonText,
          disabled ? styles.disabledText : undefined,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#B30298",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  imageButton: {
    padding: 10,
    margin: -10,
  },
  buttonText: {
    color: "white",
    fontFamily: "SugarcubesBold",
    fontSize: 20,
  },
  disabled: {
    backgroundColor: "#CCC",
  },
  disabledText: {
    color: "#000",
  },
});
