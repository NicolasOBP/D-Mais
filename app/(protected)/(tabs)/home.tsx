import { Box, Text } from "@core-components";

import { Screen } from "@containers";

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
