import { Tabs } from "expo-router";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { Stack } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import { useState, useContext } from "react";
import { AuthContext } from "../../components/AuthContext.jsx";
import { View } from "react-native";

export default function TabLayout() {
  const { isLogged } = useContext(AuthContext);

  const [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 70, // Match the background height
          borderRadius: 20,

          marginBottom: 10,
          marginHorizontal: 25,
          position: "absolute", // Ensure it overlays correctly
          bottom: 0, // Align it properly
        },
        tabBarBackground: () => (
          <View
            style={{
              height: 75,
              backgroundColor: "#2B2C2B",
              position: "absolute", // Ensure it covers the entire area
              width: "100%",
              borderRadius: 20,
              bottom: 0, // Align to the bottom
            }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="goals"
        options={{
          title: "Goals",
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "trophy-sharp" : "trophy-outline"}
              size={24}
              color="black"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Homepage",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tips"
        options={{
          title: "Tips",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="tips-and-updates"
              size={24}
              color={focused ? "black" : "#F4E97B"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "stats-chart-sharp" : "stats-chart-outline"}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
