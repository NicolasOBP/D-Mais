import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";

import {
  ProductCart,
  useSellClientList,
  useSellCompanyList,
  useSellDriverList,
  useSellPickupList,
  useSellTruckList,
} from "@domain";
import { SellSchema, useSellForm } from "@schemas";
import { useAppTheme } from "@theme";
import { useFormUtils } from "@utils";

import { DropDownTextInput, FormTextInput, ScreenHeader } from "@components";
import { Screen } from "@containers";
import { Box, Button, Text } from "@core-components";

import { SellsProductCard } from "./components/SellsProductCard";

export function SellsScreen() {
  const { spacing } = useAppTheme();
  const cartItems = JSON.parse(
    useLocalSearchParams<{ cartItems: string }>().cartItems,
  ) as ProductCart[];

  const { control, formState, handleSubmit } = useSellForm();
  const { data: clientList } = useSellClientList();
  const { data: truckList } = useSellTruckList();
  const { data: driverList } = useSellDriverList();
  const { data: pickupList } = useSellPickupList();
  const { data: companyList } = useSellCompanyList();

  function onSubmit(data: SellSchema) {
    console.log({ data });
    // TODO: Send sell data to API
  }

  return (
    <Screen scrollable>
      <ScreenHeader title="Venda" canGoBack noMargin />

      <Box pt="s14" pb="s80" gap="s20">
        <DropDownTextInput
          name="cliente"
          control={control}
          label="Cliente"
          dropdownItems={clientList}
          idKey="cnpjCpf"
          valueKey="corporateReason"
          variant="secundary"
        />

        <Box flexDirection="row" gap="s12">
          <Box flex={1}>
            <FormTextInput
              name="condicaoPagamento"
              control={control}
              label="Cond. de Pagto."
              variant="secundary"
            />
          </Box>
          <Box flex={1}>
            <FormTextInput
              name="tabela"
              control={control}
              label="Tabela"
              variant="secundary"
            />
          </Box>
          <Box flex={1}>
            <FormTextInput
              name="valorFrete"
              control={control}
              label="Valor do frete"
              keyboardType="decimal-pad"
              variant="secundary"
            />
          </Box>
        </Box>

        <Box flexDirection="row" gap="s12">
          <Box flex={1}>
            <DropDownTextInput
              name="caminhao"
              control={control}
              label="Caminhão"
              dropdownItems={truckList}
              idKey="licensePlate"
              valueKey="licensePlate"
              variant="secundary"
            />
          </Box>
          <Box flex={1}>
            <DropDownTextInput
              name="carreta"
              control={control}
              label="Carreta"
              dropdownItems={pickupList}
              idKey="licensePlate"
              valueKey="licensePlate"
              variant="secundary"
            />
          </Box>
        </Box>

        <DropDownTextInput
          name="motorista"
          control={control}
          label="Motorista"
          dropdownItems={driverList}
          idKey="cpf"
          valueKey="name"
          variant="secundary"
        />

        <DropDownTextInput
          name="transportadora"
          control={control}
          label="Transportadora"
          dropdownItems={companyList}
          idKey="cnpj"
          valueKey="name"
          variant="secundary"
        />

        <Box>
          <Text variant="title12" mb="s12">
            Produtos
          </Text>
          <ScrollView
            style={{ maxHeight: 300 }}
            contentContainerStyle={{ gap: spacing.s8 }}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            {cartItems.map((item) => (
              <SellsProductCard key={item.cartId} item={item} />
            ))}
          </ScrollView>
        </Box>
      </Box>

      <Box position="absolute" bottom={0} left={0} right={0} padding="default">
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
