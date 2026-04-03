import { PressableBox, PressableBoxProps } from "../Box/PressableBox";
import { Text } from "../Text/Text";

import { ButtonVariant, buttonVariants } from "./ButtonVariants";

type ButtonProps = PressableBoxProps & {
  lable: string;
  variant: ButtonVariant;
};

export function Button({
  onPress,
  lable,
  variant,
  ...buttonProps
}: ButtonProps) {
  const boxVariant = buttonVariants[variant].boxStyle;
  // const textVariant = buttonVariants[variant].textVariant;

  return (
    <PressableBox onPress={onPress} {...boxVariant} {...buttonProps}>
      <Text variant={variant === "primary" ? "text16Bold" : "text12Bold"}>
        {lable}
      </Text>
    </PressableBox>
  );
}
