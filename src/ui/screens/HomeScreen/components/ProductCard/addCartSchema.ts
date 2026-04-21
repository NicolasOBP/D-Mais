import { z } from "zod";

export const addCartSchema = z.object({
  volume: z
    .string({ error: "Valor inválido" })
    .regex(/^[0-9.,]+$/, "Valor inválido")
    .min(1, "Informação necessária"),
});

export type AddCartSchema = z.infer<typeof addCartSchema>;
