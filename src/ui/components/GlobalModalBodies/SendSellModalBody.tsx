import { Box, Text } from "@core-components"

export function SendSellModalBody() {
	return (
		<Box gap="s12">
			<Box>
				<Text textAlign="center" variant="title14">
					Deseja realmente enviar o pedido?
				</Text>
				<Text textAlign="center" variant="title14">
					Ele entrará como pendente na Distribuidora
				</Text>
			</Box>
		</Box>
	)
}
