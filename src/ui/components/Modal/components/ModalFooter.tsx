import { useMemo } from "react"

import { useFormUtils } from "@utils"

import { Box, Button } from "@core-components"

import { useModal } from "../useModal"

export type ModalFooterProps = {
	oneButtonFooter?: {
		onPress: () => void
		disabled?: boolean
		label: string
	}

	twoButtonFooter?: {
		labelConfirm: string
		labelCancel: string
		onConfirm: () => void
		disabled?: boolean
	}
}

export function ModalFooter({ ...modalFooterProps }: ModalFooterProps) {
	const { modalData } = useModal()

	const isDisabled = useMemo(() => {
		if (modalData?.formState) {
			return useFormUtils.isFormValid(modalData.formState)
		}
		return modalFooterProps.oneButtonFooter?.disabled ?? false
	}, [modalData?.formState, modalFooterProps.oneButtonFooter?.disabled])

	if (modalFooterProps.twoButtonFooter) {
		return (
			<TwoButtonFooter
				{...modalFooterProps.twoButtonFooter}
				disabled={isDisabled || modalData?.isLoading}
				isLoading={modalData?.isLoading}
			/>
		)
	} else if (modalFooterProps.oneButtonFooter) {
		return (
			<OneButtonFooter
				{...modalFooterProps.oneButtonFooter}
				disabled={isDisabled || modalData.isLoading}
				isLoading={!!modalData.isLoading}
			/>
		)
	}
}

function TwoButtonFooter(props: ModalFooterProps["twoButtonFooter"] & { isLoading: boolean }) {
	const { closeModal } = useModal()

	return (
		<Box alignItems="center" flexDirection="row" justifyContent="space-around">
			<Button
				variant="error"
				lable={props!.labelCancel}
				paddingVertical="s10"
				paddingHorizontal="s24"
				onPress={closeModal}
				style={{ minWidth: 120 }}
			/>
			<Button
				variant="success"
				lable={props!.labelConfirm}
				paddingVertical="s10"
				paddingHorizontal="s24"
				onPress={props!.onConfirm}
				isLoading={props!.isLoading}
				style={{ minWidth: 120 }}
			/>
		</Box>
	)
}
function OneButtonFooter(props: ModalFooterProps["oneButtonFooter"] & { isLoading: boolean }) {
	return (
		<Box alignItems="center">
			<Button
				isLoading={props!.isLoading}
				variant="primary"
				lable={props!.label}
				paddingVertical="s10"
				paddingHorizontal="s24"
				onPress={props!.onPress}
				disabled={props!.disabled}
				style={{ minWidth: 125 }}
			/>
		</Box>
	)
}
