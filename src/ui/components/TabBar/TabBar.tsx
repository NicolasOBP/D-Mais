// eslint-disable-next-line import/named
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import { Box, PressableBox, Text } from "@core-components";

import { Icon } from "../Icon";
import { IconNames } from "../Icon/IconRegistry";

import { TabBadge } from "./components/TabBadge";

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
  cart: {
    iconFocus: "cartFill",
    iconUnfocus: "cart",
    label: "Carrinho",
  },
};

export function TabBar({ navigation, state, descriptors }: BottomTabBarProps) {
  return (
    <Box backgroundColor="background" height={50} paddingHorizontal="s16">
      <Box
        borderRadius="rounded"
        flex={1}
        borderWidth={1}
        borderColor="gray2"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-evenly"
        backgroundColor="gray5"
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { iconFocus, iconUnfocus, label } = tabBarIconMap[route.name];

          const tabBadgeNumber = descriptors[route.key].options.tabBarBadge;

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
              <TabBadge number={tabBadgeNumber} />
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
