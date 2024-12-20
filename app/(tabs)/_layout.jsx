import { Tabs } from "expo-router";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  const [fontsLoaded] = useFonts({
    Inter_900Black,
  });
  return (
    <Tabs screen>
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
