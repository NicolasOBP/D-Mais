import { Box, Button, Text } from "@core-components"

import { Icon } from "../Icon"

export function OrderSendErrorModalBody({ errorMessage }: { errorMessage: string }) {
	return (
		<Box alignItems="center" g="s8">
			<Text variant="text16Bold" textAlign="center" color="error">
				Mensagem de erro: {errorMessage}
			</Text>
			<Icon name="errorRound" size={60} color="red" />
		</Box>
	)
}

type FooterProps = {
	backToSell: () => void
	sendToPending: () => void
}

export function OrderSendErrorModalFooter({ backToSell, sendToPending }: FooterProps) {
	return (
		<Box flexDirection="row" g="s32" paddingHorizontal="s10">
			<Button
				onPress={backToSell}
				lable="Voltar para Pedido"
				variant="primary"
				p="s8"
				flexGrow={1}
				flexShrink={1}
			/>
			<Button
				onPress={sendToPending}
				lable="Manter Pendente"
				variant="success"
				p="s8"
				flexGrow={1}
				flexShrink={1}
			/>
		</Box>
	)
}
