import { router } from "expo-router"
import { useEffect } from "react"

import { useAuthSignOut } from "@domain"
import { useAuth } from "@infra"

import { Icon, ScreenHeader, useModal } from "@components"
import { Screen } from "@containers"
import { Box, Button, Text } from "@core-components"

export function ProfileScreen() {
	const { authUser } = useAuth()
	const { showModal, updateModalData, closeModal } = useModal()
	const { mutate: signOut, isPending } = useAuthSignOut({
		onSuccess: () => {
			closeModal()
			router.replace("/")
		},
	})

	useEffect(() => {
		updateModalData({ isLoading: isPending })
	}, [isPending, updateModalData])

	const userInformation = authUser
		? [
				{ label: "Nome", value: authUser.name },
				{ label: "Usuário", value: authUser.userName },
				{ label: "Empresa", value: authUser.company },
			]
		: []

	function handleSignOut() {
		showModal(
			{
				headerTitle: "Sair do aplicativo",
				BodyComponent: (
					<Box paddingHorizontal="s16">
						<Text textAlign="center">Tem certeza de que deseja sair da sua conta?</Text>
					</Box>
				),
				footerButton: {
					twoButtonFooter: {
						labelCancel: "Cancelar",
						labelConfirm: "Confirmar",
						onConfirm: () => signOut(),
					},
				},
			},
			{ isLoading: isPending },
		)
	}

	return (
		<Screen scrollable>
			<ScreenHeader title="Perfil" noMargin />

			<Box flex={1} pt="s32" pb="s24">
				<Box alignItems="center">
					<Icon name="profile" color="primary" size={80} />
				</Box>

				<Box backgroundColor="gray5" borderRadius="default" paddingHorizontal="s16" mt="s32">
					{userInformation.map(({ label, value }, index) => (
						<Box
							key={label}
							paddingVertical="s14"
							borderBottomWidth={userInformation.length - 1 === index ? 0 : 2}
							borderBottomColor="gray4"
						>
							<Text variant="title14">{label}</Text>
							<Text variant="text14" pt="s4">
								{value}
							</Text>
						</Box>
					))}
				</Box>

				<Box alignItems="center">
					<Button
						disabled={isPending}
						variant="error"
						marginTop="s32"
						paddingVertical="s14"
						paddingHorizontal="s20"
						lable="Sair do Aplicativo"
						onPress={handleSignOut}
					/>
				</Box>
			</Box>
		</Screen>
	)
}
