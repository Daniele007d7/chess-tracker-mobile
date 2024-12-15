import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="goals" options={{ title: "Goals" }} />
      <Tabs.Screen name="index" options={{ title: "Homepage" }} />
      <Tabs.Screen name="tips" options={{ title: "Tips" }} />
      <Tabs.Screen name="stats" options={{ title: "Stats" }} />
    </Tabs>
  );
}
