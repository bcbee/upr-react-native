import { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Button from "./app/components/Button";
import LoginScreen from "./app/views/Login";
import ControlScreen from "./app/views/Control";
import Instruction1 from "./app/views/Instruction1";
import Instruction2 from "./app/views/Instruction2";
import Instruction3 from "./app/views/Instruction3";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    BatmanForeverAlternate: require("./assets/fonts/BatmanForeverAlternate.ttf"),
    SugarcubesBold: require("./assets/fonts/SugarcubesBold.ttf"),
    SugarcubesRegular: require("./assets/fonts/SugarcubesRegular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer onLayout={onLayoutRootView}>
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
                  onPress={() => console.log("Refresh")}
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
          <Stack.Screen
            name="Instruction1"
            component={Instruction1}
            options={({ navigation }) => ({
              title: "Instructions",
              headerRight: () => (
                <Button
                  onPress={() =>
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "Login" }],
                    })
                  }
                  icon="x"
                />
              ),
            })}
          />
          <Stack.Screen
            name="Instruction2"
            component={Instruction2}
            options={({ navigation }) => ({
              title: "Instructions",
              headerRight: () => (
                <Button
                  onPress={() =>
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "Login" }],
                    })
                  }
                  icon="x"
                />
              ),
            })}
          />
          <Stack.Screen
            name="Instruction3"
            component={Instruction3}
            options={({ navigation }) => ({
              title: "Instructions",
              headerRight: () => (
                <Button
                  onPress={() =>
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "Login" }],
                    })
                  }
                  icon="x"
                />
              ),
            })}
          />
        </Stack.Group>
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
