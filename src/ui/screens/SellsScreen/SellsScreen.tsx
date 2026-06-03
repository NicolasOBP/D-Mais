import { useLocalSearchParams } from "expo-router";

import {
  useSellClientList,
  useSellCompanyList,
  useSellDriverList,
  useSellPickupList,
  useSellTruckList,
} from "@domain";
import { SellSchema, useSellForm } from "@schemas";
import { useFormUtils } from "@utils";

import { DropDownTextInput, FormTextInput, ScreenHeader } from "@components";
import { Screen } from "@containers";
import { Box, Button, Text } from "@core-components";

export function SellsScreen() {
  const params = useLocalSearchParams<{ cartItems: string }>();

  console.log(JSON.parse(params.cartItems));

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
          control={control}
          name="cliente"
          label="Cliente"
          dropdownItems={clientList}
          idKey="cnpjCpf"
          valueKey="corporateReason"
          variant="secundary"
        />

        <Box flexDirection="row" gap="s12">
          <Box flex={1}>
            <FormTextInput
              control={control}
              name="condicaoPagamento"
              label="Cond. de Pagto."
              variant="secundary"
            />
          </Box>
          <Box flex={1}>
            <FormTextInput
              control={control}
              name="tabela"
              label="Tabela"
              variant="secundary"
            />
          </Box>
          <Box flex={1}>
            <FormTextInput
              control={control}
              name="valorFrete"
              label="Valor do frete"
              keyboardType="decimal-pad"
              variant="secundary"
            />
          </Box>
        </Box>

        <Box flexDirection="row" gap="s12">
          <Box flex={1}>
            <DropDownTextInput
              control={control}
              name="caminhao"
              label="Caminhão"
              dropdownItems={truckList}
              idKey="licensePlate"
              valueKey="licensePlate"
              variant="secundary"
            />
          </Box>
          <Box flex={1}>
            <DropDownTextInput
              control={control}
              name="carreta"
              label="Carreta"
              dropdownItems={pickupList}
              idKey="licensePlate"
              valueKey="licensePlate"
              variant="secundary"
            />
          </Box>
        </Box>

        <DropDownTextInput
          control={control}
          name="motorista"
          label="Motorista"
          dropdownItems={driverList}
          idKey="cpf"
          valueKey="name"
          variant="secundary"
        />

        <DropDownTextInput
          control={control}
          name="transportadora"
          label="Transportadora"
          dropdownItems={companyList}
          idKey="cnpj"
          valueKey="name"
          variant="secundary"
        />

        <Box>
          <Text variant="title12" mb="s4">
            Produto
          </Text>
          <FormTextInput
            control={control}
            name="produto"
            multiline
            numberOfLines={8}
            boxProps={{
              minHeight: 200,
            }}
          />
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
