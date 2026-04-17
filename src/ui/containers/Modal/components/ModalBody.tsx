import { Box, TextInput } from "@core-components";

export function ModalBody() {
  return (
    <Box alignItems="center">
      <TextInput
        boxProps={{ width: 150 }}
        style={{ textAlign: "center" }}
        placeholder="Quantidade"
      />
    </Box>
  );
}
