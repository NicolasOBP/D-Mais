import { SellSchema, useSellForm } from "@schemas";
import { useFormUtils } from "@utils";

import { DropDownTextInput, FormTextInput, ScreenHeader } from "@components";
import { Screen } from "@containers";
import { Box, Button, Text } from "@core-components";

import { useSellClientList } from "../../../domain/sells/useCases/useSellClientList";

export function SellsScreen() {
  const { control, formState, handleSubmit } = useSellForm();
  const { data: clientList } = useSellClientList();

  function onSubmit(data: SellSchema) {
    console.log({ data });
    // TODO: Send sell data to API
  }

  const dropdownItems = [
    { value: "DROPDOWN 1", id: "1" },
    { value: "DROPDOWN 2", id: "2" },
    { value: "DROPDOWN 3", id: "3" },
    { value: "DROPDOWN 4", id: "4" },
    { value: "DROPDOWN 5", id: "5" },
    { value: "DROPDOWN 6", id: "6" },
    { value: "DROPDOWN 7", id: "7" },
  ];

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
              dropdownItems={dropdownItems}
              idKey="id"
              valueKey="value"
              variant="secundary"
            />
          </Box>
          <Box flex={1}>
            <DropDownTextInput
              control={control}
              name="carreta"
              label="Carreta"
              dropdownItems={dropdownItems}
              idKey="id"
              valueKey="value"
              variant="secundary"
            />
          </Box>
        </Box>

        {/* Motorista */}
        <DropDownTextInput
          control={control}
          name="motorista"
          label="Motorista"
          dropdownItems={dropdownItems}
          idKey="id"
          valueKey="value"
          variant="secundary"
        />

        {/* Transportadora */}
        <DropDownTextInput
          control={control}
          name="transportadora"
          label="Transportadora"
          dropdownItems={dropdownItems}
          idKey="id"
          valueKey="value"
          variant="secundary"
        />

        {/* Produto */}
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
