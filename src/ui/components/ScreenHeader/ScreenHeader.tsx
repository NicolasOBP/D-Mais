import { router } from "expo-router";

import { Box, Text } from "@core-components";

import { Icon } from "../Icon";

export function ScreenHeader({
  title,
  canGoBack,
  noMargin,
}: {
  title: string;
  canGoBack?: boolean;
  noMargin?: boolean;
}) {
  return (
    <Box mt="s10" ml={noMargin ? undefined : "s10"} paddingHorizontal="default">
      <Text variant="title24Bold">{title}</Text>
      {canGoBack && (
        <Box ml="s10" mt="s12" alignItems="flex-start">
          <Icon name="arrowLeft" onPress={router.back} hitSlop={2} />
        </Box>
      )}
    </Box>
  );
}
