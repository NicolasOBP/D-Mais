import { useSellForm } from "@schemas";
import { isFormValid } from "@utils";

import { DropDownTextInput, FormTextInput, ScreenHeader } from "@components";
import { Screen } from "@containers";
import { Box, Button, Text } from "@core-components";

export function SellsScreen() {
  const { control, formState, handleSubmit } = useSellForm();

  function onSubmit(data: any) {
    console.log("Form submitted:", data);
    // TODO: Send sell data to API
  }

  const dropdownItens = [
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
          variant="secundary"
          dropdownItens={dropdownItens}
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
              variant="secundary"
              dropdownItens={dropdownItens}
            />
          </Box>
          <Box flex={1}>
            <DropDownTextInput
              control={control}
              name="carreta"
              label="Carreta"
              variant="secundary"
              dropdownItens={dropdownItens}
            />
          </Box>
        </Box>

        {/* Motorista */}
        <DropDownTextInput
          control={control}
          name="motorista"
          label="Motorista"
          variant="secundary"
          dropdownItens={dropdownItens}
        />

        {/* Transportadora */}
        <DropDownTextInput
          control={control}
          name="transportadora"
          label="Transportadora"
          variant="secundary"
          dropdownItens={dropdownItens}
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
          disabled={isFormValid(formState)}
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
