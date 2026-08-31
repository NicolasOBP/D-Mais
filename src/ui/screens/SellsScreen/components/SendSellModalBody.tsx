import { useAppTheme } from "@theme"
import { useNumberFormat } from "@utils"

import { ProgressBar } from "@components"
import { Box, Text } from "@core-components"

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
					Deseja realmente enviar a venda para a distribuidora?
				</Text>
				<Text textAlign="center" variant="title14">
					Ela entrará como pendente
				</Text>
			</Box>
		</Box>
	)
}
