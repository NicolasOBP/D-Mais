import { z } from "zod";

export const productSchema = z.object({
  volume: z
    .string({ error: "Valor inválido" })
    .regex(/^[0-9.,]+$/, "Valor inválido")
    .min(1, "Informação necessária"),
  inventory: z.object(
    {
      id: z.string().min(1),
      description: z.string().min(1),
    },
    { error: "Selecione um Estoque" },
  ),
});

export type ProductSchema = z.infer<typeof productSchema>;
