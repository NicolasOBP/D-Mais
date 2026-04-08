// eslint-disable-next-line import/named
import { FormState } from "react-hook-form";

import { SignInSchema } from "./signInSchema";

type Params = {
  formState: FormState<{
    company: string;
    user: string;
    password: string;
  }>;
};

function isFormValid({ formState }: Params): boolean {
  return (
    !!formState.errors.company?.message ||
    !!formState.errors.user?.message ||
    !!formState.errors.password?.message
  );
}

function onSubmit({ company, password, user }: SignInSchema) {
  console.log({ company, password, user });
}

export const useSignInScreen = { isFormValid, onSubmit };
