import { ThemeColor } from "@theme";

import { ToastTypes } from "./useToast";

export const toastVariants: Record<
  ToastTypes,
  {
    backgroundColor: ThemeColor;
    borderColor: ThemeColor;
    textColor: ThemeColor;
  }
> = {
  error: {
    backgroundColor: "errorLight",
    borderColor: "error",
    textColor: "darkRed",
  },
  success: {
    backgroundColor: "successLight",
    borderColor: "success",
    textColor: "darkGreen",
  },
};
