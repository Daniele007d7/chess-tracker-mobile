import {
  View,
  Text,
  Button,
  TextInput,
  Switch,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
import Checkbox from "expo-checkbox";
import RadioGroup from "react-native-radio-buttons-group";
import { useForm, Controller } from "react-hook-form";
import TextInputController from "@/components/TextInputController";

import {
  useFonts,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
  Montserrat_600SemiBold,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";

export default function StudyQuestion({
  minutes,
  setShowModal,
  showModal,
  setMinutes,
  setSeconds,
}) {
  const [fontLoaded] = useFonts({
    useFonts,
    Montserrat_700Bold,
    Montserrat_700Bold_Italic,
    Montserrat_600SemiBold,
    Montserrat_400Regular,
  });

  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm();

  console.log("minuti", minutes);

  const submit = (data) => {
    console.log("this is data", data);
    const updatedData = {
      ...data,
      date: new Date(),
      minutes: minutes,
    };

    setMinutes("0");
    setSeconds("0");

    fetch("http://10.0.2.2/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("questo è data", data);
      });
  };
  const radioButtons = [
    {
      id: "1",
      label: "1",
      value: "1",
      color: "white",
      labelStyle: {
        color: "white",
      },
    },
    {
      id: "2",
      label: "2",
      value: "2",
      color: "white",
      labelStyle: {
        color: "white",
      },
    },
    {
      id: "3",
      label: "3",
      value: "3",
      color: "white",
      labelStyle: {
        color: "white",
      },
    },
    {
      id: "4",
      label: "4",
      value: "4",
      color: "white",
      labelStyle: {
        color: "white",
      },
    },
    {
      id: "5",
      label: "5",
      value: "5",
      color: "white",
      labelStyle: {
        color: "white",
      },
    },
  ];

  return (
    <Modal visible={showModal}>
      <View
        style={{
          backgroundColor: "#262626",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>What was your focus level?</Text>

        <Controller
          control={control}
          name="focus"
          render={({ field: { onChange, onBlur, value } }) => (
            <RadioGroup
              radioButtons={radioButtons}
              selectedId={value}
              onPress={onChange}
              layout="row"
              containerStyle={{ justifyContent: "center" }}
            />
          )}
        />

        <Text style={styles.text}>What is your take away?</Text>
        <TextInputController control={control} name="tips" />

        <Pressable
          onPress={() => {
            handleSubmit(submit)();
            setShowModal(false);
          }}
          style={styles.submitBtn}
        >
          <Text
            style={{
              fontFamily: "Montserrat_400Regular",
              fontSize: 20,
              textAlign: "center",
              color: "#F4F4F3",
            }}
          >
            submit
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  study: {
    width: 40,
    height: 40,
    borderWidth: 1,
    margin: 5,
  },
  minutesTextInput: {
    width: 60,
    height: 40,
    borderWidth: 1,
    margin: 5,
    fontSize: 10,
  },
  text: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 30,
    marginTop: 20,
    marginBottom: 5,
    textAlign: "center",
    marginHorizontal: 5,
    color: "#F5F5F6",
  },
  submitBtn: {
    backgroundColor: "#152EB0",
    width: 200,
    height: 60,
    justifyContent: "center",
    borderRadius: 15,
    marginTop: 20,
  },
});
