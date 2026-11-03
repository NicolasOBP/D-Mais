import { router } from "expo-router"
import { useCallback, useEffect } from "react"
import { Dimensions } from "react-native"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useAuthSignIn } from "@domain"
import { useServerConfigStore } from "@infra"

import { useFormUtils } from "@utils"

import { AppLogo, FormTextInput, Icon, ServerConfigModalBody, useModal } from "@components"
import { Screen } from "@containers"
import { Box, Button, Text } from "@core-components"

import { type SignInSchema, signInSchema } from "./signInSchema"

const SCREEN_SIZE = Dimensions.get("screen").width
const IMAGE_SIZE = SCREEN_SIZE * 0.5

export function SignInScreen() {
	const serverAddress = useServerConfigStore((state) => state.serverAddress)
	const { showModal } = useModal()
	const { control, formState, handleSubmit } = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			company: "",
			userName: "",
			password: "",
		},
		mode: "onChange",
	})

	const { mutate: signIn, isPending } = useAuthSignIn({
		onSuccess: () => {
			router.navigate("/home")
		},
	})

	function onSubmit({ company, password, userName }: SignInSchema) {
		signIn({ company, password, userName })
	}

	const openServerConfig = useCallback(() => {
		showModal({
			headerTitle: "Configuração do Servidor",
			headerSubtitle: "Informe o IP e a Porta",
			BodyComponent: <ServerConfigModalBody serverAddress={serverAddress} />,
		})
	}, [serverAddress, showModal])

	useEffect(() => {
		if (!serverAddress.trim()) {
			openServerConfig()
		}
	}, [serverAddress, openServerConfig])

	return (
		<Screen scrollable>
			<Box alignSelf="flex-end" mt="s16" bg="gray3" p="s4" borderRadius="rounded">
				<Icon name="setting" color="primary" size={30} onPress={openServerConfig} />
			</Box>

			<Box alignItems="center" g="s12">
				<Text pt="s16" variant="title24Bold">
					Login
				</Text>

				<AppLogo size={IMAGE_SIZE} noMargin />

				<Text>Informe suas credenciais para acessar</Text>
			</Box>

			<Box pt="s62" pb="s80" gap="s42">
				<FormTextInput control={control} name="company" placeholder="Empresa" />

				<FormTextInput control={control} name="userName" placeholder="Usuário" />

				<FormTextInput control={control} name="password" placeholder="Senha" isPassword />
			</Box>

			<Button
				isLoading={isPending}
				disabled={useFormUtils.isFormValid(formState)}
				variant="primary"
				marginHorizontal="s8"
				paddingVertical="s14"
				paddingHorizontal="s20"
				lable="Entrar"
				onPress={handleSubmit(onSubmit)}
			/>
		</Screen>
	)
}
