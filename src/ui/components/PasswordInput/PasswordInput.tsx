import { useState } from "react";

import { useSharedValue, withTiming } from "react-native-reanimated";

import { TextInput, TextInputProps } from "@core-components";

import { EyeIcon } from "./components/EyeIcon";

export type PasswordInputProps = Omit<
  TextInputProps,
  "RighComponent" | "secureTextEntry"
>;

export function PasswordInput(props: PasswordInputProps) {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
  const opacityValue = useSharedValue(1);

  function toggleIsSecure() {
    opacityValue.value = withTiming(isSecureTextEntry ? 0 : 1, {
      duration: 600,
    });

    setIsSecureTextEntry((prev) => !prev);
  }

  return (
    <TextInput
      secureTextEntry={isSecureTextEntry}
      {...props}
      RighComponent={
        <EyeIcon opacityValue={opacityValue} toggleIsSecure={toggleIsSecure} />
      }
    />
  );
}
