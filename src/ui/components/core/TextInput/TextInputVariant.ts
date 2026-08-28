import { ThemeColor } from "@theme";

import { BoxProps } from "../Box";

export type TextInputVariant = "primary" | "secundary";

export type TextInputVariantProps = Omit<
  BoxProps,
  "backgroundColor" | "borderColor"
> & {
  borderColor: ThemeColor;
  borderColorOnFocus: ThemeColor;
  backGroundColorOnFocus: ThemeColor;
  backgroundColor: ThemeColor;
};

export const textInputVariant: Record<TextInputVariant, TextInputVariantProps> =
  {
    primary: {
      backgroundColor: "background",
      borderColor: "gray4",
      borderRadius: "inputField",
      borderWidth: 1,
      padding: "s16",
      borderColorOnFocus: "gray2",
      backGroundColorOnFocus: "gray5",
    },
    secundary: {
      backgroundColor: "gray4",
      borderWidth: 1,
      borderRadius: "inputField",
      borderColor: "primary",
      padding: "s4",
      borderColorOnFocus: "primary",
      backGroundColorOnFocus: "gray3",
    },
  };
