import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextInputController from "@/components/TextInputController";
import { AuthContext } from "../../components/AuthContext.jsx";
import { Slot, useRouter } from "expo-router";
import { useContext } from "react";
import { Link } from "expo-router";

export default function login() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function submit(data) {
    console.log("this is data", data);
    fetch("http://10.0.2.2:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);

        if (data) {
          router.push("/(tabs)");
        }
      });
  }

  return (
    <View style={styles.backgroundColor}>
      <Text style={styles.title}>CHESS TRACKER</Text>
      <Text style={styles.text}>SIGNUP</Text>
      <Text style={styles.formTitle}>username</Text>
      <TextInputController name="username" control={control} />
      <Text style={styles.formTitle}>password</Text>
      <TextInputController
        name="password"
        control={control}
        secureTextEntry={true}
      />
      <Pressable onPress={handleSubmit(submit)} style={styles.submitBtn}>
        <Text style={styles.submitBtnText}>submit</Text>
      </Pressable>

      <Pressable style={styles.loginBtn} onPress={() => router.push("/")}>
        <Text style={styles.signupBtnText}>or login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    marginTop: 40,
  },
  signupBtn: {
    backgroundColor: "#E44C50",
  },
  backgroundColor: {
    backgroundColor: "#262626",
    flex: 1,
  },
  text: {
    fontSize: 54,
    marginTop: 10,
    fontFamily: "Montserrat_700Bold",
    color: "#DEDEDE",
    marginLeft: 15,
    marginBottom: 30,
  },
  formTitle: {
    fontFamily: "Montserrat_700Bold_Italic",
    marginLeft: 15,
    color: "#DEDEDE",
    fontSize: 24,
  },
  submitBtnText: {
    textAlign: "center",
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 20,
    color: "DEDEDE",
  },
  loginBtn: {
    marginTop: 20,
    marginLeft: 12,
  },
  signupBtnText: {
    fontSize: 18,
    color: "#F2F3F3",
    fontFamily: "Montserrat_600SemiBold",
  },
  title: {
    fontFamily: "Montserrat_700Bold_Italic",
    fontSize: 54,
    marginVertical: 20,
    color: "#22F926",
    textAlign: "center",
  },
  submitBtn: {
    marginTop: 20,
    borderRadius: 30,
    padding: 15,
    backgroundColor: "#02DC4D",
    marginHorizontal: 15,
  },
});
