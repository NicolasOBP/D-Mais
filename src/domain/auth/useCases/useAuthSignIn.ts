import { useMutation } from "@tanstack/react-query";

import { MutationOptions, useAuth, useRepository } from "@infra";

import { useToast } from "@components";

import { AuthUser } from "../AuthUser";

interface Variables {
  company: string;
  userName: string;
  password: string;
}

export function useAuthSignIn(options?: MutationOptions<AuthUser>) {
  const { auth } = useRepository();
  const { showToast } = useToast();
  const { saveAuthUser } = useAuth();

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

    onSuccess: (authUser) => {
      showToast({
        message: `Bem vindo ${authUser.name}`,
        type: "success",
      });

      saveAuthUser(authUser);

      if (options?.onSuccess) {
        options.onSuccess(authUser);
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
