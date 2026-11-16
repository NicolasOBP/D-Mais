import { useAuthCheckServer } from "@domain"
import { useServerConfigService } from "@infra"

import { type ServerConfigSchema, useServerConfigForm } from "@schemas"
import { useFormUtils } from "@utils"

import { Box, Button, Text } from "@core-components"

import { FormTextInput } from "../Form"
import { useModal } from "../Modal"

export function ServerConfigModalBody({ serverAddress }: { serverAddress: string }) {
	const { setServerAddress } = useServerConfigService()
	const { closeModal } = useModal()
	const { control, formState, handleSubmit } = useServerConfigForm(serverAddress)
	const { mutate: checkServer, isPending } = useAuthCheckServer({
		onSuccess: closeModal,
		onError: () => setServerAddress(serverAddress),
	})

	function onSubmit({ serverAddress: address }: ServerConfigSchema) {
		setServerAddress(address)
		checkServer()
	}

	return (
		<Box gap="s20">
			<FormTextInput
				control={control}
				name="serverAddress"
				label="IP e Porta"
				placeholder="ex: 192.168.0.10:8080"
				keyboardType="url"
				autoCorrect={false}
				style={{ marginLeft: -4 }}
				LeftComponent={<Text>http://</Text>}
			/>

			<Box alignSelf="center">
				<Button
					variant="primary"
					lable="Salvar"
					paddingVertical="s12"
					paddingHorizontal="s40"
					disabled={!formState.isValid || useFormUtils.isFormValid(formState) || isPending}
					isLoading={isPending}
					onPress={handleSubmit(onSubmit)}
				/>
			</Box>
		</Box>
	)
}
