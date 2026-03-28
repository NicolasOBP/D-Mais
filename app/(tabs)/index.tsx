import { Screen } from "@containers";
import { Box, Text } from "@core-components";

export default function HomeScreen() {
  return (
    <Screen>
      <Box alignItems="center">
        <Text pt="s56" variant="title24Bold">
          Home Screen
        </Text>
      </Box>
    </Screen>
  );
}
