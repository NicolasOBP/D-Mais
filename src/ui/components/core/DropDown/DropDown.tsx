import { useEffect, useState } from "react"
import { Keyboard, ScrollView } from "react-native"

import Animated, { type SharedValue, useSharedValue } from "react-native-reanimated"

import { type StringOrNumberKeyConstraint, useDebounce } from "@utils"

import { Box, PressableBox } from "../Box"
import { Text } from "../Text"

import { type DropDownVariant, dropDownVariant } from "./DropDownVariant"
import { useDropDownAnimation } from "./useDropDownAnimation"

export type DropDownProps<TValue> = {
	progress: SharedValue<number>
	topOffset: number
	onSelectItem: (value: TValue) => void
	closeDropdown: () => void
	dropdownItems: TValue[] | undefined
	valueKey?: StringOrNumberKeyConstraint<TValue>
	idKey?: StringOrNumberKeyConstraint<TValue>
	searchText?: string
	variant: DropDownVariant
	showTextWithId?: boolean
	isLoading?: boolean
	/** Maximum dropdown height in pixels. Defaults to 100. */
	maxHeight?: number
}

export function DropDown<TValue>({
	progress,
	topOffset,
	onSelectItem,
	closeDropdown,
	dropdownItems,
	valueKey,
	idKey,
	searchText,
	variant,
	maxHeight = 100,
	showTextWithId = false,
	isLoading,
}: DropDownProps<TValue>) {
	const [items, setItems] = useState(dropdownItems)
	const searchDebounced = useDebounce(typeof searchText === "string" ? searchText : "")
	const height = useSharedValue(0)
	const dropDownVariantStyle = dropDownVariant[variant]
	const dropDownAnimation = useDropDownAnimation(
		progress,
		height,
		dropDownVariantStyle.textInput.borderColorOnFocus,
	)

	let diffColors = true

	useEffect(() => {
		setItems(dropdownItems)
	}, [dropdownItems])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <unintended bahavior>
	useEffect(() => {
		filterItems()
	}, [searchDebounced])

	function filterItems() {
		if (searchDebounced && dropdownItems) {
			const filteredItems = dropdownItems.filter((item, index) => {
				const itemId = idKey ? String(item[idKey]) : String(index)
				const itemValue = String(
					showTextWithId
						? `${itemId} - ${valueKey ? item[valueKey] : item}`
						: valueKey
							? item[valueKey]
							: item,
				).toLowerCase()
				return itemValue.includes(searchDebounced.toLowerCase())
			})

			setItems(filteredItems.length > 0 ? filteredItems : undefined)
		} else {
			setItems(dropdownItems)
		}
	}

	return (
		<Box position="absolute" top={topOffset} style={{ width: "100%" }}>
			<Animated.View style={[dropDownAnimation, { overflow: "hidden" }]}>
				<Box
					position="absolute"
					onLayout={(e) => {
						height.value = e.nativeEvent.layout.height
					}}
					style={{ width: "100%" }}
				>
					<ScrollView
						style={{ flex: 1, maxHeight: maxHeight }}
						nestedScrollEnabled={true}
						showsVerticalScrollIndicator={false}
						keyboardShouldPersistTaps="always"
					>
						{isLoading ? (
							<Box
								flex={1}
								backgroundColor={dropDownVariantStyle.textInput.backgroundColor}
								paddingHorizontal="s8"
								paddingVertical="s4"
							>
								<Text variant="text14">Carregando...</Text>
							</Box>
						) : items ? (
							items.map((item, index) => {
								diffColors = !diffColors
								const itemId = idKey ? String(item[idKey]) : String(index)
								const itemValue = valueKey ? String(item[valueKey]) : String(item)

								const itemText = showTextWithId ? `${itemId} - ${itemValue}` : itemValue

								return (
									<PressableBox
										key={itemId}
										flex={1}
										backgroundColor={
											diffColors
												? dropDownVariantStyle.dropDown.activeBackgroundColor
												: dropDownVariantStyle.textInput.backgroundColor
										}
										paddingHorizontal="s8"
										paddingVertical="s4"
										onPress={() => {
											onSelectItem(item)
											closeDropdown()
											Keyboard.dismiss()
										}}
									>
										<Text variant="text14">{itemText}</Text>
									</PressableBox>
								)
							})
						) : (
							<Box
								flex={1}
								backgroundColor={dropDownVariantStyle.textInput.backgroundColor}
								paddingHorizontal="s8"
								paddingVertical="s4"
							>
								<Text variant="text14">Nenhum item encontrado</Text>
							</Box>
						)}
					</ScrollView>
				</Box>
			</Animated.View>
		</Box>
	)
}
