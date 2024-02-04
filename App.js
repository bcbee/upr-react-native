import Button from "./app/components/Button";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import LoginScreen from "./app/views/Login";
import ControlScreen from "./app/views/Control";
import Instruction1 from "./app/views/Instruction1";
import Instruction2 from "./app/views/Instruction2";
import Instruction3 from "./app/views/Instruction3";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#340636",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Group>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={({ navigation }) => ({
              title: "",
              headerLeft: () => (
                <Button
                  onPress={() => navigation.navigate("Instruction1")}
                  title="Refresh"
                  icon="refresh-cw"
                />
              ),
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate("Instruction1")}
                  icon="info"
                />
              ),
            })}
          />
          <Stack.Screen name="Control" component={ControlScreen} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name="Instruction1" component={Instruction1} />
          <Stack.Screen name="Instruction2" component={Instruction2} />
          <Stack.Screen name="Instruction3" component={Instruction3} />
        </Stack.Group>
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
