import { Tabs } from "expo-router";
import React from "react";

import { useCartGetMetadata } from "@domain";

import { TabBar } from "@components";

export default function TabLayout() {
  const { cartMetadata } = useCartGetMetadata();

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
          tabBarBadge: cartMetadata ? `${cartMetadata.totalItems}` : undefined,
        }}
      />
    </Tabs>
  );
}
