import type { UseFormGetValues, UseFormSetValue } from "react-hook-form"

import type { SellSchema } from "@schemas"

import { Box, type BoxProps, Text } from "@core-components"

import { ControllerCheckBox } from "../ControllerCheckBox"
import { DropDownControllerInput } from "../DropDownInputs"
import { type ControllerProps, FormTextInput } from "../Form"

import { useSellForm } from "./useSellForm"

type Props = Pick<ControllerProps<SellSchema>, "control"> & {
	getValues?: UseFormGetValues<SellSchema>
	setValue?: UseFormSetValue<SellSchema>
	handleCalculateFarePrice?: (fareSelected: boolean) => void
	readOnly?: boolean
	isTotalPricePending?: boolean
}

export function SellsForm({
	handleCalculateFarePrice,
	setValue,
	control,
	readOnly,
	isTotalPricePending,
}: Props) {
	const {
		setTruckPlateSearch,
		setPickupPlateSearch,
		setClientSearch,
		setDriverSearch,
		setCompanySearch,
		client,
		driver,
		company,
		truck,
		pickup,
		paymentTerms,
		paymentMethods,
	} = useSellForm(!readOnly)

	return (
		<Box pt="s14" pb="s20" gap="s20" paddingHorizontal="default">
			{!readOnly && (
				<Text variant="title14">Digite no mínimo 3 letras para realizar as buscas</Text>
			)}

			<DropDownControllerInput
				name="cliente"
				control={control}
				label="Cliente"
				variant="secundary"
				isRequired
				readOnly={readOnly}
				onChangeText={setClientSearch}
				placeholder="Digite o nome do Cliente"
				arrowProps={{
					isError: client.isError,
					onErrorPress: client.refetch,
					notShowArrow: true,
				}}
				dropDownProps={{
					dropdownItems: client.list,
					idKey: "rg",
					valueKey: "corporateReason",
					isLoading: client.isLoading,
					customEmptyMessage: "Digite primeiro 3 letras",
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
						arrowProps={{
							isError: paymentTerms.isError,
							onErrorPress: paymentTerms.refetch,
						}}
						dropDownProps={{
							dropdownItems: paymentTerms.list,
							isLoading: paymentTerms.isLoading,
							valueKey: "description",
							idKey: "id",
						}}
						extraFunction={(paymentTerms) =>
							setValue?.("tabela", paymentTerms.table, { shouldValidate: true })
						}
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
						arrowProps={{
							isError: paymentMethods.isError,
							onErrorPress: paymentMethods.refetch,
						}}
						dropDownProps={{
							dropdownItems: paymentMethods.list,
							isLoading: paymentMethods.isLoading,
							valueKey: "description",
							idKey: "id",
						}}
					/>
				</Box>
			</Box>

			<Box>
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
							placeholder="Digite a placa"
							arrowProps={{
								isError: truck.isError,
								onErrorPress: truck.refetch,
								notShowArrow: true,
							}}
							dropDownProps={{
								dropdownItems: truck.list,
								idKey: "id",
								valueKey: "licensePlate",
								isLoading: truck.isLoading,
								customEmptyMessage: "Digite primeiro 3 letras",
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
							placeholder="Digite a placa"
							arrowProps={{
								isError: pickup.isError,
								onErrorPress: pickup.refetch,
								notShowArrow: true,
							}}
							dropDownProps={{
								dropdownItems: pickup.list,
								idKey: "id",
								valueKey: "licensePlate",
								isLoading: pickup.isLoading,
								customEmptyMessage: "Digite primeiro 3 letras",
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
				onChangeText={setDriverSearch}
				placeholder="Digite o nome do Motorista"
				arrowProps={{
					isError: driver.isError,
					onErrorPress: driver.refetch,
					notShowArrow: true,
				}}
				dropDownProps={{
					dropdownItems: driver.list,
					idKey: "rg",
					valueKey: "name",
					isLoading: driver.isLoading,
					customEmptyMessage: "Digite primeiro 3 letras",
				}}
			/>

			<DropDownControllerInput
				name="transportadora"
				control={control}
				label="Transportadora"
				variant="secundary"
				isRequired
				readOnly={readOnly}
				onChangeText={setCompanySearch}
				placeholder="Digite o nome da Transportadora"
				arrowProps={{
					isError: company.isError,
					onErrorPress: company.refetch,
					notShowArrow: true,
				}}
				dropDownProps={{
					dropdownItems: company.list,
					idKey: "rg",
					valueKey: "name",
					isLoading: company.isLoading,
					customEmptyMessage: "Digite primeiro 3 letras",
				}}
			/>

			<ControllerCheckBox
				control={control}
				name="freteSelecionado"
				variant="rounded"
				size={20}
				extraFunction={(isFareSelected) => handleCalculateFarePrice?.(!isFareSelected)}
				pressableProps={checkBoxPressableProps}
				readOnly={readOnly}
				disabled={isTotalPricePending}
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
