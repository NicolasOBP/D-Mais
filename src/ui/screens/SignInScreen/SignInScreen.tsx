import { useRouter } from "expo-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Box, BoxProps, Button, Text } from "@core-components";

import { FormTextInput } from "@components";
import { Screen } from "@containers";

import { signInSchema, SignInSchema } from "./signInSchema";
import { useSignInScreen } from "./useSignInScreen";

export function SignInScreen() {
  const { navigate } = useRouter();

  const { control, formState, handleSubmit } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      company: "",
      user: "",
      password: "",
    },
    mode: "onChange",
  });

  const { isFormValid, onSubmit } = useSignInScreen;

  return (
    <Screen>
      <Box alignItems="center">
        <Text pt="s56" variant="title24Bold">
          Login
        </Text>

        <Text pt="s46">Informe suas credenciais para acessar</Text>
      </Box>

      <Box pt="s62" pb="s80" gap="s42">
        <FormTextInput
          control={control}
          name="company"
          boxProps={inputStyle}
          placeholder="Empresa"
        />

        <FormTextInput
          control={control}
          name="user"
          boxProps={inputStyle}
          placeholder="Usuário"
        />

        <FormTextInput
          control={control}
          name="password"
          boxProps={inputStyle}
          placeholder="Usuário"
          isPassword
        />
      </Box>

      <Button
        disabled={isFormValid({ formState })}
        variant="primary"
        marginHorizontal="s8"
        paddingVertical="s14"
        paddingHorizontal="s20"
        lable="Entrar"
        onPress={handleSubmit(onSubmit)}
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
