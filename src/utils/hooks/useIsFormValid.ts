// eslint-disable-next-line import/named
import { FormState } from "react-hook-form";

export function isFormValid<T extends Record<string, any>>(
  formState: FormState<T>,
): boolean {
  return Object.values(formState.errors).some((error) => !!error?.message);
}
