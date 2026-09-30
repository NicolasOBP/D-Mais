import {
	type PaymentTerms,
	type TablePrices,
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
	paymentTermsControl: (variable: PaymentTerms) => void | TablePrices
}

export function SellsForm({ control, fareControl, readOnly, paymentTermsControl }: Props) {
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
				variant="secundary"
				isRequired
				readOnly={readOnly}
				dropDownProps={{
					dropdownItems: clientList,
					idKey: "cnpjCpf",
					valueKey: "corporateReason",
					isLoading: isLoadingClient,
				}}
			/>

			<Box flexDirection="row" gap="s12">
				<Box flex={2}>
					<DropDownControllerInput
						name="condicaoPagamento"
						control={control}
						label="Cond. de Pagto."
						variant="secundary"
						isRequired
						readOnly={readOnly}
						dropDownProps={{
							dropdownItems: paymentDelaysList,
							isLoading: isLoadingPaymentDelays,
							valueKey: "description",
							idKey: "id",
						}}
						extraFunction={paymentTermsControl}
					/>
				</Box>
				<Box flex={1}>
					<FormTextInput
						name="tabela"
						control={control}
						label="Tabela"
						variant="secundary"
						readOnly
					/>
				</Box>
				<Box flex={2}>
					<DropDownControllerInput
						name="formaPagamento"
						control={control}
						label="Forma de Pagto."
						variant="secundary"
						isRequired
						readOnly={readOnly}
						dropDownProps={{
							dropdownItems: paymentMethodsList,
							isLoading: isLoadingPaymentMethods,
							valueKey: "description",
							idKey: "id",
						}}
					/>
				</Box>
			</Box>

			<Box flexDirection="row" gap="s12">
				<Box flex={1}>
					<DropDownControllerInput
						name="caminhao"
						control={control}
						label="Caminhão"
						variant="secundary"
						isRequired
						readOnly={readOnly}
						dropDownProps={{
							dropdownItems: truckList,
							idKey: "licensePlate",
							valueKey: "licensePlate",
							isLoading: isLoadingTruck,
						}}
					/>
				</Box>
				<Box flex={1}>
					<DropDownControllerInput
						name="carreta"
						control={control}
						label="Carreta"
						variant="secundary"
						readOnly={readOnly}
						dropDownProps={{
							dropdownItems: pickupList,
							idKey: "licensePlate",
							valueKey: "licensePlate",
							isLoading: isLoadingPickup,
						}}
					/>
				</Box>
			</Box>

			<DropDownControllerInput
				name="motorista"
				control={control}
				label="Motorista"
				variant="secundary"
				isRequired
				readOnly={readOnly}
				dropDownProps={{
					dropdownItems: driverList,
					idKey: "cpf",
					valueKey: "name",
					isLoading: isLoadingDriver,
				}}
			/>

			<DropDownControllerInput
				name="transportadora"
				control={control}
				label="Transportadora"
				variant="secundary"
				isRequired
				readOnly={readOnly}
				dropDownProps={{
					dropdownItems: companyList,
					idKey: "cnpj",
					valueKey: "name",
					isLoading: isLoadingCompany,
				}}
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
