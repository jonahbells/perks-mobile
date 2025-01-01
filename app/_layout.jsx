import { StyleSheet, Text, View } from "react-native";
import { Slot, SplashScreen, Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { useFonts } from "expo-font";
import { useEffect } from "react";

import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";

import GlobalProvider from "../context/GlobalProvider";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Outfit-Black": require("../assets/fonts/Outfit-Black.ttf"),
    "Outfit-Bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "Outfit-ExtraBold": require("../assets/fonts/Outfit-ExtraBold.ttf"),
    "Outfit-ExtraLight": require("../assets/fonts/Outfit-ExtraLight.ttf"),
    "Outfit-Light": require("../assets/fonts/Outfit-Light.ttf"),
    "Outfit-Medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "Outfit-Regular": require("../assets/fonts/Outfit-Regular.ttf"),
    "Outfit-SemiBold": require("../assets/fonts/Outfit-SemiBold.ttf"),
    "Outfit-Thin": require("../assets/fonts/Outfit-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    // <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen
          name="perks-details/[id]"
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen 
        name='/search/{query}'
        options={{ headerShown: false }}
      /> */}
      </Stack>
    </GlobalProvider>
    // </ClerkProvider>
  );
};

export default RootLayout;
