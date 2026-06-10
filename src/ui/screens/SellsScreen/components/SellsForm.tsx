import {
  useSellClientList,
  useSellCompanyList,
  useSellDriverList,
  useSellPickupList,
  useSellTruckList,
} from "@domain";
import { SellSchema } from "@schemas";

import { ControllerProps, DropDownTextInput, FormTextInput } from "@components";
import { Box } from "@core-components";

export function SellsForm({
  control,
}: Pick<ControllerProps<SellSchema>, "control">) {
  const { data: clientList } = useSellClientList();
  const { data: truckList } = useSellTruckList();
  const { data: driverList } = useSellDriverList();
  const { data: pickupList } = useSellPickupList();
  const { data: companyList } = useSellCompanyList();

  return (
    <Box pt="s14" pb="s20" gap="s20">
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
    </Box>
  );
}
