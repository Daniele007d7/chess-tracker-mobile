import { Stack, useRouter } from "expo-router";
import { useState, useContext, useEffect } from "react";
import { StyleSheet } from "react-native";

import AuthProvider, { AuthContext } from "../components/AuthContext.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";

function RootLayout() {
  const { isLogged, setIsLogged } = useContext(AuthContext);
  console.log(isLogged);
  const router = useRouter();

  useEffect(() => {
    console.log("start");

    tokenAuth();
  }, []);

  async function tokenAuth() {
    try {
      const token = await SecureStore.getItemAsync("token");
      console.log("values", token);
      fetch("http://10.0.2.2:3000/api/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId: token }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setIsLogged(data);
          if (data) {
            router.push("/(tabs)");
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

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
