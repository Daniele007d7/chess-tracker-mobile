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
import Checkbox from "expo-checkbox";
import RadioGroup from "react-native-radio-buttons-group";
import { useForm, Controller } from "react-hook-form";

import HomeCalendar from "@/components/Calendar";
import TextInputController from "@/components/TextInputController";

export default function Index() {
  const [hasStudy, setHasStudy] = useState(false);
  const [highlightDay, setHighlightDay] = useState([]);
  const [date, setDate] = useState(new Date());
  const [selectedFocus, setSelectedFocus] = useState();
  const [minutes, setMinutes] = useState(0);
  const [focus, setFocus] = useState(1);
  const [tips, setTips] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    console.log(data);
  };
  const radioButtons = [
    {
      id: "1id",
      label: "1label",
      value: "1value",
    },
    {
      id: 2,
      label: 2,
      value: 2,
    },
    {
      id: 3,
      label: 3,
      value: 3,
    },
    {
      id: 4,
      label: 4,
      value: 4,
    },
    {
      id: 5,
      label: 5,
      value: 5,
    },
  ];

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

  function handleSubmition(e) {
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
  }

  return (
    <View sytle={styles.homepageForm}>
      <HomeCalendar date={date} />
      <Text>Did you study chess today?</Text>
      <Controller
        control={control}
        name="study"
        render={({ field: { onChange, onBlur, value } }) => (
          <Checkbox value={value} onBlur={onBlur} onValueChange={onChange} />
        )}
      />

      <Text>How much did you study?</Text>
      <TextInputController
        control={control}
        name="minutes"
        keyboardType="numeric"
      />

      <Text>What was your focus level?</Text>

      <Controller
        control={control}
        name="focus"
        render={({ field: { onChange, onBlur, value } }) => (
          <RadioGroup
            radioButtons={radioButtons}
            selectedId={value}
            onPress={onChange}
            layout="row"
            value={value}
          />
        )}
      />
      <TextInputController control={control} name="tips" />

      <Button title="submit" onPress={handleSubmit(submit)} />
      {/*      <Pressable onPress={handleSubmit} style={styles.submit}>
        <Text style={styles.submitText}>submit</Text>
      </Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  homepageForm: {
    flex: 1,
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
  submit: {
    margin: 25,
    width: "auto",
    height: 40,
    backgroundColor: "#2143EE",
    padding: 10,
    borderRadius: 15,
  },
  submitText: {
    fontSize: 16,
    color: "#FAEBD7",
    textAlign: "center",
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

  tips: {
    borderWidth: 1,
    margin: 15,
  },
});
