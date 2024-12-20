import { useState, useEffect } from "react";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { View, Text, Button, Pressable, StyleSheet } from "react-native";

export default function HomeCalendar({
  date,
  increaseDate,
  decreaseDate,
  handleDateChange,
}) {
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
  return (
    <View style={styles.formContainer}>
      <Calendar
        current={"2024-04-29"}
        markedDates={{
          "2024-04-29": { selected: true, marked: true, selectedColor: "blue" },
        }}
        onDayPress={(day) => {
          console.log("selected day", day);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  date: {
    fontFamily: "DM Serif Text",
    fontSize: 25,
    color: "antiquewhite",
    width: 500,
    textAlign: "center",
  },
  formContainer: { flex: 1 },

  calendarContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  changeDateBtn: {
    height: 50,
    width: 50,
  },

  TextData: {
    padding: 5,
  },
});
