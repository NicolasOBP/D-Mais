import {
	useSellClientList,
	useSellCompanyList,
	useSellDriverList,
	useSellPickupList,
	useSellTruckList,
} from "@domain"

import type { SellSchema } from "@schemas"

import {
	ControllerCheckBox,
	type ControllerProps,
	DropDownControllerInput,
	FormTextInput,
} from "@components"
import { Box, Text } from "@core-components"

export function SellsForm({ control }: Pick<ControllerProps<SellSchema>, "control">) {
	const { data: clientList, isLoading: isLoadingClient } = useSellClientList()
	const { data: truckList, isLoading: isLoadingTruck } = useSellTruckList()
	const { data: driverList, isLoading: isLoadingDriver } = useSellDriverList()
	const { data: pickupList, isLoading: isLoadingPickup } = useSellPickupList()
	const { data: companyList, isLoading: isLoadingCompany } = useSellCompanyList()

	return (
		<Box pt="s14" pb="s20" gap="s20" paddingHorizontal="default">
			<DropDownControllerInput
				name="cliente"
				control={control}
				label="Cliente"
				dropdownItems={clientList}
				idKey="cnpjCpf"
				valueKey="corporateReason"
				variant="secundary"
				isRequired
				isLoading={isLoadingClient}
			/>

			<Box flexDirection="row" gap="s12">
				<Box flex={2}>
					<DropDownControllerInput
						name="condicaoPagamento"
						control={control}
						label="Cond. de Pagto."
						variant="secundary"
						isRequired
						dropdownItems={["1 mês", "2 meses", "3 meses"]}
					/>
				</Box>
				<Box flex={1}>
					<FormTextInput
						name="tabela"
						control={control}
						label="Tabela"
						variant="secundary"
						isRequired
					/>
				</Box>
				<Box flex={2}>
					<DropDownControllerInput
						name="formaPagamento"
						control={control}
						label="Forma de Pagto."
						variant="secundary"
						isRequired
						dropdownItems={["Crédito", "Débito", "Pix"]}
					/>
				</Box>
			</Box>

			<Box flexDirection="row" gap="s12">
				<Box flex={1}>
					<DropDownControllerInput
						name="caminhao"
						control={control}
						label="Caminhão"
						dropdownItems={truckList}
						idKey="licensePlate"
						valueKey="licensePlate"
						variant="secundary"
						isRequired
						isLoading={isLoadingTruck}
					/>
				</Box>
				<Box flex={1}>
					<DropDownControllerInput
						name="carreta"
						control={control}
						label="Carreta"
						dropdownItems={pickupList}
						idKey="licensePlate"
						valueKey="licensePlate"
						variant="secundary"
						isRequired
						isLoading={isLoadingPickup}
					/>
				</Box>
			</Box>

			<DropDownControllerInput
				name="motorista"
				control={control}
				label="Motorista"
				dropdownItems={driverList}
				idKey="cpf"
				valueKey="name"
				variant="secundary"
				isRequired
				isLoading={isLoadingDriver}
			/>

			<DropDownControllerInput
				name="transportadora"
				control={control}
				label="Transportadora"
				dropdownItems={companyList}
				idKey="cnpj"
				valueKey="name"
				variant="secundary"
				isRequired
				isLoading={isLoadingCompany}
			/>

			<ControllerCheckBox
				control={control}
				name="frete"
				variant="rounded"
				size={20}
				pressableProps={{
					flexDirection: "row",
					alignItems: "center",
					g: "s4",
					alignSelf: "flex-start",
				}}
			>
				<Text variant="title12">Adicionar Frete</Text>
			</ControllerCheckBox>
		</Box>
	)
}
