import { useState } from "react"

import {
	type PaymentTerms,
	type TablePrices,
	useSellClientList,
	useSellCompanyList,
	useSellDriverList,
	useSellPaymentMethodsList,
	useSellPaymentTermsList,
	useSellTruckPickupList,
} from "@domain"

import type { SellSchema } from "@schemas"
import { useDebounce } from "@utils"

import { Box, type BoxProps, Text } from "@core-components"

import { ControllerCheckBox } from "../ControllerCheckBox"
import { DropDownControllerInput } from "../DropDownInputs"
import { type ControllerProps, FormTextInput } from "../Form"

type Props = Pick<ControllerProps<SellSchema>, "control"> & {
	fareControl?: (variable: { isFareSelected: boolean }) => number | void
	readOnly?: boolean
	paymentTermsControl?: (variable: PaymentTerms) => void | TablePrices
}

export function SellsForm({ fareControl, paymentTermsControl, control, readOnly }: Props) {
	const [truckPlateSearch, setTruckPlateSearch] = useState("")
	const [pickupPlateSearch, setPickupPlateSearch] = useState("")
	const searchTruck = useDebounce(truckPlateSearch, undefined, 3)
	const searchPickup = useDebounce(pickupPlateSearch, undefined, 3)

	const { data: clientList, isLoading: isLoadingClient } = useSellClientList(!readOnly)
	const { data: driverList, isLoading: isLoadingDriver } = useSellDriverList(!readOnly)
	const { data: companyList, isLoading: isLoadingCompany } = useSellCompanyList(!readOnly)
	const { data: paymentMethodsList, isLoading: isLoadingPaymentMethods } =
		useSellPaymentMethodsList(!readOnly)
	const { data: paymentTermsList, isLoading: isLoadingPaymentTerms } = useSellPaymentTermsList(
		!readOnly,
	)

	const { data: truckList, isLoading: isLoadingTruck } = useSellTruckPickupList(
		!readOnly,
		searchTruck,
	)
	const { data: pickupList, isLoading: isLoadingPickup } = useSellTruckPickupList(
		!readOnly,
		searchPickup,
	)

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
							dropdownItems: paymentTermsList,
							isLoading: isLoadingPaymentTerms,
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

			<Box>
				{!readOnly && (
					<Text variant="text14" color="primary">
						Digite 3 palavras para fazer a busca das placas
					</Text>
				)}
				<Box flexDirection="row" gap="s12">
					<Box flex={1}>
						<DropDownControllerInput
							name="caminhao"
							control={control}
							label="Caminhão"
							variant="secundary"
							isRequired
							readOnly={readOnly}
							onChangeText={setTruckPlateSearch}
							dropDownProps={{
								dropdownItems: truckList,
								idKey: "id",
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
							onChangeText={setPickupPlateSearch}
							dropDownProps={{
								dropdownItems: pickupList,
								idKey: "id",
								valueKey: "licensePlate",
								isLoading: isLoadingPickup,
							}}
						/>
					</Box>
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
				extraFunction={(isFareSelected) => fareControl?.({ isFareSelected })}
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
