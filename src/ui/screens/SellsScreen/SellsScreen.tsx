import { useSellForm } from "@schemas";
import { isFormValid } from "@utils";

import { FormTextInput, Icon, ScreenHeader } from "@components";
import { Screen } from "@containers";
import { Box, Button, Text } from "@core-components";

export function SellsScreen() {
  const { control, formState, handleSubmit } = useSellForm();

  function onSubmit(data: any) {
    console.log("Form submitted:", data);
    // TODO: Send sell data to API
  }

  return (
    <Screen scrollable>
      <ScreenHeader title="Venda" canGoBack noMargin />

      <Box pt="s12" pb="s80" gap="s20">
        <FormTextInput
          control={control}
          name="cliente"
          label="Cliente"
          variant="secundary"
          RighComponent={
            <Box pr="s4">
              <Icon name="chevronDown" />
            </Box>
          }
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
            <FormTextInput
              control={control}
              name="caminhao"
              label="Caminhão"
              variant="secundary"
              RighComponent={
                <Box pr="s4">
                  <Icon name="chevronDown" />
                </Box>
              }
            />
          </Box>
          <Box flex={1}>
            <FormTextInput
              control={control}
              name="carreta"
              label="Carreta"
              variant="secundary"
              RighComponent={
                <Box pr="s4">
                  <Icon name="chevronDown" />
                </Box>
              }
            />
          </Box>
        </Box>

        {/* Motorista */}
        <FormTextInput
          control={control}
          name="motorista"
          label="Motorista"
          variant="secundary"
          RighComponent={
            <Box pr="s4">
              <Icon name="chevronDown" />
            </Box>
          }
        />

        {/* Transportadora */}
        <FormTextInput
          control={control}
          name="transportadora"
          label="Transportadora"
          variant="secundary"
          RighComponent={
            <Box pr="s4">
              <Icon name="chevronDown" />
            </Box>
          }
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
