import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { sellSchema, SellSchema } from "./sellSchema";

export function useSellForm() {
  const { control, handleSubmit, formState, reset } = useForm<SellSchema>({
    resolver: zodResolver(sellSchema),
    defaultValues: {
      cliente: "",
      condicaoPagamento: "",
      tabela: "",
      valorFrete: "",
      caminhao: "",
      carreta: "",
      motorista: "",
      transportadora: "",
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
