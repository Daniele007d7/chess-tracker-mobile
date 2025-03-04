import { SafeAreaView, Text, View, ScrollView, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { CartesianChart, Line } from "victory-native";
import { useFont } from "@shopify/react-native-skia";
import { Inter_300Light } from "@expo-google-fonts/inter";

import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

import {
  useFonts,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
  Montserrat_600SemiBold,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";

export default function StatScreen() {
  const [focus, setFocus] = useState([]);
  const [xLabelFocus, setXLabelFocus] = useState();
  const [min, setMin] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const font = useFont(Montserrat_400Regular, 12);

  const [fontLoaded] = useFonts({
    useFonts,
    Montserrat_700Bold,
    Montserrat_700Bold_Italic,
    Montserrat_600SemiBold,
    Montserrat_400Regular,
  });

  useFocusEffect(
    useCallback(() => {
      fetch("http://10.0.2.2:3000/api/stats")
        .then((response) => response.json())
        .then((data) => {
          console.log("0cisiamo");
          data.sort(
            (a, b) => new Date(a.responseDate) - new Date(b.responseDate)
          );

          const minutesData = data.map((line, index) => ({
            x: index,
            date:
              new Date(line.responseDate).getDate() +
              1 +
              "/" +
              (new Date(line.responseDate).getMonth() + 1),

            minutes: line.responseMinutes,
          }));

          const focusData = data.map((line, index) => ({
            x: index,
            date:
              new Date(line.responseDate).getUTCDate() +
              1 +
              "/" +
              (new Date(line.responseDate).getMonth() + 1),

            focus: line.responseFocus,
          }));

          const xLabelFocus = focusData.map((date) => date.date);

          console.log(xLabelFocus.length * 150);
          console.log(focusData);
          setMin(minutesData);
          setFocus(focusData);
          setXLabelFocus(xLabelFocus);
          setIsLoading(false);
        });
    }, [])
  );

  if (isLoading) {
    return <Text>it's loading</Text>;
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#3D4944" }}>
      <Text style={styles.title}>STATS</Text>
      <Text style={styles.graphTitle}>MINUTES</Text>

      <ScrollView
        horizontal={true}
        style={styles.scroll}
        contentContainerStyle={{
          height: 300,
          minWidth: xLabelFocus.length * 40,
          flex: 1,
        }}
        showsHorizontalScrollIndicator={false}
      >
        <CartesianChart
          data={min}
          xKey={"x"}
          yKeys={["minutes"]}
          padding={{ top: 20, bottom: 40, right: 30 }}
          domain={{ x: [0, min.length - 0.4] }}
          axisOptions={{
            font,
            tickCount: {
              x: min.length,
              y: 10,
            },
            tickValues: {
              y: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
              x: min.map((d) => d.x),
            },
            formatXLabel: (label) => {
              const found = min.find((element) => element.x === label);

              return found.date;
            },
            lineColor: { grid: "#FBFAFB", x: "#FBFAFB", y: "#FBFAFB" },
            lineWidth: { grid: 3, x: 3, y: 3 },
            labelColor: { x: "#FBFAFB", y: "#FBFAFB" },
          }}
        >
          {({ points }) => (
            <Line points={points.minutes} color={"green"} strokeWidth={3} />
          )}
        </CartesianChart>
      </ScrollView>
      <Text style={styles.graphTitle}>FOCUS LEVEL</Text>
      <ScrollView
        horizontal={true}
        style={[styles.scroll, { marginBottom: 60 }]}
        contentContainerStyle={{
          height: 300,
          minWidth: xLabelFocus.length * 40,
          flex: 1,
        }}
        showsHorizontalScrollIndicator={false}
      >
        <CartesianChart
          data={focus}
          xKey={"x"}
          yKeys={["focus"]}
          padding={{ top: 20, bottom: 40, right: 30 }}
          domain={{ x: [0, focus.length - 0.4] }}
          axisOptions={{
            font,
            tickCount: {
              x: focus.length,
              y: 6,
            },
            tickValues: {
              y: [0, 1, 2, 3, 4, 5],
              x: focus.map((d) => d.x),
            },
            formatXLabel: (label) => {
              const found = focus.find((element) => element.x === label);

              return found.date;
            },
            lineColor: { grid: "#FBFAFB", x: "#FBFAFB", y: "#FBFAFB" },
            lineWidth: { grid: 3, x: 3, y: 3 },
            labelColor: { x: "#FBFAFB", y: "#FBFAFB" },
          }}
        >
          {({ points }) => (
            <Line points={points.focus} color={"red"} strokeWidth={3} />
          )}
        </CartesianChart>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 75,
    color: "#FAFBFA",
    marginLeft: 10,
  },
  scroll: {
    height: 300,
    marginHorizontal: 20,

    flex: 1,
  },
  graphTitle: {
    fontFamily: "Inter_900Black",
    marginLeft: 10,
    fontSize: 30,
  },
});
