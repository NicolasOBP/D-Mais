import { Box, Text } from "@core-components"

import { Icon } from "../../Icon"
import { useModal } from "../useModal"

type Props = {
	title?: string
	subtitle?: string
	showCloseButton?: boolean
}

export function ModalHeader({ title, subtitle, showCloseButton = true }: Props) {
	const { closeModal, modalData } = useModal()

	function handleClose() {
		modalData?.reset?.()
		closeModal()
	}

	return (
		<Box alignItems="center" justifyContent="space-between" flexDirection="row">
			<Box flexGrow={1} flexShrink={1}>
				<Text variant="title20" textAlign="center">
					{title}
				</Text>
				{subtitle && (
					<Text variant="title16" textAlign="center">
						{subtitle}
					</Text>
				)}
			</Box>
			{showCloseButton && (
				<Box alignSelf="flex-start">
					<Icon name="close" color="primary" onPress={handleClose} />
				</Box>
			)}
		</Box>
	)
}
