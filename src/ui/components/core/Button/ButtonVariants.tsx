import { BoxProps } from "../Box/Box";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "disabled"
  | "success"
  | "error";

const boxStyleDefault: BoxProps = {
  backgroundColor: "primary",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "default",
};

type VariantStyle = {
  boxStyle: BoxProps;
  textVariant?: "text16Bold" | "text12Bold" | "text16Bold";
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
  error: {
    boxStyle: {
      ...boxStyleDefault,
      backgroundColor: "error",
    },
    textVariant: "text16Bold",
  },
  success: {
    boxStyle: {
      ...boxStyleDefault,
      backgroundColor: "success",
    },
    textVariant: "text16Bold",
  },
  disabled: {
    boxStyle: {
      backgroundColor: "gray1",
    },
  },
};
