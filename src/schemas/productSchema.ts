import { z } from "zod";

export const productSchema = z.object({
  volume: z
    .string({ error: "Valor inválido" })
    .regex(/^[0-9.,]+$/, "Valor inválido")
    .min(1, "Informação necessária"),
  inventory: z.string({ error: "Valor inválido" }),
});

export type ProductSchema = z.infer<typeof productSchema>;
