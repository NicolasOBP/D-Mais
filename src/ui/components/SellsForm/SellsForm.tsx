import {
	useSellClientList,
	useSellCompanyList,
	useSellDriverList,
	useSellPaymentDelayList,
	useSellPaymentMethodsList,
	useSellPickupList,
	useSellTruckList,
} from "@domain"

import type { SellSchema } from "@schemas"

import { Box, type BoxProps, Text } from "@core-components"

import { ControllerCheckBox } from "../ControllerCheckBox"
import { DropDownControllerInput } from "../DropDownInputs"
import { type ControllerProps, FormTextInput } from "../Form"

type Props = Pick<ControllerProps<SellSchema>, "control"> & {
	fareControl: (variable: { isFareSelected: boolean }) => number | void
	readOnly?: boolean
}

export function SellsForm({ control, fareControl, readOnly }: Props) {
	const { data: clientList, isLoading: isLoadingClient } = useSellClientList()
	const { data: truckList, isLoading: isLoadingTruck } = useSellTruckList()
	const { data: driverList, isLoading: isLoadingDriver } = useSellDriverList()
	const { data: pickupList, isLoading: isLoadingPickup } = useSellPickupList()
	const { data: companyList, isLoading: isLoadingCompany } = useSellCompanyList()
	const { data: paymentMethodsList, isLoading: isLoadingPaymentMethods } =
		useSellPaymentMethodsList()
	const { data: paymentDelaysList, isLoading: isLoadingPaymentDelays } = useSellPaymentDelayList()

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
				readOnly={readOnly}
			/>

			<Box flexDirection="row" gap="s12">
				<Box flex={2}>
					<DropDownControllerInput
						name="condicaoPagamento"
						control={control}
						label="Cond. de Pagto."
						variant="secundary"
						isRequired
						dropdownItems={paymentDelaysList}
						isLoading={isLoadingPaymentDelays}
						valueKey="description"
						idKey="id"
						readOnly={readOnly}
					/>
				</Box>
				<Box flex={1}>
					<FormTextInput
						name="tabela"
						control={control}
						label="Tabela"
						variant="secundary"
						isRequired
						readOnly={readOnly}
					/>
				</Box>
				<Box flex={2}>
					<DropDownControllerInput
						name="formaPagamento"
						control={control}
						label="Forma de Pagto."
						variant="secundary"
						isRequired
						dropdownItems={paymentMethodsList}
						isLoading={isLoadingPaymentMethods}
						valueKey="description"
						idKey="id"
						readOnly={readOnly}
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
						readOnly={readOnly}
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
						isLoading={isLoadingPickup}
						readOnly={readOnly}
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
				readOnly={readOnly}
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
				readOnly={readOnly}
			/>

			<ControllerCheckBox
				control={control}
				name="freteSelecionado"
				variant="rounded"
				size={20}
				extraFunction={(isFareSelected) => fareControl({ isFareSelected })}
				pressableProps={checkBoxPressableProps}
				readOnly={readOnly}
			>
				<Text variant="title12">Adicionar o custo do frete (com entrega)</Text>
			</ControllerCheckBox>
		</Box>
	)
}

const checkBoxPressableProps: BoxProps = {
	flexDirection: "row",
	alignItems: "center",
	g: "s4",
	alignSelf: "flex-start",
}
