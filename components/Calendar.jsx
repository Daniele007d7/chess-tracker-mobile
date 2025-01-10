import { useState, useEffect } from "react";

import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { View, Text, Button, Pressable, StyleSheet } from "react-native";

export default function HomeCalendar({
  date,
  increaseDate,
  decreaseDate,
  handleDateChange,
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  /*const [highlightDays, setHighlightDays] = useState([]);
  useEffect(() => {
    fetch("/api/calendar")
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setHighlightDays(data);
      });
  }, []);

  useEffect(() => {
    const days = highlightDays.map((day) => { 
      return new Date(day.responseDate);
    });
  }, [highlightDays]); */

  const formattedDate = currentDate.toLocaleDateString("en-CA");
  return (
    <View style={styles.formContainer}>
      <View style={styles.dataContainer}>
        <Pressable
          onPress={() =>
            setCurrentDate(
              new Date(currentDate.setDate(currentDate.getDate() - 1))
            )
          }
          style={({ pressed }) => [
            styles.changeDateBtn,
            { backgroundColor: pressed ? "#FF7F7F" : "white" },
          ]}
        >
          <Text style={styles.buttonText}>←</Text>
        </Pressable>
        <Text
          onPress={(n) => setShowCalendar(!showCalendar)}
          style={styles.dateText}
        >
          {currentDate.getDate() +
            "/" +
            (currentDate.getMonth() + 1) +
            "/" +
            currentDate.getFullYear()}
        </Text>

        <Pressable
          onPress={() =>
            setCurrentDate(
              new Date(currentDate.setDate(currentDate.getDate() + 1))
            )
          }
          style={({ pressed }) => [
            styles.changeDateBtn,
            { backgroundColor: pressed ? "lightgreen" : "white" },
          ]}
        >
          <Text style={styles.buttonText}>→</Text>
        </Pressable>
      </View>
      {showCalendar && (
        <Calendar
          current={currentDate.toDateString()}
          markedDates={{
            [formattedDate]: {
              selected: true,
              marked: true,
              selectedColor: "green",
            },
          }}
          onDayPress={(day) => {
            console.log(day.dateString);
            setCurrentDate(new Date(day.timestamp));
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dateText: {
    fontSize: 25,
  },
  formContainer: {},

  calendarContainer: {},
  buttonText: {
    fontSize: 24,
  },

  changeDateBtn: {
    height: 50,
    width: 50,
    fontSize: 24,
  },

  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
