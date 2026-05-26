import { useMutation } from "@tanstack/react-query";

type UseAppMutationReturn<TData, TVariables> = {
  mutate: (variable: TVariables) => TData | void;
  isPending: boolean;
  error: { message: string; cause: string | undefined } | null;
};

export type UseAppMutationOptions<TData> = {
  onSuccess?: (data: TData) => void;
  onError?: (data: { message: string; cause: string | undefined }) => void;
  errorMessage?: string;
  retry?: boolean;
};

type UseAppMutationParams<TData, TVariables> = {
  mutationFn: (variable: TVariables) => Promise<TData>;
} & UseAppMutationOptions<TData>;

export function useAppMutation<TData, TVariables>({
  mutationFn,
  onError,
  onSuccess,
  retry,
}: UseAppMutationParams<TData, TVariables>): UseAppMutationReturn<
  TData,
  TVariables
> {
  const { mutate, error, isPending } = useMutation({
    mutationFn: mutationFn,
    onSuccess,
    onError,
    retry,
  });

  return { mutate, isPending, error };
}
