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

As camadas abaixo são opcionais conforme a necessidade da funcionalidade. Não crie schema, store ou repositório apenas para preencher uma sequência fixa.

### 1. Definir o domínio e os dados

Use create-domains para definir tipos, contratos de repositório e use cases quando houver regra ou acesso a dados. Operações remotas devem passar pelo repositório injetado e pelos hooks de query/mutation do app; não chame a API diretamente pela tela.

Se houver integração com o servidor, use create-api para adicionar o repositório e os adapters da API em `src/infra/repositories/adapters/api`.

### 2. Adicionar formulário ou estado compartilhado quando necessário

Use create-schemas somente para formulários ou validações estruturadas. Use create-store somente para estado compartilhado que precise sobreviver à tela ou ser acessado por múltiplas áreas:

### 3. Criar componentes e tela

Use create-components para componentes específicos de tela e create-core-components para componentes reutilizáveis base.

- componentes específicos: src/ui/components
- componentes core: src/ui/components/core

Use create-screens para implementar a tela em `src/ui/screens/<ScreenName>`. A navegação Expo Router fica em `app/`: mantenha os arquivos de rota/layout como wrappers finos que importam telas de `@screens`.

### 4. Integrar e validar

Conecte a tela ao caso de uso, query/mutation ou store necessário e integre a rota. O fluxo de dados remoto usado no app é: tela → hook de use case em `src/domain/*/useCases` → repositório injetado por `RepositoryProvider` → adapter de infraestrutura. Queries e mutations usam os wrappers compartilhados em `src/infra/useCases`.

## 🧱 Regras gerais da feature

- siga a separação atual: `app/` para rotas/layouts, `src/domain` para contratos e use cases, `src/infra` para providers/repositórios/stores e `src/ui` para telas/componentes/containers
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

## 📁 Estrutura possível

```text
app/
  (protected)/(tabs)/<route>.tsx  # wrapper que importa uma tela
src/
  domain/<feature>/
  schemas/                        # somente se houver formulário/validação
  infra/<featureStore>/           # somente se houver estado compartilhado
  ui/components/<featureComponents>/
  ui/screens/<ScreenName>/
```

## ✅ Checklist de implementação

- [ ] O domínio/use case foi definido quando há regra de negócio ou acesso a dados
- [ ] Schemas e validações foram criados quando há formulário/validação
- [ ] Store foi criado quando há estado compartilhado
- [ ] Os componentes foram adicionados com os padrões do app
- [ ] A tela está em src/ui/screens e a rota Expo Router em app/
- [ ] Queries/mutations usam os wrappers e repositórios compartilhados quando aplicável
- [ ] Os exports foram ajustados nos index.ts apropriados
- [ ] A feature está consistente com o restante da aplicação
- [ ] A validação final foi feita rodando npx tsc --noEmit
- [ ] Não rodar o Biome

## 🚫 O que evitar

- não misture regra de negócio diretamente na tela
- não crie componentes sem considerar se são core ou específicos de tela
- não ignore validação e tipagem
- não use cores, espaçamentos ou estilos hardcoded quando o tema já resolve

## 🧭 Ordem de execução recomendada

1. identificar as camadas necessárias; não criar camadas sem necessidade
2. criar contratos e use cases para regra de negócio/dados
3. criar integração de API, schema ou store somente quando necessário
4. criar componentes e tela
5. conectar a rota em app/, ajustar exports e integração
6. validar tipagem e comportamento

Essa skill é a melhor opção para criar uma feature completa de forma consistente com a arquitetura atual do projeto.
