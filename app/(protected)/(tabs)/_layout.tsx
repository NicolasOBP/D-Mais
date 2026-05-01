import { Tabs } from "expo-router";
import React from "react";

import { useCartTotalNumber } from "@domain";

import { TabBar } from "@components";

export default function TabLayout() {
  const { totalItens } = useCartTotalNumber();

  return (
    <Tabs
      initialRouteName="home"
      tabBar={(tab) => <TabBar {...tab} />}
      screenOptions={{
        headerShown: false,
        animation: "shift",
      }}
    >
      <Tabs.Screen name="orders" />
      <Tabs.Screen name="home" />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarBadge: totalItens ? `${totalItens}` : undefined,
        }}
      />
    </Tabs>
  );
}
