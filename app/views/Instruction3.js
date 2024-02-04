import { StatusBar } from "expo-status-bar";
import { Button, Text, View } from "react-native";

export default function Instruction3({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Instruction 3 Screen</Text>
      <Button
        title="Close"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        }
      />
      <StatusBar style="auto" />
    </View>
  );
}
