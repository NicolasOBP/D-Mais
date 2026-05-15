import { View } from "react-native";

import Animated from "react-native-reanimated";

import { useAppTheme } from "@theme";

export function CartScreenLoading(shimmerStyle: {
  transform: {
    translateX: number;
  }[];
}) {
  const { spacing, colors, borderRadii } = useAppTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: spacing.s12,
        marginBottom: spacing.s12,
        gap: spacing.s16,
      }}
    >
      {/* Checkbox skeleton */}
      <View
        style={{
          width: 24,
          height: 24,
          backgroundColor: colors.gray4,
          borderRadius: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={[
            {
              position: "absolute",
              top: 0,
              bottom: 0,
              width: 100,
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              zIndex: 10,
            },
            shimmerStyle,
          ]}
        />
      </View>

      {/* Details skeleton container */}
      <View
        style={{
          flex: 1,
          borderRadius: borderRadii.default,
          borderWidth: 2,
          borderColor: colors.primary,
          paddingHorizontal: spacing.s12,
          paddingVertical: spacing.s8,
          position: "relative",
          overflow: "hidden",
          minHeight: 80,
        }}
      >
        <Animated.View
          style={[
            {
              position: "absolute",
              top: 0,
              bottom: 0,
              width: 100,
              backgroundColor: "rgba(255, 255, 255, 0.4)",
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
            marginBottom: spacing.s8,
            width: "80%",
          }}
        />

        {/* Details row skeleton */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginTop: spacing.s14,
          }}
        >
          <View
            style={{
              flex: 1,
              gap: spacing.s4,
            }}
          >
            {/* Quantity skeleton */}
            <View
              style={{
                height: 12,
                backgroundColor: colors.gray4,
                borderRadius: 6,
                width: "70%",
              }}
            />

            {/* Total skeleton */}
            <View
              style={{
                height: 12,
                backgroundColor: colors.gray4,
                borderRadius: 6,
                width: "60%",
              }}
            />
          </View>

          {/* Edit icon skeleton */}
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: colors.gray4,
              borderRadius: 4,
              marginLeft: spacing.s8,
            }}
          />
        </View>
      </View>

      {/* Trash icon skeleton */}
      <View
        style={{
          width: 27,
          height: 27,
          backgroundColor: colors.gray4,
          borderRadius: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={[
            {
              position: "absolute",
              top: 0,
              bottom: 0,
              width: 100,
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              zIndex: 10,
            },
            shimmerStyle,
          ]}
        />
      </View>
    </View>
  );
}
