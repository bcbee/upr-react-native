import { Button, Text, View } from "react-native";

export default function Instruction2({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Instruction 2 Screen</Text>
      <Button
        title="Next"
        onPress={() => navigation.navigate("Instruction3")}
      />
    </View>
  );
}
