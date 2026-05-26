import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { sellSchema, SellSchema } from "./sellSchema";

export function useSellForm() {
  const { control, handleSubmit, formState, reset } = useForm<SellSchema>({
    resolver: zodResolver(sellSchema),
    defaultValues: {
      cliente: { id: "", value: "" },
      condicaoPagamento: "",
      tabela: "",
      valorFrete: "",
      caminhao: { id: "", value: "" },
      carreta: { id: "", value: "" },
      motorista: { id: "", value: "" },
      transportadora: { id: "", value: "" },
      produto: "",
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
