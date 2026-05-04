import { Box, Text } from "@core-components";

export function EmptyComponent() {
  return (
    <Box
      flexDirection="row"
      alignSelf="center"
      justifyContent="center"
      alignContent="center"
    >
      <Text variant="title16">Nenhum produto encontrado</Text>
    </Box>
  );
}
