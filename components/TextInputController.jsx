import { Controller } from "react-hook-form";
import { TextInput, StyleSheet } from "react-native";
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";

export default function TextInputController({ name, control, ...props }) {
  const [fontLoaded] = useFonts({ Montserrat_400Regular });

  return (
    <Controller
      control={control}
      name={name}
      {...props}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={styles.textInput}
          value={value}
          onBlur={onBlur}
          onChangeText={onChange}
          {...props}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 20,
    borderWidth: 1,
    margin: 10,
    borderRadius: 15,
    borderWidth: 4,
    borderColor: "#800384",
    color: "#E2E2E2",
    paddingLeft: 15,
    fontFamily: "Montserrat_400Regular",
    minWidth: 300,
  },
});
