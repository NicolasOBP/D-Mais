import { Box, Button, Text } from "@core-components";

import { LoginInput } from "@components";
import { Screen } from "@containers";

export function SignInScreen() {
  return (
    <Screen>
      <Box alignItems="center">
        <Text pt="s56" variant="title24Bold">
          Login
        </Text>

        <Text pt="s46">Informe suas credenciais para acessar</Text>
      </Box>

      <Box pt="s62" pb="s80" gap="s42">
        <LoginInput placeholder="Empresa" />

        <LoginInput placeholder="Usuário" />

        <LoginInput placeholder="Senha" />
      </Box>

      <Button
        marginHorizontal="s8"
        paddingVertical="s14"
        paddingHorizontal="s20"
        lable="Entrar"
      />
    </Screen>
  );
}
