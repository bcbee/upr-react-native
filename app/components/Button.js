import { TouchableOpacity } from "react-native";
import { Button } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function UPRButton({ title, icon, onPress, style }) {
  if (icon) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Icon name={icon} size={28} color="#FFF" style={style} />
      </TouchableOpacity>
    );
  }

  return <Button title={title} onPress={onPress} style={style} />;
}
