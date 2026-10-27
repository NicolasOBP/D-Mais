import "../ReactotronConfig"

import { useFonts } from "expo-font"
import { Stack, router } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useEffect, useRef } from "react"
import { AppState, type AppStateStatus } from "react-native"

import { ThemeProvider } from "@shopify/restyle"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "react-native-reanimated"

import {
	AppRepositories,
	AuthProvider,
	MMKVStorage,
	RepositoryProvider,
	initializeStorage,
	useAuth,
	useBackgroundOrderService,
	useBackgroundOrderStore,
} from "@infra"

import { BackToSell, Modal, Toast, useModal } from "@components"
import { WrapperApp } from "@containers"
import { Box, Text } from "@core-components"

import theme from "../src/ui/theme/theme"

const queryClient = new QueryClient()
initializeStorage(MMKVStorage)

const Routes = () => {
	const { authUser } = useAuth()

	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Protected guard={!!authUser}>
				<Stack.Screen options={{ headerShown: false }} name="(protected)" />
			</Stack.Protected>
		</Stack>
	)
}

function AppStateMonitor() {
	const appState = useRef(AppState.currentState)
	const { showModal, closeModal } = useModal()
	const { canRun } = useBackgroundOrderStore()
	const { saveBackgroundOrder, reverseBackgroundOrder, showBackgroundNotification } =
		useBackgroundOrderService()

	useEffect(() => {
		const subscription = AppState.addEventListener("change", (nextAppState: AppStateStatus) => {
			const previousAppState = appState.current
			appState.current = nextAppState

			if (!canRun) return

			if (previousAppState.match(/inactive|active/) && nextAppState === "background") {
				void saveBackgroundOrder().catch((error) => {
					console.error("Não foi possível salvar a venda em segundo plano.", error)
				})
			}

			if (previousAppState.match(/inactive|background/) && nextAppState === "active") {
				void reverseBackgroundOrder().catch((error) => {
					console.error("Não foi possível remover o rascunho de venda.", error)
				})
			}
		})

		return () => subscription.remove()
	}, [canRun, saveBackgroundOrder, reverseBackgroundOrder])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <run once>
	useEffect(() => {
		async function showBackgroundWarnModal() {
			if (await showBackgroundNotification()) {
				showModal({
					headerTitle: "Pedido salvo no dispositivo",
					showCloseButton: false,
					BodyComponent: (
						<Box>
							<Text textAlign="center" variant="title14">
								O pedido que você estava fazendo foi salvo como pendente e está disponível na tela
								Pedidos.
							</Text>
						</Box>
					),
					footerButton: {
						oneButtonFooter: {
							label: "Ver Pedidos",
							onPress: () => {
								closeModal()
								router.push("/orders")
							},
						},
					},
				})
			}
		}

		showBackgroundWarnModal()
	}, [])

	return null
}

export default function RootLayout() {
	const [loaded] = useFonts({
		InterRegular: require("../assets/fonts/Inter_18pt-Regular.ttf"),
		InterMedium: require("../assets/fonts/Inter_18pt-Medium.ttf"),
		InterBlack: require("../assets/fonts/Inter_18pt-Black.ttf"),
		InterBold: require("../assets/fonts/Inter_18pt-Bold.ttf"),
		InterSemiBold: require("../assets/fonts/Inter_18pt-SemiBold.ttf"),
	})

	if (!loaded) {
		return null
	}

	return (
		<RepositoryProvider value={AppRepositories}>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<ThemeProvider theme={theme}>
						<WrapperApp>
							<StatusBar style="dark" />
							<Routes />

							<BackToSell />
							<Modal />
							<Toast />
							<AppStateMonitor />
						</WrapperApp>
					</ThemeProvider>
				</AuthProvider>
			</QueryClientProvider>
		</RepositoryProvider>
	)
}
