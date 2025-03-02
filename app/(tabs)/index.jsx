import { Text, View, Pressable, Modal, StyleSheet } from "react-native";

import { useState } from "react";
import StudyQuestion from "@/components/StudyQuestion";
import StepWatch from "@/components/StepWatch";

import {
  useFonts,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
  Montserrat_600SemiBold,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";

export default function Index() {
  const [fontLoaded] = useFonts({
    useFonts,
    Montserrat_700Bold,
    Montserrat_700Bold_Italic,
    Montserrat_600SemiBold,
    Montserrat_400Regular,
  });
  const [showModal, setShowModal] = useState(false);
  const [showStepWatch, setStepWatch] = useState(false);
  const [seconds, setSeconds] = useState("0");
  const [minutes, setMinutes] = useState("0");

  console.log(seconds, minutes);
  return (
    <View style={styles.homepageForm}>
      <Text style={styles.hello}>
        {showStepWatch ? "FOCUS" : "WELCOME BACK!"}
      </Text>
      <View style={styles.centerView}>
        <Pressable
          onPress={() => {
            setStepWatch(!showStepWatch);
          }}
          disabled={showStepWatch}
          style={styles.newSessionBtn}
        >
          {showStepWatch ? (
            <StepWatch
              setStepWatch={setStepWatch}
              setShowModal={setShowModal}
              seconds={seconds}
              setSeconds={setSeconds}
              minutes={minutes}
              setMinutes={setMinutes}
            />
          ) : (
            <Text style={styles.btnText}>START A NEW STUDY SESSION</Text>
          )}
        </Pressable>
      </View>

      <StudyQuestion
        minutes={minutes}
        setShowModal={setShowModal}
        showModal={showModal}
        setMinutes={setMinutes}
        setSeconds={setSeconds}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  homepageForm: {
    flex: 1,
    backgroundColor: "#3D4944",
  },
  hello: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 45,
    textAlign: "center",
    color: "#FAFBFA",
    marginTop: 10,
  },

  centerView: {
    flex: 1,
    marginTop: 140,
    alignItems: "center",
    textAlign: "center",
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
  },

  headersTitle: {
    margin: 10,
    color: "antiquewhite",
  },

  tips: {
    borderWidth: 1,
    margin: 15,
  },

  newSessionBtn: {
    backgroundColor: "#3EE44F",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 200,
    width: 250,
    height: 250,
    borderWidth: 7,
    borderColor: "#0F0F0F",
  },
  btnText: {
    fontSize: 25,
    fontFamily: "Montserrat_600SemiBold",
    color: "#F3F6F3",
  },
});
