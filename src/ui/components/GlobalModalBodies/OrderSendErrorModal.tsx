import { errorUtils } from "@utils"

import { Box, Button, Text } from "@core-components"

import { Icon } from "../Icon"
import { useModal } from "../Modal"

export function OrderSendErrorModalBody({ errorMessage }: { errorMessage: string }) {
	return (
		<Box alignItems="center" g="s8">
			<Text variant="text16Bold" textAlign="center" color="error">
				{errorMessage}
			</Text>
			<Icon name="errorRound" size={60} color="red" />
		</Box>
	)
}

type FooterProps = {
	backToSell: () => void
	sendToPending: () => void
	errorMessage: string
}

export function OrderSendErrorModalFooter({
	backToSell,
	sendToPending,
	errorMessage,
}: FooterProps) {
	const { modalData } = useModal()
	const isLoadingPending: boolean = modalData.isLoading
	const errorAction = errorUtils.getOrderSendErrorAction(errorMessage)

	return (
		<Box flexDirection="row" g="s32" paddingHorizontal="s16">
			{errorAction !== "sendToPending" && (
				<Button
					onPress={backToSell}
					lable="Voltar para Pedido"
					variant="primary"
					p="s8"
					paddingVertical="s12"
					flexGrow={1}
					flexShrink={1}
				/>
			)}
			{errorAction !== "backToSell" && (
				<Button
					onPress={sendToPending}
					lable="Manter Pendente"
					variant={errorAction === "sendToPending" ? "primary" : "success"}
					p="s8"
					paddingVertical="s12"
					flexGrow={1}
					flexShrink={1}
					isLoading={isLoadingPending}
				/>
			)}
		</Box>
	)
}
