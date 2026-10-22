import { useAppTheme } from "@theme"
import { useNumberFormat } from "@utils"

import { Box, Text } from "@core-components"

import { ProgressBar } from "../ProgressBar"

type SendSellModalBodyProps = {
	userLeftQuota?: number
	userQuota?: number
}

export function SendSellModalBody({ userLeftQuota, userQuota }: SendSellModalBodyProps) {
	const { spacing } = useAppTheme()
	const quota = userQuota ?? 0
	const leftQuota = userLeftQuota ?? 0

	return (
		<Box gap="s12">
			<Box>
				<ProgressBar
					total={quota}
					remaining={leftQuota}
					label={`Quota restante: ${useNumberFormat.formatNumberWithThousands(leftQuota)} L`}
					textBelowBar={`${useNumberFormat.formatNumberWithThousands(quota - leftQuota)} L usados`}
					height={18}
					style={{ marginTop: -spacing.s20 }}
				/>
			</Box>

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
