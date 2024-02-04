import { Button, Text, View } from "react-native";

export default function Login({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login Screen</Text>
      <Button
        title="Join session"
        onPress={() => navigation.navigate("Control")}
      />
    </View>
  );
}
