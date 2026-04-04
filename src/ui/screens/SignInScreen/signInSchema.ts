import { z } from "zod";

export const signInSchema = z.object({
  company: z.string().min(3, "Código da empresa necessário"),
  user: z.string().min(3, "Usuário necessário"),
  password: z.string().min(1, "Senha necessária"),
});

export type SignInSchema = z.infer<typeof signInSchema>;
