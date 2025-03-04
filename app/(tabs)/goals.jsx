import {
  View,
  Text,
  Button,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";

import {
  useFonts,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
  Montserrat_600SemiBold,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";

import { useState, useEffect } from "react";

export default function GoalScreen() {
  const [showInput, setShowInput] = useState(false);
  const [goals, setGoals] = useState("");
  const [newGoal, setNewGoal] = useState("");

  const [fontLoaded] = useFonts({
    useFonts,
    Montserrat_700Bold,
    Montserrat_700Bold_Italic,
    Montserrat_600SemiBold,
    Montserrat_400Regular,
  });

  function handleNewGoal() {
    fetch("http://10.0.2.2:3000/api/goal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        goal: newGoal,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGoals(data);
        setShowInput(false);
      });
  }

  function hanldeGoalDelete(id) {
    console.log(id);
    fetch(`http://10.0.2.2:3000/api/goal/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => setGoals(data));
  }

  function handleCompleteTask(id) {
    fetch(`http://10.0.2.2:3000/api/goal/${id}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => setGoals(data));
  }

  useEffect(() => {
    fetch("http://10.0.2.2:3000/api/goal")
      .then((response) => response.json())
      .then((data) => {
        setGoals(data);
      });
  }, []);

  function Item({ tip }) {
    return (
      <View style={styles.container}>
        <View>
          <Text
            style={{
              textDecorationLine: tip.status ? "line-through" : "none",
              color: "#FAFDFC",
              fontSize: 20,
              fontFamily: "Montserrat_400Regular",
            }}
          >
            {tip.goal}
          </Text>
        </View>

        <View>
          <Pressable
            style={[styles.deleteBtn, styles.buttons]}
            onPress={() => {
              hanldeGoalDelete(tip.ID);
            }}
          >
            <Text style={styles.btnText}>✘</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              handleCompleteTask(tip.ID);
            }}
            style={[styles.doneBtn, styles.buttons]}
          >
            <Text style={styles.btnText}>✔</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.fullContainer}>
      <Text style={styles.title}>GOALS</Text>
      <Pressable
        style={styles.addGoal}
        onPress={() => setShowInput(!showInput)}
      >
        <Text style={styles.newGoalTitle}>add a new goal</Text>
      </Pressable>

      {showInput && (
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            style={styles.textInput}
            onChangeText={(n) => setNewGoal(n)}
          />
          <Pressable style={styles.submitBtn} onPress={handleNewGoal}>
            <Text style={styles.submitBtnText}>submit</Text>
          </Pressable>
        </View>
      )}
      <FlatList
        style={{ marginBottom: 100 }}
        data={goals}
        renderItem={({ item }) => <Item tip={item} />}
        keyExtractor={(item) => item.ID}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 75,
    color: "#FAFBFA",
    marginLeft: 5,
  },
  newGoalTitle: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 25,
  },
  fullContainer: {
    flex: 1,
    backgroundColor: "#3D4944",
  },
  addGoal: {
    backgroundColor: "#C79D73",
    width: 260,
    marginHorizontal: 10,
    marginVertical: 8,
    padding: 10,
    borderRadius: 10,
    borderColor: "#0F0F0F",
    borderWidth: 3,
  },
  textInput: {
    backgroundColor: "#F5F6F3",
    borderRadius: 10,
    padding: 10,
    fontFamily: "Montserrat_400Regular",
    fontSize: 21,
    width: 270,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  container: {
    backgroundColor: "#27261F",
    borderWidth: 4,
    borderRadius: 10,
    borderColor: "#697771",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  submitBtn: {
    width: 80,
    height: 40,
    backgroundColor: "#049730",
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 10,
  },

  buttons: {
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    borderRadius: 5,
    marginTop: 5,
    height: 30,
  },
  btnText: {
    fontSize: 18,
    fontFamily: "Montserrat_400Regular",
  },

  submitBtnText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Montserrat_400Regular",
  },
  doneBtn: {
    backgroundColor: "#A2FFA4",
  },
  deleteBtn: {
    backgroundColor: "#FF5555",
  },
});
