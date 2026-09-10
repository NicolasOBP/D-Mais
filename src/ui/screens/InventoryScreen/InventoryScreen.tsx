import { useEffect, useRef, useState } from "react"
import { type ListRenderItemInfo, RefreshControl } from "react-native"

import { useScrollToTop } from "@react-navigation/native"
import Animated, { LinearTransition } from "react-native-reanimated"

import type { Inventory, InventoryProduct } from "@domain"
import { useInventoryFullList } from "@domain"

import { useAppTheme } from "@theme"

import { DropDownTextInput, EmptyList, LoadingListState, ScreenHeader } from "@components"
import { Screen } from "@containers"
import { Box, Text } from "@core-components"

import { InventoryScreenCard } from "./components"

export function InventoryScreen() {
	const { spacing } = useAppTheme()
	const { inventoryFullList, isLoading, refetch } = useInventoryFullList()
	const [selectedInventory, setSelectedInventory] = useState<Inventory | null>()
	const flatListRef = useRef(null)
	useScrollToTop(flatListRef)

	function renderItem({ item }: ListRenderItemInfo<InventoryProduct>) {
		return (
			<InventoryScreenCard
				product={item}
				affiliate={selectedInventory ? selectedInventory.affiliate : ""}
			/>
		)
	}

	useEffect(() => {
		setSelectedInventory(inventoryFullList ? inventoryFullList[0] : null)
	}, [inventoryFullList])

	return (
		<Screen>
			<ScreenHeader title="Consulta Estoque" />

			<Box flexDirection="row" mt="s20" g="s10">
				<Text variant="title20">Estoque</Text>

				<DropDownTextInput
					dropdownItems={inventoryFullList}
					idKey="id"
					valueKey="description"
					variant="secundary"
					showTextWithId
					textFieldStyle={{ pl: "s10", width: 220 }}
					onSelectItem={setSelectedInventory}
					searchText={
						selectedInventory ? `${selectedInventory.id} - ${selectedInventory.description}` : ""
					}
					maxHeight={150}
				/>
			</Box>

			{isLoading ? (
				<LoadingListState screen="Home" />
			) : selectedInventory ? (
				<Animated.FlatList
					data={selectedInventory.products}
					keyExtractor={(item) => item.id}
					renderItem={renderItem}
					contentContainerStyle={{
						gap: spacing.s2,
						paddingTop: spacing.s24,
						paddingBottom: spacing.s14,
					}}
					showsVerticalScrollIndicator={false}
					refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
					itemLayoutAnimation={LinearTransition.duration(500)}
					ref={flatListRef}
					ListEmptyComponent={<EmptyList desc="Nenhum produto encontrado" />}
				/>
			) : (
				<EmptyList desc="Nenhum estoque encontrado" />
			)}
		</Screen>
	)
}
