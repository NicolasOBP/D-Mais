import { useEffect } from "react";

import Animated, {
  Easing,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useAppTheme } from "@theme";

import { Box, Text } from "@core-components";

import { useProgressBarAnimation } from "./useProgressBarAnimation";

export type ProgressBarProps = {
  total: number;
  remaining: number;
  height?: number;
  label?: string;
};

export function ProgressBar({
  total,
  remaining,
  height = 12,
  label,
}: ProgressBarProps) {
  const { borderRadii, colors } = useAppTheme();

  const safeTotal = Math.max(total, 0);
  const safeRemaining = Math.max(remaining, 0);
  const used = Math.max(safeTotal - safeRemaining, 0);
  const percentage = safeTotal > 0 ? used / safeTotal : 0;
  const normalizedPercentage = Math.min(Math.max(percentage, 0), 1);

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(normalizedPercentage, {
      duration: 600,
      easing: Easing.out(Easing.ease),
    });
  }, [normalizedPercentage, progress]);

  const animatedStyle = useProgressBarAnimation(
    progress,
    height,
    borderRadii.default,
  );

  return (
    <Box width="100%">
      {label && (
        <Box mb="s8">
          <Text variant="title14">{label}</Text>
        </Box>
      )}

      <Box
        width="100%"
        height={height}
        backgroundColor="gray4"
        borderRadius="default"
        overflow="hidden"
        style={{
          borderWidth: 1,
          borderColor: colors.gray4,
        }}
      >
        <Animated.View
          style={[
            animatedStyle,
            {
              borderRadius: borderRadii.default,
              backgroundColor: colors.primary,
            },
          ]}
        />
      </Box>

      <Box mt="s8" alignItems="flex-end">
        <Text variant="text12" color="title">
          {Math.round(normalizedPercentage * 100)}%
        </Text>
      </Box>
    </Box>
  );
}
