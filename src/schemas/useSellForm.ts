import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { sellSchema, SellSchema } from "./sellSchema";

export function useSellForm() {
  const { control, handleSubmit, formState, reset } = useForm<SellSchema>({
    resolver: zodResolver(sellSchema),
    defaultValues: {
      cliente: { cnpjCpf: "", corporateReason: "", name: "" },
      condicaoPagamento: "",
      tabela: "",
      valorFrete: "",
      caminhao: { licensePlate: "" },
      carreta: { licensePlate: "" },
      motorista: { cpf: "", name: "" },
      transportadora: { cnpj: "", name: "" },
    },
    mode: "onChange",
  });

  return {
    control,
    handleSubmit,
    formState,
    reset,
  };
}
