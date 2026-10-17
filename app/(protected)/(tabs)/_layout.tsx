import { Tabs } from "expo-router"
import { useMemo } from "react"

import { useCartGetMetadata, useOrderGetTotalOrdersInStorage } from "@domain"

import { TabBar } from "@components"

export default function TabLayout() {
	const { data: cartMetadata } = useCartGetMetadata()
	const { data: totalOrdersInStorage } = useOrderGetTotalOrdersInStorage()

	const cartBadgeNumber = useMemo(
		() =>
			cartMetadata
				? cartMetadata.totalItems >= 1
					? cartMetadata.totalItems
					: undefined
				: undefined,
		[cartMetadata],
	)

	const ordersBadgeNumber = useMemo(
		() =>
			totalOrdersInStorage
				? totalOrdersInStorage >= 1
					? totalOrdersInStorage
					: undefined
				: undefined,
		[totalOrdersInStorage],
	)

	return (
		<Tabs
			initialRouteName="home"
			tabBar={(tab) => <TabBar {...tab} />}
			screenOptions={{
				headerShown: false,
				animation: "shift",
			}}
		>
			<Tabs.Screen name="orders" options={{ tabBarBadge: ordersBadgeNumber }} />
			<Tabs.Screen name="orders/[id]" options={{ href: null }} />
			<Tabs.Screen name="home" />
			<Tabs.Screen
				name="cart"
				options={{
					tabBarBadge: cartBadgeNumber,
				}}
			/>
			<Tabs.Screen name="sell" options={{ href: null }} />
		</Tabs>
	)
}
