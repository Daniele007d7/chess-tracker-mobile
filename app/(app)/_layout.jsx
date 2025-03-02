import { Stack, Slot } from "expo-router";
import { useState, useContext, useEffect } from "react";
import { StyleSheet } from "react-native";

import AuthProvider, { AuthContext } from "../../components/AuthContext.jsx";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const { isLogged } = useContext(AuthContext);

  return <Slot />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F3F3",
  },
});
