const IS_DEV = process.env.APP_VARIANT === "development"

export default {
	expo: {
		name: IS_DEV ? "D'Mais (DEV)" : "D'Mais",
		slug: "D-Mais",
		version: "1.0.0",
		orientation: "portrait",
		icon: "./assets/images/icon.png",
		scheme: "dmais",
		userInterfaceStyle: "automatic",
		newArchEnabled: true,
		ios: {
			supportsTablet: true,
		},
		android: {
			adaptiveIcon: {
				backgroundColor: "#f6e805",
				foregroundImage: "./assets/images/adaptive-icon.png",
			},
			edgeToEdgeEnabled: true,
			predictiveBackGestureEnabled: false,
			package: IS_DEV ? "com.nicolasobp.DMais.dev" : "com.nicolasobp.DMais",
		},
		web: {
			output: "static",
			favicon: "./assets/images/favicon.png",
		},
		plugins: [
			"expo-router",
			[
				"expo-splash-screen",
				{
					image: "./assets/images/splash-icon.png",
					imageWidth: 190,
					resizeMode: "contain",
					backgroundColor: "#f6e805",
				},
			],
		],
		experiments: {
			typedRoutes: true,
			reactCompiler: true,
		},
		extra: {
			router: {},
			eas: {
				projectId: "f98adbfb-c90d-4bd6-ae45-052b5e8f12e6",
			},
		},
		runtimeVersion: {
			policy: "appVersion",
		},
		updates: {
			url: "https://u.expo.dev/f98adbfb-c90d-4bd6-ae45-052b5e8f12e6",
		},
	},
}
