import { useToastServiceZustand, useToastStoreZustand } from "./useToastStore";

export type { Toast, ToastTypes } from "./useToastStore";

export function useToast(): ReturnType<typeof useToastStoreZustand> &
  ReturnType<typeof useToastServiceZustand> {
  const toastState = useToastStoreZustand();
  const toastService = useToastServiceZustand();

  return { ...toastState, ...toastService };
}
