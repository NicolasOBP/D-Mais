import { Box, Text } from "@core-components";

export function EmptyList({ desc }: { desc: string }) {
  return (
    <Box
      flexDirection="row"
      alignSelf="center"
      justifyContent="center"
      alignContent="center"
      pt="s20"
    >
      <Text variant="title16">{desc}</Text>
    </Box>
  );
}
