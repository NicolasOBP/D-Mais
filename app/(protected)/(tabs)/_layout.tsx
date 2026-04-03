import { Tabs } from "expo-router";
import React from "react";

import { TabBar } from "@components";

export default function TabLayout() {
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
    </Tabs>
  );
}
