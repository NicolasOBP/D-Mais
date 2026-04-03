// eslint-disable-next-line import/named
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import { Box, PressableBox, Text } from "@core-components";

import { useAppTheme } from "@theme";

import { Icon } from "../Icon";
import { IconNames } from "../Icon/IconRegistry";

type TabBarIconMap = {
  [key: string]: {
    iconUnfocus: IconNames;
    iconFocus: IconNames;
    label: string;
  };
};

const tabBarIconMap: TabBarIconMap = {
  home: {
    iconFocus: "homeFill",
    iconUnfocus: "home",
    label: "Início",
  },
  orders: {
    iconFocus: "orderFill",
    iconUnfocus: "order",
    label: "Pedidos",
  },
};

export function TabBar({
  descriptors,
  insets,
  navigation,
  state,
}: BottomTabBarProps) {
  const { boxShadow } = useAppTheme();
  return (
    <Box
      backgroundColor="background"
      height={70}
      paddingHorizontal="s16"
      pb="s20"
    >
      <Box
        borderRadius="rounded"
        flex={1}
        borderWidth={1}
        borderColor="gray4"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-evenly"
        backgroundColor="gray5"
        style={{ boxShadow: boxShadow.primary }}
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { iconFocus, iconUnfocus, label } = tabBarIconMap[route.name];

          function onPress() {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          }

          return (
            <PressableBox key={route.key} alignItems="center" onPress={onPress}>
              <Icon
                name={isFocused ? iconFocus : iconUnfocus}
                color="primary"
              />
              <Text variant="tabBar">{label}</Text>
            </PressableBox>
          );
        })}
      </Box>
    </Box>
  );
}
