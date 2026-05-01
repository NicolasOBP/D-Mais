import { Box, Text } from "@core-components";

export function TabBadge({ number }: { number: number | string | undefined }) {
  if (!number) return null;

  return (
    <Box
      bg="primary"
      position="absolute"
      right={-12}
      top={-15}
      borderRadius="rounded"
      alignItems="center"
      justifyContent="center"
      minHeight={26}
      minWidth={26}
    >
      <Text variant="text12Bold">{number}</Text>
    </Box>
  );
}
