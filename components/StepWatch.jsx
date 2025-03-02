import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import { useState } from "react";
import React from "react";

export default function StepWatch({
  seconds,
  minutes,
  setSeconds,
  setMinutes,
  setStepWatch,
  setShowModal,
}) {
  const [stopWatchId, setStopWatchId] = useState();
  const [startDate, setStartDate] = useState();
  const [isRunning, setIsRunning] = useState(false);
  const [delta, setDelta] = useState(0);

  function handleStart() {
    const date = new Date(); // tempo che è passato da quando lho stoppato
    setStartDate(date);
    setIsRunning(true);

    const id = setInterval(() => {
      const differentDate = new Date();

      const elapsedTime = differentDate - date + delta;

      setSeconds(String(Math.floor((elapsedTime / 1000) % 60)));
      setMinutes(String(Math.floor((elapsedTime / 1000 / 60) % 60)));
    }, 100);
    setStopWatchId(id);
  }

  function handleStop() {
    setIsRunning(false);
    clearInterval(stopWatchId);
    console.log(startDate);
    setDelta((prev) => {
      console.log(typeof startDate);
      return prev + (new Date() - startDate);
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.modalTime}>
        {minutes.padStart(2, "0") + ":" + seconds.padStart(2, "0")}
      </Text>

      <View
        style={{
          alignItems: "center",
        }}
      >
        <View style={styles.buttons}>
          <Pressable
            disabled={isRunning}
            onPress={handleStart}
            style={styles.modalBtn}
          >
            <Text style={styles.modalBtnText}>start</Text>
          </Pressable>
          <Pressable
            onPress={handleStop}
            style={styles.modalBtn}
            disabled={!isRunning}
          >
            <Text style={styles.modalBtnText}>stop</Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => {
            setStepWatch(false);
            setShowModal(true);

            setIsRunning(false);
            setStartDate(0);
            clearInterval(stopWatchId);
          }}
          style={styles.finishBtn}
        >
          <Text style={styles.finishBtnText}>FINISH</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalTime: {
    textAlign: "center",
    marginVertical: 40,
    fontSize: 60,
    fontFamily: "Montserrat_600SemiBold",
  },
  modalBtn: {
    marginHorizontal: 20,
    borderRadius: 200,
    backgroundColor: "#1FA462",
    padding: 20,
    width: 140,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#232222",
    borderWidth: 5,
  },
  modalBtnText: {
    fontSize: 20,
    fontFamily: "Montserrat_400Regular",
  },
  backModal: {
    padding: 10,
    backgroundColor: "#3730FD",
  },
  finishBtnText: {
    textAlign: "center",
    padding: 5,
    fontFamily: "Montserrat_400Regular",
    fontSize: 26,
  },
  finishBtn: {
    width: 200,
    height: 60,
    borderRadius: 15,
    backgroundColor: "#E93131",
    marginTop: 20,
    borderColor: "#131313",
    borderWidth: 5,
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  buttons: {
    flexDirection: "row",
    marginTop: 150,
    textAlign: "center",
  },
});
