// eslint-disable-next-line import/named
import { FormState } from "react-hook-form";

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

export const useSignInScreen = { isFormValid };
