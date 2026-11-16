---
name: create-screens
description: How to create screen modules and their structure in the app.
---

# SKILL: Criação de Screens

Use esta skill para criar telas em src/ui/screens seguindo os padrões do app atual.

## 📁 Estrutura esperada

```text
src/ui/screens/
  ScreenName/
    ├── ScreenName.tsx
    ├── index.ts
    └── components/ (opcional)
```

## Padrões do projeto

- Cada tela deve ter um componente principal exportado pelo arquivo ScreenName.tsx
- O nome da pasta e do arquivo principal devem ser em PascalCase
- Use o container Screen de @containers para envolver o conteúdo
- Use Box, Text, Button e outros componentes do projeto em vez de View/TouchableOpacity
- Tente manter a tela enxuta: lógica de formulário, navegação e loading devem viver em hooks ou useCases
- A tela implementada fica em `src/ui/screens`; os arquivos de rota e layout do Expo Router ficam em `app/`
- Mantenha cada arquivo de rota em `app/` como wrapper fino, importando a tela pelo alias `@screens` e renderizando-a
- Para dados remotos, conecte a tela aos hooks de use case do domínio; não faça chamadas HTTP diretamente na tela

## Importações esperadas

```tsx
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Screen } from "@containers";
import { Box, Button, Text } from "@core-components";
import { FormTextInput } from "@components";
```

## Regras importantes

- Use schemas zod em src/schemas e hooks de formulário quando houver inputs
- Use hooks de domínio para operações de negócio e API
- Para telas com listagem, prefira EmptyList e LoadingListState do projeto
- Para navegação, use expo-router com router.navigate ou router.push

## Exportação

- O index.ts da pasta da tela deve exportar o componente principal
- O index.ts de src/ui/screens deve exportar a tela criada
- A rota em app/ deve importar a tela exportada de `@screens`; preserve a convenção de nomes e grupos de rota existente

## Checklist

- [ ] Screen está em src/ui/screens/<ScreenName>
- [ ] Usa Screen do container
- [ ] Usa componentes core e componentes específicos do app
- [ ] Não mistura lógica de negócio no componente
- [ ] A rota Expo Router em app/ é um wrapper e aponta para a tela em src/ui/screens
- [ ] Exporta corretamente em src/ui/screens/index.ts
