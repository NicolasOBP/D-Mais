import { create } from "zustand";

type ToastTypes = "success" | "error";

type Toast = {
  message: string;
  type: ToastTypes;
  description?: string;
  duration?: number;
};

const initialState: { toast: Toast } = {
  toast: {
    message: "",
    type: "success",
    description: "",
    duration: 2000,
  },
};

type ToastStoreType = { toast: Toast } & {
  /**
   * Default Toast duration is 2 sec
   * @returns
   */
  showToast: (toast: Toast) => void;
  closeToast: () => void;
};

export const useToast = create<ToastStoreType>()((set) => ({
  ...initialState,
  showToast: (toast) =>
    set(() => ({
      toast: {
        ...toast,
        duration: toast.duration ? toast.duration : initialState.toast.duration,
      },
    })),
  closeToast: () => set(() => initialState),
}));
