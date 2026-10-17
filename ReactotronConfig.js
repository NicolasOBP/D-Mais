import Reactotron from "reactotron-react-native"

if (__DEV__) {
	// biome-ignore lint/correctness/useHookAtTopLevel: <couse yes>
	Reactotron.configure().useReactNative().connect()
}
