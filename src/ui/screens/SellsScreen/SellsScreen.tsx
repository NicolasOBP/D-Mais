import { useLocalSearchParams } from "expo-router";
import { FlatList, ScrollView } from "react-native";

import { ProductCart } from "@domain";
import { SellSchema, useSellForm } from "@schemas";
import { useAppTheme } from "@theme";
import { useFormUtils } from "@utils";

import { ScreenHeader } from "@components";
import { Screen } from "@containers";
import { Box, Button, Text } from "@core-components";

import { SellsForm } from "./components/SellsForm";
import { SellsProductCard } from "./components/SellsProductCard";

export function SellsScreen() {
  const { spacing } = useAppTheme();
  const cartItems = JSON.parse(
    useLocalSearchParams<{ cartItems: string }>().cartItems,
  ) as ProductCart[];

  const { control, formState, handleSubmit } = useSellForm();

  function onSubmit(data: SellSchema) {
    console.log({ data });
    // TODO: Send sell data to API
  }

  return (
    <Screen scrollable noHorizontalPadding>
      <ScreenHeader title="Venda" canGoBack noMargin />

      <SellsForm control={control} />

      <Box pb="s8">
        <Text variant="title12" mb="s12" paddingHorizontal="default">
          Produtos
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled={true}
          alwaysBounceVertical={false}
        >
          <FlatList
            data={cartItems}
            renderItem={({ item }) => (
              <SellsProductCard key={item.cartId} item={item} />
            )}
            keyExtractor={(item) => item.cartId.toString()}
            numColumns={Math.ceil(cartItems.length / 2)}
            contentContainerStyle={{
              gap: spacing.s12,
            }}
            style={{ paddingLeft: spacing.default, paddingRight: spacing.s8 }}
          />
        </ScrollView>
      </Box>

      <Box padding="default" paddingHorizontal="s32">
        <Button
          disabled={useFormUtils.isFormValid(formState)}
          variant="primary"
          paddingVertical="s14"
          paddingHorizontal="s20"
          lable="Enviar venda"
          onPress={handleSubmit(onSubmit)}
        />
      </Box>
    </Screen>
  );
}
