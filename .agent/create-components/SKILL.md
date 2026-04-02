---
name: create-components
description: How to create components.
---

# SKILL: Criação de Componentes

Este guia documenta os padrões e boas práticas para criação de componentes comuns em telas específicas do projeto, diferenciando-os dos componentes `core` (reutilizáveis globalmente) e `containers` (wrappers de layout).

## 📁 Estrutura de Pastas

### Nomenclatura e Organização

Cada componente deve seguir esta estrutura dentro de `src/ui/components/`:

```
ComponentName/
├── index.ts
├── ComponentName.tsx
├── styles.ts
├── types.ts (opcional)
└── useComponentName.ts (opcional - para lógica complexa)
```

**Regras de nomenclatura:**

- **Pasta**: `PascalCase` (ex: `PasswordInput`, `EyeIcon`)
- **Arquivo principal**: Mesmo nome da pasta (ex: `PasswordInput.tsx`)
- **Hook customizado**: Prefixo `use` + nome do componente (ex: `usePasswordInput.ts`)

### Exemplo Real do Projeto

```
  components/
    ├── index.ts
    ├── PasswordInput/
    │   ├── index.ts
    │   ├── PasswordInput.tsx
    │   ├── components/
    │        ├── EyeIcon.tsx (sub-componente)
    ├── Icon/
        ├── index.ts
        ├── Icon.tsx
        ├── iconRegistry.ts (types)
```

---

## 📤 Padrões de Export

### 1. Export do Componente (index.ts)

Cada componente deve ter seu próprio `index.ts` exportando **apenas o componente principal**:

```typescript
// ComponentName/index.ts
export { ComponentName } from "./ComponentName";
```

**❌ Não fazer:**

```typescript
// Não exportar types, hooks ou sub-componentes pelo index.ts
export { ComponentName } from "./ComponentName";
export * from "./types"; // ❌
export * from "./useComponentName"; // ❌
```

### 2. Export do Index Principal (components/index.ts)

O `index.ts` da pasta `components` deve usar **export \* from** para todos os componentes:

```typescript
// src/ui/components/core/index.ts
export * from "./Box";
export * from "./Button";
export * from "./Text";
export * from "./TextInput";
```

**Benefício:** Permite importação direta como:

```typescript
import { Box, BoxProps, Button, Text, TextInput } from "@core-components";
```

---

## 🎨 Sistema de Estilização

### 1. Estrutura do Arquivo styles.ts

O projeto está usando a biblioteca restyle, então sempe que for acessar o tema lembre de olhar `src/theme`.

**SEMPRE** use componentes que use o theme, que estão dentro de `src/ui/components/core`:

```typescript
import { Box, BoxProps, Button, Text, TextInput } from "@core-components";
  <Box alignItems="center">
    <Text pt="s56" variant="title24Bold">
      Login
    </Text>

    <Text pt="s46">Informe suas credenciais para acessar</Text>
  </Box>
```

### 2. Uso de Tokens

#### Spacings

Sempre use os tokens de `spacings` para consistência:

```typescript

// Disponíveis:
spacing: {
    s2: 2,
    s4: 4,
    s8: 8,
    s10: 10,
    s12: 12,
    s14: 14,
    s16: 16,
    s20: 20,
    s24: 24,
    s32: 32,
    s40: 40,
    s42: 42,
    s46: 46,
    s48: 48,
    s56: 56,
    s62: 62,
    s80: 80,
    default: 16,
  },

// Exemplo de uso:
<Text pt="s46">Informe suas credenciais para acessar</Text>

<Button
  marginHorizontal="s8"
  paddingVertical="s14"
  paddingHorizontal="s20"
  lable="Entrar"
/>
```

#### Border Radius

Use os tokens de `radius` para arredondamento:

```typescript
import { radius } from "../../../../theme/tokens/sizes"

// Disponíveis:
borderRadii: {
  default: 16, //16 pixels
  inputField: 12, //12 pixels
  rounded: 500, //totalmente arredondado
},

// Exemplo de uso:
{
  borderRadius: "inputField",
  borderRadius: "default",
}
```

### 3. Sistema de Cores (Theme)

As cores **SEMPRE** devem vir do `theme`, nunca hardcoded:

```typescript
  // Primary colors
    primary: palette.blue,
    primaryLight: palette.lightBlue,

    // Secondary colors
    secondary: palette.carrot,
    secondaryLight: palette.carrotLight,

    // Status colors
    success: palette.green,
    successLight: palette.lightGreen,
    error: palette.red,
    errorLight: palette.lightRed,

    // Neutral/Background colors
    background: palette.white,
    backgroundContrast: palette.black,

    // Text colors
    title: palette.blue,
    text: palette.black,
    contrastPrimary: palette.white,
    tabBar: palette.blue,
```

### 4. Caso precisar colocar style direto em um componente, usar o hook useAppTheme() para usar o tema

