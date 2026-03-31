import { useState } from "react";

import { TextInput } from "@core-components";

import { TextInputProps } from "../core/TextInput/TextInput";
import { Icon } from "../Icon/Icon";

export type PasswordInputProps = Omit<
  TextInputProps,
  "RighComponent" | "secureTextEntry"
>;

export function PasswordInput(props: PasswordInputProps) {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

  function toggleIsSecure() {
    setIsSecureTextEntry((prev) => !prev);
  }

  return (
    <TextInput
      secureTextEntry={isSecureTextEntry}
      {...props}
      RighComponent={
        <Icon
          onPress={toggleIsSecure}
          name={isSecureTextEntry ? "eyeOff" : "eyeOn"}
          color="gray1"
          size={23}
        />
      }
    />
  );
}
