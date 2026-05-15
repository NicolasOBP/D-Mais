import { View } from "react-native";

import Animated from "react-native-reanimated";

import { useAppTheme } from "@theme";

export function HomeScreenLoading(shimmerStyle: {
  transform: {
    translateX: number;
  }[];
}) {
  const { spacing, colors, borderRadii } = useAppTheme();

  return (
    <View
      style={{
        backgroundColor: colors.background,
        borderRadius: borderRadii.default,
        borderWidth: 1,
        borderColor: colors.primary,
        padding: spacing.s10,
        gap: spacing.s16,
      }}
    >
      {/* Shimmer gradient overlay */}
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            bottom: 0,
            width: 100,
            backgroundColor: colors.loadingBackground,
            zIndex: 10,
          },
          shimmerStyle,
        ]}
      />

      {/* Title skeleton */}
      <View
        style={{
          height: 16,
          backgroundColor: colors.gray4,
          borderRadius: 8,
          marginTop: spacing.s8,
          width: "70%",
          zIndex: 1,
        }}
      />

      {/* Price skeleton */}
      <View
        style={{
          height: 14,
          backgroundColor: colors.gray4,
          borderRadius: 8,
          width: "50%",
        }}
      />

      {/* Button skeleton */}
      <View
        style={{
          height: 40,
          backgroundColor: colors.gray4,
          borderRadius: borderRadii.default,
          marginHorizontal: spacing.s32,
          marginTop: spacing.s10,
        }}
      />
    </View>
  );
}
