import { View, Text, FlatList, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

import {
  useFonts,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
  Montserrat_600SemiBold,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";

import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export default function TipsScreen() {
  const [tips, setTips] = useState();

  const [fontLoaded] = useFonts({
    useFonts,
    Montserrat_700Bold,
    Montserrat_700Bold_Italic,
    Montserrat_600SemiBold,
    Montserrat_400Regular,
  });

  function Item({ tip }) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{tip}</Text>
      </View>
    );
  }
  useFocusEffect(
    useCallback(() => {
      fetch("http://10.0.2.2:3000/api/tips")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setTips(data);
        });
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#3D4944" }}>
      <Text style={styles.title}>TIPS</Text>
      <FlatList
        style={styles.flatlist}
        data={tips}
        keyExtractor={(item) => item.responseID}
        renderItem={({ item }) => <Item tip={item.responseTips} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#27261F",
    borderWidth: 4,
    borderRadius: 10,
    borderColor: "#697771",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  text: {
    fontSize: 18,
    fontFamily: "Montserrat_400Regular",
    color: "#EEF1ED",
  },
  title: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 75,
    color: "#FAFBFA",
    marginLeft: 10,
  },
  flatlist: {
    marginBottom: 100,
  },
});
