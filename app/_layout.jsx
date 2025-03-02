import { Stack, Slot } from "expo-router";
import { useState, useContext, useEffect } from "react";
import { StyleSheet } from "react-native";

import AuthProvider, { AuthContext } from "../components/AuthContext.jsx";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";

function RootLayout() {
  const { isLogged } = useContext(AuthContext);
  console.log(isLogged);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        {!isLogged ? (
          <Stack.Screen name="(app)" />
        ) : (
          <Stack.Screen name="(tabs)" />
        )}
      </Stack>
    </SafeAreaView>
  );
}

export default function WrappedRootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F3F3",
  },
});
