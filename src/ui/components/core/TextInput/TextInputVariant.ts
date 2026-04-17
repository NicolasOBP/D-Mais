import { BoxProps } from "../Box";

export type TextInputVariant = "primary" | "secundary";

export const textInputVariant: Record<TextInputVariant, BoxProps> = {
  primary: {
    borderColor: "gray4",
    borderRadius: "inputField",
    borderWidth: 1,
    padding: "s16",
  },
  secundary: {},
};
