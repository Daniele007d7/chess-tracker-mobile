import { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { View, Text, Button, Pressable, StyleSheet } from "react-native";

export default function HomeCalendar({
  date,
  increaseDate,
  decreaseDate,
  handleDateChange,
  control,
}) {
  const [showCalendar, setShowCalendar] = useState(false);

  const [currentDate, setCurrentDate] = useState(new Date());
  const formattedDate = currentDate.toLocaleDateString("en-CA");
  return (
    <Controller
      name="date"
      control={control}
      defaultValue={currentDate}
      render={({ field: { onChange, onBlur, value } }) => (
        <View value={currentDate} style={styles.formContainer}>
          <View style={styles.dataContainer}>
            <Pressable
              onPress={() => {
                setCurrentDate(
                  new Date(currentDate.setDate(currentDate.getDate() - 1))
                );
                onChange(new Date(currentDate));
              }}
              style={({ pressed }) => [
                styles.changeDateBtn,
                { backgroundColor: pressed ? "#FF7F7F" : "white" },
              ]}
            >
              <Text style={styles.buttonText}>←</Text>
            </Pressable>

            <Text
              onPress={(n) => {
                setShowCalendar(!showCalendar);
              }}
              style={styles.dateText}
            >
              {currentDate.getDate() +
                "/" +
                (currentDate.getMonth() + 1) +
                "/" +
                currentDate.getFullYear()}
            </Text>

            <Pressable
              onPress={() => {
                setCurrentDate(
                  new Date(currentDate.setDate(currentDate.getDate() + 1))
                );
                onChange(new Date(currentDate));
              }}
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
              value={value}
              current={currentDate.toDateString()}
              markedDates={{
                [formattedDate]: {
                  selected: true,
                  marked: true,
                  selectedColor: "green",
                },
              }}
              onDayPress={(day) => {
                console.log(day);

                setCurrentDate(new Date(day.timestamp));
                onChange(new Date(day.timestamp));
              }}
              onChange={currentDate}
            />
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  dateText: {
    fontSize: 25,
  },
  formContainer: {},

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
