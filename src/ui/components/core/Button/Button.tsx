import { BoxProps } from "./Box/Box";
import { PressableBox, PressableBoxProps } from "./PressableBox";
import { Text } from "./Text";

type ButtonProps = PressableBoxProps & {
  lable: string;
};

export function Button({ onPress, lable, ...buttonProps }: ButtonProps) {
  const boxStyle: BoxProps = {
    backgroundColor: "primary",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "default",
  };

  return (
    <PressableBox onPress={onPress} {...boxStyle} {...buttonProps}>
      <Text variant="text16Bold">{lable}</Text>
    </PressableBox>
  );
}
