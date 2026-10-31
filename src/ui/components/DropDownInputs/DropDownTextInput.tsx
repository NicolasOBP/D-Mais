import { Box, DropDown, type DropDownProps, TextInput, type TextInputProps } from "@core-components"

import { ArrowIconAnimation, type ArrowIconAnimationProps } from "./ArrowIconAnimation"
import { useDropDownInputAnimation } from "./useDropDownInputAnimation"
import { useDropDownTextInput } from "./useDropDownTextInput"

type DropDownTextInputProps<TValue> = Omit<TextInputProps, "RighComponent" | "errorMessage"> &
	Pick<
		DropDownProps<TValue>,
		| "dropdownItems"
		| "valueKey"
		| "idKey"
		| "showTextWithId"
		| "onSelectItem"
		| "searchText"
		| "maxHeight"
	> & {
		arrowProps: Pick<ArrowIconAnimationProps, "isError" | "notShowArrow" | "onErrorPress">
	}

export function DropDownTextInput<TValue>({
	variant = "primary",
	dropdownItems,
	valueKey,
	idKey,
	showTextWithId = false,
	value,
	onSelectItem,
	searchText,
	maxHeight,
	arrowProps,
	...textInputProps
}: DropDownTextInputProps<TValue>) {
	const { bodyProgress, closeDropdown, openDropdown, progress, setTopOffset, topOffset, isOpen } =
		useDropDownTextInput()

	const animatedStyle = useDropDownInputAnimation(progress)

	return (
		<Box>
			<TextInput
				variant={variant}
				value={searchText}
				RighComponent={
					<ArrowIconAnimation
						{...arrowProps}
						closeDropdown={closeDropdown}
						isOpen={isOpen}
						openDropdown={openDropdown}
						progress={progress}
					/>
				}
				onLayout={(e) => {
					setTopOffset(e.nativeEvent.layout.height)
				}}
				animatedStyle={animatedStyle}
				onFocus={openDropdown}
				onBlur={closeDropdown}
				{...textInputProps}
			/>
			<DropDown
				progress={bodyProgress}
				topOffset={topOffset}
				onSelectItem={onSelectItem}
				closeDropdown={closeDropdown}
				valueKey={valueKey}
				idKey={idKey}
				dropdownItems={dropdownItems}
				searchText={value}
				variant={variant}
				showTextWithId={showTextWithId}
				maxHeight={maxHeight}
			/>
		</Box>
	)
}
