import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { ThemeProvider } from "@shopify/restyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-native-reanimated";

import { InMemoryRepositories, RepositoryProvider } from "@infra";

import theme from "../src/ui/theme/theme";

const Routes = () => {
  const auth = true;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Protected guard={!!auth}>
        <Stack.Screen options={{ headerShown: false }} name="(protected)" />
      </Stack.Protected>
    </Stack>
  );
};

const queryClient = new QueryClient();

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
        <ThemeProvider theme={theme}>
          <Routes />
          <StatusBar style="dark" />
        </ThemeProvider>
      </RepositoryProvider>
    </QueryClientProvider>
  );
}
