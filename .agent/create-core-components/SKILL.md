---
name: create-core-components
description: How to create reusable core UI components for the app.
---

# SKILL: Criação de Componentes Core

Use esta skill para criar componentes reutilizáveis básicos em src/ui/components/core.

## 📁 Local de implementação

- Pasta base: src/ui/components/core
- Arquivos típicos: ComponentName/index.ts, ComponentName.tsx, optional types.ts
- Exporte o componente no arquivo src/ui/components/core/index.ts

## ✅ Padrões do projeto

- Prefira componentes do projeto em vez de elementos nativos do React Native
- Use Box, Text, Button, TextInput, PressableBox e Icon vindos de @core-components
- A estilização deve usar o tema do app via useAppTheme() e tokens de spacing/radius/colors
- Não use cores hardcoded, espaçamentos fixos ou valores arbitrários de borderRadius

## Estrutura recomendada

```tsx
// src/ui/components/core/Button/Button.tsx
import { PressableBox, PressableBoxProps } from "../Box";
import { useAppTheme } from "@theme";

export type ButtonProps = PressableBoxProps & {
  label: string;
  variant?: "primary" | "secondary";
};

export function Button({ label, variant = "primary", ...props }: ButtonProps) {
  const { colors } = useAppTheme();

  return (
    <PressableBox
      {...props}
      backgroundColor={variant === "primary" ? "primary" : "secondary"}
    >
      <Text variant="text16Bold">{label}</Text>
    </PressableBox>
  );
}
```

## Regras de exportação

- O index.ts do componente deve exportar apenas o componente principal
- O index.ts principal de core deve usar export \* from para todos os componentes

## Checklist

- [ ] Componentes ficam em src/ui/components/core
- [ ] Usa tema e tokens do projeto
- [ ] Usa aliases @core-components e @theme
- [ ] Não depende de UI específica de tela
- [ ] Exporta corretamente em src/ui/components/core/index.ts
