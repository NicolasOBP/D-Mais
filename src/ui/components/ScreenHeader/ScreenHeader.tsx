import { router } from "expo-router";

import { Box, Text } from "@core-components";

import { Icon } from "../Icon";

export function ScreenHeader({
  title,
  canGoBack,
}: {
  title: string;
  canGoBack?: boolean;
}) {
  return (
    <Box mt="s10" ml="s10" paddingHorizontal="default">
      <Text variant="title24Bold" mb="s16">
        {title}
      </Text>
      {canGoBack && (
        <Box ml="s10">
          <Icon name="arrowLeft" onPress={router.back} />
        </Box>
      )}
    </Box>
  );
}
