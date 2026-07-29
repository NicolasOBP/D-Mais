---
name: create-feature
description: Master skill to create complete features in the app from domain to UI.
---

# SKILL: Criação de Feature Completa

Use esta skill quando for criar uma funcionalidade nova no app do zero ou evoluir uma feature existente do início ao fim.

Ela atua como um guia mestre para coordenar as skills especializadas do projeto:

- create-domains
- create-schemas
- create-store
- create-components
- create-core-components
- create-screens

## 🎯 Quando usar

Use esta skill para cenários como:

- criar uma nova tela com formulário e estado local
- adicionar uma nova funcionalidade de negócio (ex.: pedidos, vendas, carrinho)
- estruturar uma feature com domínio, validação, state, UI e navegação

## 🔄 Fluxo recomendado

### 1. Definir o domínio

Use create-domains para criar:

- tipos e interfaces
- contratos de repositório
- use cases de negócio

Estruture em src/domain/<featureName>.

### 2. Criar validações e formulário

Use create-schemas para adicionar:

- schemas Zod
- hooks de formulário com react-hook-form
- tipos inferidos do schema

Estruture em src/schemas.

### 3. Criar estado global ou compartilhado

Use create-store para adicionar:

- Zustand store
- estado inicial
- actions tipadas
- hooks de leitura/escrita

Estruture em src/infra/<featureStore>.

### 4. Criar componentes

Use create-components para componentes específicos de tela e create-core-components para componentes reutilizáveis base.

- componentes específicos: src/ui/components
- componentes core: src/ui/components/core

### 5. Criar a tela

Use create-screens para montar a tela final com:

- layout
- integração com formulário
- uso do store ou use cases
- navegação com expo-router

Estruture em src/ui/screens/<ScreenName>.

## 🧱 Regras gerais da feature

- siga a arquitetura atual do projeto: domain → schemas → infra → UI
- use os aliases do TypeScript já configurados:
  - @core-components
  - @components
  - @containers
  - @screens
  - @domain
  - @infra
  - @schemas
  - @theme
- prefira os componentes do projeto ao invés de elementos nativos do React Native
- mantenha a lógica de negócio fora da UI sempre que possível
- use tema, tokens e padrões visuais já existentes

## 🎨 Estilização com theme: o que fazer e o que evitar

### ✅ O que fazer

- use useAppTheme() para acessar o tema quando precisar de cores, spacing, borderRadius ou textVariants
- prefira componentes do projeto com props de estilo do Restyle, como Box, Text, Button e PressableBox
- use tokens do theme para espaçamento e raio, por exemplo:
  - spacing.s8, spacing.s12, spacing.s16, spacing.default
  - borderRadii.default, borderRadii.inputField, borderRadii.rounded
- use cores do tema via colors, por exemplo colors.primary, colors.text, colors.background, colors.error
- use variants de texto como title24Bold, title16, text16Bold, text12Bold quando estiver trabalhando com Text

Exemplo correto:

```tsx
import { Box, Text } from "@core-components";
import { useAppTheme } from "@theme";

export function ExampleCard() {
  const { spacing, colors, borderRadii } = useAppTheme();

  return (
    <Box
      backgroundColor="background"
      paddingHorizontal="s16"
      paddingVertical="s12"
      borderRadius="default"
    >
      <Text variant="title16" color="text">
        Exemplo
      </Text>
    </Box>
  );
}
```

### 🚫 O que evitar

- não use cores hardcoded como #fff, #000, rgba(...) quando o theme já oferece a cor
- não use valores brutais de spacing como padding: 16, margin: 8, gap: 12 quando o projeto já tem tokens
- não use borderRadius: 20 ou borderRadius: 999 diretamente, prefira borderRadii.default ou borderRadii.rounded
- não misture estilo inline com valores arbitários quando o componente já pode receber props do Restyle
- não use View, TouchableOpacity, Text do react-native diretamente quando houver equivalentes no projeto

Exemplo incorreto:

```tsx
<View style={{ backgroundColor: "#ffffff", padding: 16, borderRadius: 20 }}>
  <Text style={{ color: "#000000", fontSize: 16 }}>Exemplo</Text>
</View>
```

### 🔧 Padrão de uso no projeto

- para telas, use Screen do container e passe spacing via useAppTheme()
- para botões, use Button do core e não recrie visualmente a estrutura manualmente
- para inputs, use TextInput e FormTextInput já adaptados ao tema
- para componentes visuais, prefira Box e PressableBox com props do Restyle

## 📁 Estrutura esperada

```text
src/
  domain/<feature>/
  schemas/
  infra/<featureStore>/
  ui/components/<featureComponents>/
  ui/screens/<ScreenName>/
```

## ✅ Checklist de implementação

- [ ] O domínio foi definido
- [ ] Os schemas e validações foram criados
- [ ] O store ou estado compartilhado foi criado
- [ ] Os componentes foram adicionados com os padrões do app
- [ ] A tela foi criada e integrada
- [ ] Os exports foram ajustados nos index.ts apropriados
- [ ] A feature está consistente com o restante da aplicação
- [ ] A validação final foi feita rodando npx tsc --noEmit

## 🚫 O que evitar

- não misture regra de negócio diretamente na tela
- não crie componentes sem considerar se são core ou específicos de tela
- não ignore validação e tipagem
- não use cores, espaçamentos ou estilos hardcoded quando o tema já resolve

## 🧭 Ordem de execução recomendada

1. criar domínio
2. criar schema/form
3. criar store
4. criar componentes
5. criar tela
6. ajustar exports e integração

Essa skill é a melhor opção para criar uma feature completa de forma consistente com a arquitetura atual do projeto.
