import { router } from "expo-router"
import { Dimensions } from "react-native"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useAuthSignIn } from "@domain"

import { useFormUtils } from "@utils"

import { AppLogo, FormTextInput } from "@components"
import { Screen } from "@containers"
import { Box, Button, Text } from "@core-components"

import { type SignInSchema, signInSchema } from "./signInSchema"

const SCREEN_SIZE = Dimensions.get("screen").width
const IMAGE_SIZE = SCREEN_SIZE * 0.5

export function SignInScreen() {
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

	return (
		<Screen scrollable>
			<Box alignItems="center" g="s12">
				<Text pt="s46" variant="title24Bold">
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
