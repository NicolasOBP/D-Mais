import { useRouter } from "expo-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Box, Button, Text } from "@core-components";
import { useAuthSignIn } from "@domain";
import { useFeedbackService } from "@infra";
import { isFormValid } from "@utils";

import { FormTextInput } from "@components";
import { Screen } from "@containers";

import { signInSchema, SignInSchema } from "./signInSchema";

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
        <FormTextInput control={control} name="company" placeholder="Empresa" />

        <FormTextInput
          control={control}
          name="userName"
          placeholder="Usuário"
        />

        <FormTextInput
          control={control}
          name="password"
          placeholder="Senha"
          isPassword
        />
      </Box>

      <Button
        disabled={isFormValid(formState)}
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
