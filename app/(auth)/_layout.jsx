import { View, Text } from 'react-native';
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from 'react';

const AuthLayout = () => {
  return (
    <>
    <StatusBar backgroundColor={'transparent'} translucent/>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      {/* <Loader isLoading={loading} /> */}
      {/* <StatusBar backgroundColor="#161622" style="light" /> */}
    </>
  );
};

export default AuthLayout