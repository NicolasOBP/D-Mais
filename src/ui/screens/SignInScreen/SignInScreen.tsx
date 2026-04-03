import { useRouter } from "expo-router";

import { Box, BoxProps, Button, Text, TextInput } from "@core-components";

import { PasswordInput } from "@components";
import { Screen } from "@containers";

export function SignInScreen() {
  const { navigate } = useRouter();

  function a() {
    console.log("aasdsadaa");

    navigate("/home");
  }
  return (
    <Screen>
      <Box alignItems="center">
        <Text pt="s56" variant="title24Bold">
          Login
        </Text>

        <Text pt="s46">Informe suas credenciais para acessar</Text>
      </Box>

      <Box pt="s62" pb="s80" gap="s42">
        <TextInput boxProps={inputStyle} placeholder="Empresa" />

        <TextInput boxProps={inputStyle} placeholder="Usuário" />

        <PasswordInput boxProps={inputStyle} placeholder="Senha" />
      </Box>

      <Button
        variant="primary"
        marginHorizontal="s8"
        paddingVertical="s14"
        paddingHorizontal="s20"
        lable="Entrar"
        onPress={a}
      />
    </Screen>
  );
}

const inputStyle: BoxProps = {
  borderColor: "gray4",
  borderRadius: "inputField",
  borderWidth: 1,
  padding: "s16",
};
