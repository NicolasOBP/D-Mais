import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { ThemeProvider } from "@shopify/restyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-native-reanimated";

import {
  AuthProvider,
  initializeStorage,
  InMemoryRepositories,
  MMKVStorage,
  RepositoryProvider,
  useAuth,
} from "@infra";

import { Toast } from "@components";
import { Modal, WrapperApp } from "@containers";

import theme from "../src/ui/theme/theme";

const queryClient = new QueryClient();
initializeStorage(MMKVStorage);

const Routes = () => {
  const { authUser } = useAuth();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Protected guard={!!authUser}>
        <Stack.Screen options={{ headerShown: false }} name="(protected)" />
      </Stack.Protected>
    </Stack>
  );
};

export default function RootLayout() {
  const [loaded] = useFonts({
    InterRegular: require("../assets/fonts/Inter_18pt-Regular.ttf"),
    InterBold: require("../assets/fonts/Inter_18pt-Bold.ttf"),
    InterSemiBold: require("../assets/fonts/Inter_18pt-SemiBold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RepositoryProvider value={InMemoryRepositories}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <WrapperApp>
              <StatusBar style="dark" translucent />
              <Routes />

              <Modal />
              <Toast />
            </WrapperApp>
          </ThemeProvider>
        </AuthProvider>
      </RepositoryProvider>
    </QueryClientProvider>
  );
}
