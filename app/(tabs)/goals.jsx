import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";

export default function GoalScreen() {
  const [fontsLoaded] = useFonts({
    Inter_900Black,
  });
  return <Text style={styles.title}>goals, daje</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Inter_900Black",
  },
});
