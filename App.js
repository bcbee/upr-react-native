import { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as ScreenOrientation from "expo-screen-orientation";
import * as SplashScreen from "expo-splash-screen";
// Per-weight imports keep the unused font weights out of the bundle.
import { Manrope_700Bold } from "@expo-google-fonts/manrope/700Bold";
import { Manrope_800ExtraBold } from "@expo-google-fonts/manrope/800ExtraBold";
import { Inter_400Regular } from "@expo-google-fonts/inter/400Regular";
import { Inter_500Medium } from "@expo-google-fonts/inter/500Medium";
import { Inter_600SemiBold } from "@expo-google-fonts/inter/600SemiBold";
import { Inter_700Bold } from "@expo-google-fonts/inter/700Bold";

import Button from "./app/components/Button";
import LoginScreen from "./app/views/Login";
import ControlScreen from "./app/views/Control";
import Instruction1 from "./app/views/Instruction1";
import Instruction2 from "./app/views/Instruction2";
import Instruction3 from "./app/views/Instruction3";
import { SessionInitializing, UPRContext } from "./app/model/uprkit";
import { colors, fonts } from "./app/theme";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

const lightHeader = {
  headerStyle: { backgroundColor: colors.card },
  headerShadowVisible: false,
  headerTintColor: colors.ink,
  headerTitleStyle: {
    fontFamily: fonts.display,
    fontSize: 16,
    color: colors.ink,
  },
};

export default function App() {
  const [session, setSession] = useState(SessionInitializing);
  const [holdFor, setHoldFor] = useState();
  const [ready, setReady] = useState(false);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const isTablet = Math.min(screenWidth, screenHeight) >= 600;

  useEffect(() => {
    const orientationPromise = isTablet
      ? ScreenOrientation.unlockAsync()
      : ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP,
        );

    orientationPromise.catch(console.warn);
  }, [isTablet]);

  const [fontsLoaded, fontError] = useFonts({
    Manrope_700Bold,
    Manrope_800ExtraBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <UPRContext.Provider
      value={{
        session,
        setSession,
        holdFor,
        setHoldFor,
        ready,
        setReady,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator screenOptions={lightHeader}>
          <Stack.Group>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={({ navigation }) => ({
                title: "",
                headerLeft: () => (
                  <Button
                    onPress={() => setSession(SessionInitializing)}
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
            <Stack.Screen
              name="Control"
              component={ControlScreen}
              options={{ headerShown: false }}
            />
          </Stack.Group>
          <Stack.Group
            screenOptions={({ navigation }) => ({
              presentation: "modal",
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
          >
            <Stack.Screen name="Instruction1" component={Instruction1} />
            <Stack.Screen name="Instruction2" component={Instruction2} />
            <Stack.Screen name="Instruction3" component={Instruction3} />
          </Stack.Group>
        </Stack.Navigator>
        <StatusBar style="dark" />
      </NavigationContainer>
    </UPRContext.Provider>
  );
}
