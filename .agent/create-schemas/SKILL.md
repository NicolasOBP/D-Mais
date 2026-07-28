---
name: create-schemas
description: How to create validation schemas and form hooks for the app.
---

# SKILL: Criação de Schemas e Formulários

Use esta skill para criar validações com Zod e hooks de formulário para telas do app.

## 📁 Local de implementação

- Schemas: src/schemas
- Exemplo atual: sellSchema.ts, cartSchema.ts, useSellForm.ts, useProductForm.ts
- Exporte tudo em src/schemas/index.ts

## Padrões do projeto

- Crie um schema por contexto ou formulário, geralmente em arquivos como <feature>Schema.ts
- Use z.object para representar objetos e campos aninhados
- Defina o tipo inferido via z.infer<typeof schema>
- Para hooks de formulário, use react-hook-form + zodResolver

## Estrutura recomendada

```ts
import { z } from "zod";

export const sellSchema = z.object({
  cliente: z.object({
    name: z.string().min(1, "Cliente inválido"),
  }),
});

export type SellSchema = z.infer<typeof sellSchema>;
```

```ts
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useSellForm() {
  return useForm<SellSchema>({
    resolver: zodResolver(sellSchema),
    mode: "onChange",
  });
}
```

## Regras importantes

- Mensagens de erro devem ser em português e amigáveis
- Evite validação duplicada entre schema e componente
- Use defaultValues para os campos do formulário
- Se o formulário for reutilizado, encapsule a lógica em um hook em src/schemas

## Checklist

- [ ] Schema está em src/schemas
- [ ] Há um tipo inferido exportado
- [ ] O hook usa zodResolver quando necessário
- [ ] O módulo é exportado em src/schemas/index.ts
