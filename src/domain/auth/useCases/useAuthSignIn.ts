import { useMutation } from "@tanstack/react-query";

import { MutationOptions, useRepository } from "@infra";

import { AuthUser } from "../AuthUser";

interface Variables {
  company: string;
  userName: string;
  password: string;
}

export function useAuthSignIn(options?: MutationOptions<AuthUser>) {
  const { auth } = useRepository();

  const { mutate, isError, isSuccess, isPending } = useMutation<
    AuthUser,
    Error,
    Variables
  >({
    mutationFn: ({ company, password, userName }) =>
      auth.signIn(company, password, userName),
    retry: false,
    onError: (error) => {
      if (options?.onError) {
        options.onError(error.message);
      }
    },

    onSuccess: (authCredentials) => {
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
