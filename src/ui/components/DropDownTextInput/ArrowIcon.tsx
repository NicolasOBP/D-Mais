import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Box } from "@core-components";

import { Icon } from "../Icon";

export function ArrowIcon({ progress }: { progress: SharedValue<number> }) {
  const arrowAnimattion = useAnimatedStyle(() => ({
    transform: [
      { rotate: interpolate(progress.value, [0, 1], [0, -180]) + "deg" },
    ],
  }));

  return (
    <Box pr="s4">
      <Animated.View style={arrowAnimattion}>
        <Icon name="chevronDown" />
      </Animated.View>
    </Box>
  );
}
