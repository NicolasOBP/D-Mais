import { BoxProps } from "@core-components";

import { TextInput, TextInputProps } from "../core/TextInput/TextInput";

export function LoginInput({ placeholder }: TextInputProps) {
  const boxProps: BoxProps = {
    borderColor: "gray4",
    borderRadius: "inputField",
    borderWidth: 1,
    padding: "s16",
  };

  return <TextInput boxProps={boxProps} placeholder={placeholder} />;
}
