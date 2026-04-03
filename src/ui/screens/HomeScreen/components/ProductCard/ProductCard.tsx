import { Box, BoxProps, Button, PressableBox, Text } from "@core-components";

export interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  onAddCart?: () => void;
  containerProps?: BoxProps;
}

export function ProductCard({
  id,
  title,
  price,
  onAddCart,
  containerProps,
}: ProductCardProps) {
  const cardStyle: BoxProps = {
    backgroundColor: "background",
    borderRadius: "default",
    borderWidth: 1,
    borderColor: "primary",
  };

  const contentStyle: BoxProps = {
    padding: "s10",
    gap: "s8",
  };

  return (
    <PressableBox {...cardStyle} {...containerProps}>
      <Box {...contentStyle}>
        <Text>{title}</Text>

        <Text variant="text14" color="gray2" pb="s24">
          Preço por litro R$ {price.toFixed(2)}
        </Text>

        <Button
          variant="secondary"
          lable="Adicionar ao carrinho"
          onPress={onAddCart}
          paddingVertical="s10"
          marginHorizontal="s32"
        />
      </Box>
    </PressableBox>
  );
}
