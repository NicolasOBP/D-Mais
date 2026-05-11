import { z } from "zod";

export const cartSchema = z.object({
  volume: z
    .string({ error: "Valor inválido" })
    .regex(/^[0-9.,]+$/, "Valor inválido")
    .min(1, "Informação necessária"),
});

export type CartSchema = z.infer<typeof cartSchema>;
