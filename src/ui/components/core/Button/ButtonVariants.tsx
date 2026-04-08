import { ThemeVariants } from "@theme";

import { BoxProps } from "../Box/Box";

export type ButtonVariant = "primary" | "secondary" | "disabled";

const boxStyleDefault: BoxProps = {
  backgroundColor: "primary",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "default",
};

type VariantStyle = {
  boxStyle: BoxProps;
  textVariant?: ThemeVariants;
};

export const buttonVariants: Record<ButtonVariant, VariantStyle> = {
  primary: {
    boxStyle: boxStyleDefault,
    textVariant: "text16Bold",
  },
  secondary: {
    boxStyle: boxStyleDefault,
    textVariant: "text12Bold",
  },
  disabled: {
    boxStyle: {
      backgroundColor: "gray1",
    },
  },
};
