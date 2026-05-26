import Animated, {
  configureReanimatedLogger,
  interpolate,
  ReanimatedLogLevel,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Box } from "@core-components";

import { Icon } from "../Icon";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export function ArrowIconAnimation({
  progress,
  closeDropdown,
  isOpen,
  openDropdown,
}: {
  progress: SharedValue<number>;
  closeDropdown: () => void;
  openDropdown: () => void;
  isOpen: SharedValue<boolean>;
}) {
  const arrowAnimattion = useAnimatedStyle(() => ({
    transform: [
      { rotate: interpolate(progress.value, [0, 1], [0, -180]) + "deg" },
    ],
  }));

  function handleIconAction() {
    if (isOpen.value) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  return (
    <Box pr="s4">
      <Animated.View style={arrowAnimattion}>
        <Icon name="chevronDown" onPress={handleIconAction} />
      </Animated.View>
    </Box>
  );
}
