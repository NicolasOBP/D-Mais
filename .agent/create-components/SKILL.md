---
name: create-components
description: How to create screen-specific components aligned to the current app structure.
---

# SKILL: Criação de Componentes

Use esta skill para criar componentes específicos de tela em src/ui/components, diferenciando-os dos componentes core reutilizáveis em src/ui/components/core.

## 📁 Estrutura de pastas

### Organização recomendada

```text
src/ui/components/
  ComponentName/
    ├── index.ts
    ├── ComponentName.tsx
    └── components/ (opcional)
```

Exemplos reais do projeto:

- PasswordInput
- ScreenHeader
- SearchBar
- ProductModalBody
- Toast

## ✅ Padrões do projeto

- Componentes específicos de tela ficam em src/ui/components
- Componentes reutilizáveis globais ficam em src/ui/components/core
- O componente principal deve ser exportado pelo index.ts da pasta
- O index.ts principal de src/ui/components deve usar export \* from para todos os componentes

## Estilização

- Prefira componentes do projeto em vez de elementos nativos do React Native
- Use Box, Text, Button, PressableBox, TextInput e Icon via @core-components
- Acesso ao tema via useAppTheme() de @theme
- Não use cores hardcoded, valores fixos de spacing ou borderRadius arbitrários

```tsx
import { Box, Text } from "@core-components";
import { useAppTheme } from "@theme";

export function ExampleComponent() {
  const { colors } = useAppTheme();

  return (
    <Box alignItems="center">
      <Text variant="title24Bold">Título</Text>
      <Text color={colors.text}>Descrição</Text>
    </Box>
  );
}
```

## Regras de exportação

- O index.ts do componente deve exportar apenas o componente principal
- Não exporte hooks, tipos ou subcomponentes pelo index.ts principal do componente

```ts
// ComponentName/index.ts
export { ComponentName } from "./ComponentName";
```

## Checklist

- [ ] A pasta está em src/ui/components/<ComponentName>
- [ ] O nome segue PascalCase
- [ ] Usa componentes core e aliases corretos
- [ ] Usa tema e tokens do projeto
- [ ] Exporta corretamente em src/ui/components/index.ts quando for um componente compartilhado
