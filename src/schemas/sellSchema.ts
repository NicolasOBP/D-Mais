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
  cliente: z.object({
    id: z.string(),
    value: z.string(),
  }),
  condicaoPagamento: z.string().optional(),
  tabela: z.string().optional(),
  valorFrete: z.string().optional(),
  caminhao: z.object({
    id: z.string(),
    value: z.string(),
  }),
  carreta: z.object({
    id: z.string(),
    value: z.string(),
  }),
  motorista: z.object({
    id: z.string(),
    value: z.string(),
  }),
  transportadora: z.object({
    id: z.string(),
    value: z.string(),
  }),
  produto: z.string().min(1, "Produto é obrigatório"),
});

export type SellSchema = z.infer<typeof sellSchema>;
