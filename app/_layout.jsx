import { StyleSheet, Text, View } from 'react-native'
import { Slot, SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { useEffect } from 'react';

import GlobalProvider from "../context/GlobalProvider";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Outfit-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Outfit-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Outfit-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Outfit-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Outfit-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Outfit-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Outfit-Thin.ttf"),
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
    <GlobalProvider>
    <Stack>
      <Stack.Screen
        name='(tabs)'
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='index'
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='(auth)'
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name='perks-details/[id]'
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen 
        name='/search/{query}'
        options={{ headerShown: false }}
      /> */}
    </Stack>
    </GlobalProvider>
  )
}

export default RootLayout