```typescript
import {
  TextInput as RNTextInput,
} from "react-native";

import { useAppTheme } from "@theme";

const { textVariants, colors } = useAppTheme();

<RNTextInput
  style={[
    textVariants.defaults,
    { padding: 0, margin: 0, flexGrow: 1, flexShrink: 1 },
  ]}
  placeholderTextColor={colors.gray2}
  {...textInputProps}
/>
```

---

## 📝 Sistema de Tipagem

### 1. Padrão Inline

```typescript
// TextInput.tsx
export interface TextInputProps extends RNTextInputProps {
  label?: string;
  errorMessage?: string;
  RighComponent?: React.ReactElement;
  boxProps?: BoxProps;
}

export function TextInput({
  boxProps,
  label,
  errorMessage,
  RighComponent,
  ...textInputProps
}: TextInputProps) {
  //...
}
```

### 2. Enums para Estados

Use **enums** para estados/status do componente:

```typescript
// types.ts
export enum EWorkoutStatus {
  empty = "empty",
  start = "start",
  resume = "resume",
  finished = "finished",
}
```

---

## 🎯 Uso de Componentes Core

### Componentes Core Disponíveis

Os componentes `core` são a base para construir componentes comuns. **SEMPRE** use-os ao invés de componentes nativos do React Native:

#### 1. Text

```typescript
import { Text } from "@core-components";

// Uso:
<Text variant="title24Bold">Título</Text>
<Text variant="title24">Título Semi-Bold</Text>
<Text variant="title20">Subtítulo</Text>
<Text variant="title16">Subtítulo</Text>
<Text variant="title12">Subtítulo</Text>
<Text variant="text16Bold">Texto comum com bold</Text>
<Text variant="text12">Texto pequenos</Text>
<Text variant="text12Bold">Texto pequenos com bold</Text>
<Text variant="text10">Texto muito pequeno</Text>


```

**Variants disponíveis:**

- `title24Bold`, `title24`, `title20`
- `title16`, `title12`, `text16Bold`
- `text12`, `text12Bold`, `text10`, `tabBar`

#### 2. PressableBox

```typescript
import { PressableBox } from "@core-components";

// Uso:
<PressableBox onPress={handlePress}>
  <Text variant="text12Bold">Ver mais</Text>
</PressableBox>

// Com estilo:
<PressableBox
  onPress={handlePress}
  {...pressableStyle}
>
  <Icon name="eyeOn" />
</PressableBox>

const pressableStyle: BoxProps = {
    backgroundColor: "primary",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "default",
  };
```

#### 3. Icon

```typescript
import { Icon } from "@components";

// Uso básico:
<Icon name="eyeOn" size={14} />
<Icon name="eyeOff" color="gray2"/>

// Com pressable:
<Icon
  onPress={handlePress}
  name="eyeOff"
  size={26}
/>
```

**Propriedades:**

- `name`: Nome do ícone (string)
- `size`: Tamanho em pixels (number)
- `onPress`: Função para torná-lo clicável
- `color`: Cor do ícone, vindos do theme

---

## 🔧 Hooks Customizados

### Quando Criar um Hook

Crie um hook customizado quando o componente tiver:

- Lógica de estado complexa
- Múltiplas funções auxiliares
- Cálculos ou transformações de dados
- Regras de negócio específicas

### Estrutura do Hook

```typescript
// useComponentName.ts
import { useState } from "react";
import { Icon } from "../../../../components/core/Icon/IconTypes";

export const useComponentName = () => {
  // Estados
  const [state, setState] = useState(initialValue);

  // Cálculos
  const computedValue = calculateSomething();

  // Funções auxiliares
  const handleAction = () => {
    // lógica
  };

  // Retorna states e actions organizados
  return {
    states: {
      state,
      computedValue,
    },
    actions: {
      handleAction,
    },
  };
};
```

### Exemplo Real (useCardCalendar)

```typescript
// useCardCalendar.ts
import { Icon } from "../../../../components/core/Icon/IconTypes";
import { EWorkoutStatus } from "./types";

export const useCardCalendar = () => {
  // Cálculo dos dias da semana
  const currentWeekDaysNumber = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.getDate().toString();
  }).reverse();

  const weekDaysNames = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date
      .toLocaleDateString("pt-BR", { weekday: "short" })
      .replace(".", "");
  }).reverse();

  const currentDayActive = new Date().getDate();
  let workoutStatus: EWorkoutStatus = EWorkoutStatus.empty;

  // Funções auxiliares
  const isCurrentDay = (day: string) => {
    return day === currentDayActive.toString();
  };

  const handleWorkoutStatus = () => {
    let title = "";
    let iconName: Icon.Names = "dumbbells";
    let onPress: (() => void) | undefined = undefined;

    if (workoutStatus === EWorkoutStatus.empty) {
      title = "Criar treino";
      iconName = "dumbbells";
      onPress = () => {
        // Lógica para criar treino
      };
    }
    // ... outras condições

    return { title, iconName, onPress };
  };

  return {
    states: {
      currentWeekDaysNumber,
      weekDaysNames,
    },
    actions: {
      isCurrentDay,
      handleWorkoutStatus,
    },
  };
};
```

### Uso no Componente

