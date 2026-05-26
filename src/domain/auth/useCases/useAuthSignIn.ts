import {
  MutationOptions,
  useAppMutation,
  useAuth,
  useRepository,
} from "@infra";

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

  return useAppMutation<AuthUser, Variables>({
    mutationFn: ({ company, password, userName }) =>
      auth.signIn(company, password, userName),
    onSuccess: (authUser) => {
      showToast({
        message: `Bem vindo ${authUser.name}`,
        type: "success",
      });
      saveAuthUser(authUser);
      options?.onSuccess?.(authUser);
    },
    onError: (error) => {
      showToast({
        message: error.message,
        type: "error",
        description: error.cause,
        duration: 4000,
      });

      options?.onError?.(error.message);
    },
  });
}
