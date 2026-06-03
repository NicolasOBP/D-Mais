import { z } from "zod";

// export const sellSchema = z.object({
//   cliente: z.string().min(1, "Cliente é obrigatório"),
//   condicaoPagamento: z.string().optional(),
//   tabela: z.string().optional(),
//   valorFrete: z.string().optional(),
//   caminhao: z.string().min(1, "Caminhão é obrigatório"),
//   carreta: z.string().min(1, "Carreta é obrigatória"),
//   motorista: z.string().min(1, "Motorista é obrigatório"),
//   transportadora: z.string().min(1, "Transportadora é obrigatória"),
//   produto: z.string().min(1, "Produto é obrigatório"),
// });

export const sellSchema = z.object({
  cliente: z.object(
    {
      name: z.string().min(1, "Cliente inválido"),
      corporateReason: z.string().min(1, "Cliente inválido"),
      cnpjCpf: z.string().min(1, "Cliente inválido"),
    },
    { error: "Cliente inválido" },
  ),
  condicaoPagamento: z.string().min(1, "Campo obrigatório"),
  tabela: z.string().min(1, "Campo obrigatório"),
  valorFrete: z.string().min(1, "Campo obrigatório"),
  caminhao: z.object(
    {
      licensePlate: z.string().min(1, "Caminhão inválido"),
    },
    { error: "Caminhão inválido" },
  ),
  carreta: z.object(
    {
      licensePlate: z.string().min(1, "Carreta inválido"),
    },
    { error: "Carreta inválido" },
  ),
  motorista: z.object(
    {
      name: z.string().min(1, "Motorista inválido"),
      cpf: z.string().min(1, "Motorista inválido"),
    },
    { error: "Motorista inválido" },
  ),
  transportadora: z.object(
    {
      name: z.string().min(1, "Transportadora inválida"),
      cnpj: z.string().min(1, "Transportadora inválida"),
    },
    { error: "Transportadora inválida" },
  ),
  produto: z.string().min(1, "Produto é obrigatório"),
});

export type SellSchema = z.infer<typeof sellSchema>;
