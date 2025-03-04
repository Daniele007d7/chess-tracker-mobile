import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextInputController from "@/components/TextInputController";
import { AuthContext } from "../../components/AuthContext.jsx";
import { Slot, useRouter } from "expo-router";
import { useState, useContext, useEffect } from "react";
import { Link } from "expo-router";
import {
  useFonts,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";

export default function login() {
  const { setIsLogged } = useContext(AuthContext);
  const [wrongPassword, setWrongPassword] = useState();
  const router = useRouter();

  const [fontLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_700Bold_Italic,
    Montserrat_600SemiBold,
  });

  useEffect(() => {
    fetch("http://10.0.2.2:3000/api/index")
      .then((result) => result.json)
      .then((data) => console.log(data));
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function submit(data) {
    console.log("this is 1", data);
    fetch("http://10.0.2.2:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setIsLogged(data);
        if (data) {
          router.push("/(tabs)");
        } else {
          setWrongPassword(true);
        }
      });
  }

  return (
    <View style={styles.backgroundColor}>
      <View style={{ marginHorizontal: 10 }}>
        <Text style={styles.title}>CHESS TRACKER</Text>
        <Text style={styles.text}>LOGIN</Text>
        {wrongPassword && (
          <Text style={styles.wrongPassword}>WRONG PASSWORD</Text>
        )}
        <Text style={styles.formTitle}>username</Text>
        <TextInputController name="username" control={control} />
        <Text style={styles.formTitle}>password</Text>
        <TextInputController
          name="password"
          control={control}
          secureTextEntry={true}
        />

        <Pressable onPress={handleSubmit(submit)} style={styles.loginBtn}>
          <Text style={styles.submitBtnText}>submit</Text>
        </Pressable>
        <Pressable
          style={styles.signupBtn}
          onPress={() => router.push("/signup")}
        >
          <Text style={styles.signupBtnText}>or sign up</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 54,
    marginTop: 10,
    fontFamily: "Montserrat_700Bold",
    color: "#DEDEDE",

    marginBottom: 30,
  },
  backgroundColor: {
    backgroundColor: "#262626",
    flex: 1,
  },
  title: {
    fontFamily: "Montserrat_700Bold_Italic",
    fontSize: 54,
    marginVertical: 20,
    color: "#22F926",
    textAlign: "center",
  },
  formTitle: {
    fontFamily: "Montserrat_700Bold_Italic",

    color: "#DEDEDE",
    fontSize: 24,
  },
  loginBtn: {
    marginTop: 20,
    borderRadius: 30,
    padding: 15,
    backgroundColor: "#02DC4D",
  },
  submitBtnText: {
    textAlign: "center",
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 20,
    color: "DEDEDE",
  },
  signupBtn: {
    marginTop: 20,
  },
  signupBtnText: {
    fontSize: 18,
    color: "#F2F3F3",
    fontFamily: "Montserrat_600SemiBold",
  },
  wrongPassword: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 18,
    color: "#C83434",
    marginBottom: 10,
  },
});
