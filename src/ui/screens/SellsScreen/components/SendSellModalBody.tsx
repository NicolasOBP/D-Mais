import { Box, Text } from "@core-components";

export function SendSellModalBody() {
  return (
    <Box>
      <Text textAlign="center" variant="title14">
        Deseja realmente enviar a venda para a distribuidora?
      </Text>
      <Text textAlign="center" variant="title14">
        Ela entrará como pendente
      </Text>
    </Box>
  );
}
