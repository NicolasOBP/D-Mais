import { View } from "react-native";

import Animated from "react-native-reanimated";

import { useAppTheme } from "@theme";

export function OrderScreenLoading(shimmerStyle: {
  transform: {
    translateX: number;
  }[];
}) {
  const { spacing, colors, borderRadii } = useAppTheme();

  return (
    <View
      style={{
        borderRadius: borderRadii.default,
        borderWidth: 1,
        borderColor: colors.primary,
        backgroundColor: colors.background,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            bottom: 0,
            width: 500,
            backgroundColor: colors.loadingBackground,
            zIndex: 10,
          },
          shimmerStyle,
        ]}
      />

      <View
        style={{
          paddingVertical: spacing.s4,
          paddingHorizontal: spacing.s75,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.gray4,
          width: "100%",
          height: 20,
          alignSelf: "flex-start",
          zIndex: 1,
        }}
      />

      <View
        style={{
          flex: 1,
          padding: spacing.s10,
          gap: spacing.s10,
          zIndex: 1,
        }}
      >
        <View
          style={{
            height: 16,
            backgroundColor: colors.gray4,
            borderRadius: 8,
            width: "60%",
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: spacing.s12,
          }}
        >
          <View style={{ flex: 1, gap: spacing.s6 }}>
            <View
              style={{
                height: 12,
                backgroundColor: colors.gray4,
                borderRadius: 6,
                width: "90%",
              }}
            />
            <View
              style={{
                height: 12,
                backgroundColor: colors.gray4,
                borderRadius: 6,
                width: "70%",
              }}
            />
          </View>

          <View style={{ width: 44, gap: spacing.s6 }}>
            <View
              style={{
                height: 12,
                backgroundColor: colors.gray4,
                borderRadius: 6,
                width: "100%",
              }}
            />
          </View>
        </View>

        <View
          style={{
            height: 16,
            backgroundColor: colors.gray4,
            borderRadius: 8,
            width: "40%",
            alignSelf: "flex-end",
          }}
        />
      </View>
    </View>
  );
}
