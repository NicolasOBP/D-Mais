import { Tabs } from "expo-router";
import React from "react";

import { useCartGetMetadata } from "@domain";

import { TabBar } from "@components";

export default function TabLayout() {
  const { data: cartMetadata, error } = useCartGetMetadata();

  function badgeNumber() {
    if (!cartMetadata) {
      return undefined;
    }

    return cartMetadata.totalItems >= 1 ? cartMetadata.totalItems : undefined;
  }

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
          tabBarBadge: badgeNumber(),
        }}
      />
      <Tabs.Screen name="sell" options={{ href: null }} />
    </Tabs>
  );
}