```typescript
// CardCalendar.tsx
import { useCardCalendar } from "./useCardCalendar"

export const CardCalendar = () => {
  const { states, actions } = useCardCalendar()

  return (
    <View>
      {states.currentWeekDaysNumber.map((day, index) => (
        <View
          key={day}
          style={[
            styles.dayItem,
            actions.isCurrentDay(day) && styles.dayItemActive
          ]}
        >
          <Text>{day}</Text>
        </View>
      ))}
    </View>
  )
}
```

---

## ✅ Checklist de Criação

Ao criar um novo componente comum, verifique:

- [ ] **Estrutura de arquivos**
  - [ ] Pasta em `PascalCase`
  - [ ] Arquivos: `index.ts`, `ComponentName.tsx`
  - [ ] `types.ts` se houver múltiplos tipos
  - [ ] `useComponentName.ts` se houver lógica complexa

- [ ] **Exports**
  - [ ] `index.ts` do componente exporta apenas o componente principal
  - [ ] Adicionado export no `index.ts` da pasta `components` pai

- [ ] **Estilos**
  - [ ] Usa components core com biblioteca restyle
  - [ ] Components de texto tem seus `textVariants`

- [ ] **Tokens**
  - [ ] Usa `spacings` ao invés de números fixos
  - [ ] Usa `borderRadii` tokens como `default`, `inputField`, `rounded`
  - [ ] Nenhuma cor hardcoded (ex: `#fff`, `rgb(...)`)

- [ ] **Componentes Core**
  - [ ] Usa `<Text variant="...">` ao invés de `<RNText>`
  - [ ] Usa `<PressableBox>` ao invés de `<Pressable>`
  - [ ] Usa `<Box>` ao invés de `<View>`
  - [ ] Usa `<Icon name="...">` dos components/core

- [ ] **Tipagem**
  - [ ] Props tipadas
  - [ ] Enums para estados se necessário
  - [ ] Importação correta dos types

- [ ] **Hooks**
  - [ ] Usa `useAppTheme()` se precisar acessar theme diretamente
  - [ ] Hook customizado se lógica for complexa

---

## 🚫 Anti-Patterns (O Que Evitar)

### ❌ Cores Hardcoded

```typescript
// ❌ ERRADO
{
  backgroundColor: "#ffffff",
  color: "#000000",
  borderColor: "rgba(255, 255, 255, 0.1)"
}

// ✅ CORRETO
{
  backgroundColor: theme.primary,
  color: theme.text,
  borderColor: theme.backgroundContrast
}
```

### ❌ Valores de Spacing Fixos

```typescript
// ❌ ERRADO
{
  gap: 12,
  padding: 16,
  margin: 8
}

// ✅ CORRETO
{
  gap: spacings.s12,
  padding: spacings.s16,
  margin: spacings.s8
}
```

### ❌ Border Radius Customizado

```typescript
// ❌ ERRADO
{
  borderRadius: 20,
  borderRadius: 999
}

// ✅ CORRETO
{
  borderRadius: borderRadii.default,
  borderRadius: borderRadii.rounded // para circular
}
```

### ❌ Componentes Nativos ao invés de Core

```typescript
// ❌ ERRADO
import { Text as RNText, TouchableOpacity } from "react-native"

<RNText style={{ fontSize: 16 }}>Texto</RNText>
<TouchableOpacity onPress={handlePress}>
  <RNText>Botão</RNText>
</TouchableOpacity>

// ✅ CORRETO
import { Box, Text, TextInput } from "@core-components";

<Box alignItems="center">
  <Text pt="s56" variant="title24Bold">
    Login
  </Text>

  <TextInput boxProps={inputStyle} placeholder="Usuário" />

  <Text pt="s46">Informe suas credenciais para acessar</Text>
</Box>
```

### ❌ Export de Arquivos Internos

```typescript
// ❌ ERRADO - index.ts
export { ComponentName } from "./ComponentName";
export * from "./types";
export * from "./useComponentName";

// ✅ CORRETO - index.ts
export { ComponentName } from "./ComponentName";
```

---

## 📚 Referências Rápidas

### Imports Comuns

```typescript
// React Native
import { View, ScrollView, Image } from "react-native";

// Componentes Core
import { Box, BoxProps, Button, Text, TextInput } from "@core-components";

// Hooks de Theme
import { useAppTheme } from "@theme";

// Types
import { Theme, RestyleTypes, ThemeColor } from "@theme";
```

---

## 🎯 Conclusão

Este guia estabelece os padrões para criação de componentes comuns específicos de telas. Seguir essas convenções garante:

- ✅ **Consistência visual** através do sistema de design tokens
- ✅ **Manutenibilidade** com estrutura padronizada
- ✅ **Escalabilidade** facilitando adição de novos componentes
- ✅ **Tematização** com suporte a dark/light mode automático
- ✅ **Performance** com boas práticas de React Native
- ✅ **Type Safety** com TypeScript adequadamente tipado

**Lembre-se:** Componentes comuns são específicos de uma tela/feature, diferente dos `core` (reutilizáveis globalmente) e `containers` (wrappers de layout).
