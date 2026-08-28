import { ThemeColor } from "@theme";

import { BoxProps } from "../Box";

export type TextInputVariant = "primary" | "secundary";

type VariantProps = BoxProps & {
  borderColor: ThemeColor;
  borderColorOnFocus: ThemeColor;
};

export const textInputVariant: Record<TextInputVariant, VariantProps> = {
  primary: {
    backgroundColor: "background",
    borderColor: "gray4",
    borderRadius: "inputField",
    borderWidth: 1,
    padding: "s16",
    borderColorOnFocus: "gray2",
  },
  secundary: {
    backgroundColor: "gray4",
    borderWidth: 1,
    borderRadius: "inputField",
    borderColor: "primary",
    padding: "s4",
    borderColorOnFocus: "primary",
  },
};
