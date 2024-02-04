import { TouchableOpacity } from "react-native";
import { Button } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function UPRButton({ title, icon, onPress }) {
  if (icon) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Icon name={icon} size={28} color="#FFF" />
      </TouchableOpacity>
    );
  }

  return <Button title={title} onPress={onPress} />;
}
