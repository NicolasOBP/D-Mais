import { PressableBox, PressableBoxProps } from "../Box/PressableBox";
import { Text } from "../Text/Text";

import { ButtonVariant, buttonVariants } from "./ButtonVariants";

type ButtonProps = PressableBoxProps & {
  lable: string;
  variant: ButtonVariant;
  disabled?: boolean;
};

export function Button({
  onPress,
  lable,
  variant,
  disabled,
  ...buttonProps
}: ButtonProps) {
  const boxVariant = buttonVariants[variant].boxStyle;
  const textVariant = buttonVariants[variant].textVariant;

  const disableStyle = disabled ? buttonVariants["disabled"].boxStyle : null;

  return (
    <PressableBox
      onPress={onPress}
      {...boxVariant}
      {...buttonProps}
      {...disableStyle}
      disabled={disabled}
    >
      <Text variant={textVariant}>{lable}</Text>
    </PressableBox>
  );
}
