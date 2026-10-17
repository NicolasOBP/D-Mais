import "../ReactotronConfig"

import { useFonts } from "expo-font"
import { Stack, router } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useEffect, useRef } from "react"
import { AppState, type AppStateStatus } from "react-native"

import { ThemeProvider } from "@shopify/restyle"
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query"
import "react-native-reanimated"

import {
	AuthProvider,
	InMemoryRepositories,
	MMKVStorage,
	QueryKeys,
	RepositoryProvider,
	consumeSavedBackgroundOrderNotification,
	initializeStorage,
	saveBackgroundOrder,
	useAuth,
	useToast,
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
	const transitionQueue = useRef(Promise.resolve())
	const queryClient = useQueryClient()
	const { showToast } = useToast()
	const { showModal, closeModal } = useModal()

	useEffect(() => {
		function notifySavedBackgroundOrder() {
			return consumeSavedBackgroundOrderNotification().then(async (order) => {
				if (!order) {
					return
				}

				await queryClient.invalidateQueries({ queryKey: [QueryKeys.Orders] })
				showModal({
					headerTitle: "Venda salva no dispositivo",
					showCloseButton: false,
					BodyComponent: (
						<Box>
							<Text textAlign="center" variant="title14">
								A venda foi salva como pendente e está disponível na tela Pedidos.
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
			})
		}

		transitionQueue.current = transitionQueue.current.then(notifySavedBackgroundOrder).catch(() => {
			showToast({
				type: "error",
				message: "Não foi possível verificar se a venda foi salva.",
			})
		})

		const subscription = AppState.addEventListener("change", (nextAppState: AppStateStatus) => {
			const previousAppState = appState.current
			appState.current = nextAppState

			if (previousAppState.match(/inactive|active/) && nextAppState === "background") {
				transitionQueue.current = transitionQueue.current
					.then(async () => {
						await saveBackgroundOrder()
					})
					.catch(() => {
						showToast({
							type: "error",
							message: "Não foi possível salvar a venda no dispositivo.",
						})
					})
			}

			if (previousAppState.match(/inactive|background/) && nextAppState === "active") {
				transitionQueue.current = transitionQueue.current
					.then(notifySavedBackgroundOrder)
					.catch(() => {
						showToast({
							type: "error",
							message: "Não foi possível verificar se a venda foi salva.",
						})
					})
			}
		})

		return () => subscription.remove()
	}, [closeModal, queryClient, showModal, showToast])

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
		<QueryClientProvider client={queryClient}>
			<RepositoryProvider value={InMemoryRepositories}>
				<AuthProvider>
					<ThemeProvider theme={theme}>
						<WrapperApp>
							<AppStateMonitor />
							<StatusBar style="dark" />
							<Routes />

							<BackToSell />
							<Modal />
							<Toast />
						</WrapperApp>
					</ThemeProvider>
				</AuthProvider>
			</RepositoryProvider>
		</QueryClientProvider>
	)
}
