import {
  Text,
  View,
  Button,
  TextInput,
  Switch,
  Pressable,
  StyleSheet,
} from "react-native";

import { useState } from "react";

import HomeCalendar from "@/components/Calendar";

export default function Index() {
  const [highlightDay, setHighlightDay] = useState([]);
  const [date, setDate] = useState(new Date());
  const [study, setStudy] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [focus, setFocus] = useState(1);
  const [tips, setTips] = useState("");

  console.log(
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
  );
  function increaseDate() {
    setDate(new Date(date.setDate(date.getDate() + 1)));
  }

  function decreaseDate() {
    setDate(new Date(date.setDate(date.getDate() - 1)));
  }

  function handleDateChange(selectedDay) {
    setDate(selectedDay);

    setShowCalendar(false);
  }

  function selectFocus(number) {
    setFocus(number);
    console.log(number);
  }

  function handleTipsChange(e) {
    setTips(e.target.value);
  }

  /* function handleSubmit(e) {
       e.preventDefault();
   
       fetch("/api/submit", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           date:
             date.getFullYear() +
             "/" +
             (date.getMonth() + 1) +
             "/" +
             date.getDate(),
           highlightDay: date.toDateString(),
           study: study,
           minutes: minutes,
           focus: focus,
           tips: tips,
         }),
       })
         .then((response) => response.json())
         .then((data) => {
           console.log("questo è data", data);
   
           setHighlightDay([...highlightDay, data]);
           navigate("/tips");
         });
     } */
  return <HomeCalendar />;
}

const styles = StyleSheet.create({
  homepageForm: {
    width: 310,
    flex: 1,
    marginBottom: 100,

    fontSize: 30,
    flexDirection: "column",
    alignItems: "center",
  },

  study: {
    width: 40,
    height: 40,
  },

  minutesTextInput: {
    width: 60,
    height: 20,
  },

  button: {
    marginTop: 10,
  },

  headersContainer: {
    width: 100,

    justifyContent: "center",
  },

  headersTitle: {
    margin: 10,
    color: "antiquewhite",
  },
});

{
  /* <View>
      <Text>homepage</Text>

      <View style={styles.homepageForm}>
        <HomeCalendar
          increaseDate={increaseDate}
          decreaseDate={decreaseDate}
          handleDateChange={handleDateChange}
          date={date}
        />

        <Text>Did you study chess today?</Text>
        {/*  <Switch
          value={study}
          onValueChange={() => {
            setStudy(!study);
            console.log("this is study", study);
          }}
          style={styles.study}
        /> */
}
/* 
        <Text>How much did you study (in minutes)?</Text>
        <TextInput
          onChangeText={(text) => setMinutes(text)}
          value={minutes}
          keyboardType="numeric"
          style={styles.minutesInput}
        />

        <Text>What was your focus level?</Text>
        <View id="focus-View">
          {[1, 2, 3, 4, 5].map((level) => (
            <Button
              title={`${level}`}
              key={level}
              onPress={() => selectFocus(level)}
            />
          ))}
        </View>

        <Text>What are your key takeaways from this study session?</Text>
        <TextInput
          multiline
          numberOfLines={4}
          onChangeText={handleTipsChange}
          value={tips}
          style={styles.textarea}
        />

        <Pressable title="Submit" style={styles.button} />
      </View>
    </View> */
