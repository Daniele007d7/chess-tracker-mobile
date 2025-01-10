import { Controller } from "react-hook-form";
import { TextInput } from "react-native";

export default function TextInputController({ name, control, ...props }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          value={value}
          onBlur={onBlur}
          onChangeText={onChange}
          {...props}
        />
      )}
    />
  );
}
