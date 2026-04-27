import { useRouter } from "expo-router";

import { useMutation } from "@tanstack/react-query";

import { MutationOptions, useRepository } from "@infra";

import { useToast } from "@components";

import { AuthUser } from "../AuthUser";

interface Variables {
  company: string;
  userName: string;
  password: string;
}

export function useAuthSignIn(options?: MutationOptions<AuthUser>) {
  const { auth } = useRepository();
  const { navigate } = useRouter();
  const { showToast } = useToast();

  const { mutate, isError, isSuccess, isPending } = useMutation<
    AuthUser,
    { message: string; cause: string | undefined },
    Variables
  >({
    mutationFn: ({ company, password, userName }) =>
      auth.signIn(company, password, userName),
    retry: false,
    onError: (error) => {
      showToast({
        message: error.message,
        type: "error",
        description: error.cause,
        duration: 4000,
      });

      if (options?.onError) {
        options.onError(error.message);
      }
    },

    onSuccess: (authCredentials) => {
      console.log({ authCredentials });
      navigate("/home");

      if (options?.onSuccess) {
        options.onSuccess(authCredentials);
      }
    },
  });

  return {
    signIn: (variables: Variables) => mutate(variables),
    isPending,
    isSuccess,
    isError,
  };
}
