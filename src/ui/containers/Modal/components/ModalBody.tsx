import { Box, BoxProps, TextInput } from "@core-components";

export function ModalBody() {
  return (
    <Box alignItems="center">
      <TextInput boxProps={inputStyle} placeholder="Quantidade" />
    </Box>
  );
}

const inputStyle: BoxProps = {
  borderColor: "gray4",
  borderRadius: "inputField",
  borderWidth: 1,
  padding: "s16",
  paddingHorizontal: "s32",
};
