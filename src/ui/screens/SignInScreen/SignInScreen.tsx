import { useRouter } from "expo-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Box, BoxProps, Button, Text } from "@core-components";
import { useAuthSignIn } from "@domain";
import { useFeedbackService } from "@infra";

import { FormTextInput } from "@components";
import { Screen } from "@containers";

import { signInSchema, SignInSchema } from "./signInSchema";
import { useSignInScreen } from "./useSignInScreen";

export function SignInScreen() {
  const { send } = useFeedbackService();
  const { navigate } = useRouter();

  const { signIn } = useAuthSignIn({
    onSuccess(data) {
      console.log({ data });
      navigate("/home");
    },
    onError(message) {
      console.log({ message });

      send({ message, type: "error" });
    },
  });

  const { control, formState, handleSubmit } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      company: "",
      userName: "",
      password: "",
    },
    mode: "onChange",
  });

  const { isFormValid } = useSignInScreen;

  function onSubmit({ company, password, userName }: SignInSchema) {
    signIn({ company, password, userName });
  }

  return (
    <Screen scrollable>
      <Box alignItems="center">
        <Text pt="s46" variant="title24Bold">
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
          name="userName"
          boxProps={inputStyle}
          placeholder="Usuário"
        />

        <FormTextInput
          control={control}
          name="password"
          boxProps={inputStyle}
          placeholder="Senha"
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
