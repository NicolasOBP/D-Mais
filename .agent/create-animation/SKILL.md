---
name: create-animation
description: How to create reanimated animations separated from the animated component logic.
---

# SKILL: Criação de Animações

Use esta skill para criar animações com react-native-reanimated seguindo o padrão já adotado no projeto.

## 🎯 Objetivo

Separar a lógica de animação do componente visual. O componente deve ficar responsável por renderizar UI e receber estilos animados, enquanto a animação fica encapsulada em um hook ou arquivo dedicado.

## ✅ Padrão recomendado

### 1. Criar um hook de animação

Exemplo:

```ts
import { SharedValue, useAnimatedStyle } from "react-native-reanimated";

export function useExampleAnimation(progress: SharedValue<number>) {
  return useAnimatedStyle(() => ({
    opacity: progress.value,
  }));
}
```

### 2. O componente usa o hook

```tsx
import Animated from "react-native-reanimated";

import { useExampleAnimation } from "./useExampleAnimation";

export function ExampleComponent({
  progress,
}: {
  progress: SharedValue<number>;
}) {
  const animatedStyle = useExampleAnimation(progress);

  return <Animated.View style={animatedStyle} />;
}
```

## 🧩 Padrões reais do projeto

O projeto já usa esse modelo em vários lugares:

- useModalAnimations.ts para modal
- useDropDownAnimation.ts para dropdown
- useDropDownInputAnimation.ts para input animado
- EyeIcon.tsx para animação de ícone

O padrão é sempre:

- componente visual: renderiza a UI
- hook/arquivo de animação: calcula estilo animado
- valores compartilhados: useSharedValue ou SharedValue
- componente: aplica o estilo com Animated.View / Animated.Text / Animated.Component

## 📁 Estrutura sugerida

```text
ComponentName/
  ├── ComponentName.tsx
  └── useComponentAnimation.ts
```

Ou, quando a lógica for mais específica:

```text
ComponentName/
  ├── ComponentName.tsx
  ├── useComponentAnimation.ts
  └── components/
```

## 🔧 Regras importantes

- não misture lógica de animação diretamente no componente sempre que ela puder ser isolada
- use useSharedValue para controlar estados animados
- use useAnimatedStyle para retornar estilos reativos
- prefira interpolar valores com base no theme quando possível
- use useAppTheme() dentro do hook para pegar spacing, colors e borderRadii
- mantenha o componente limpo e focado em UI

## 🧠 Exemplo com theme e reanimated

```ts
import {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useAppTheme } from "@theme";

export function useExampleAnimation(progress: SharedValue<number>) {
  const { colors, borderRadii } = useAppTheme();

  return useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
    backgroundColor: colors.primary,
    borderRadius: borderRadii.default,
  }));
}
```

## 🚫 O que evitar

- não colocar toda a lógica de animação dentro do componente quando ela já pode virar hook
- não usar valores hardcoded de tamanho, padding ou radius quando o theme resolve
- não criar animações sem separar os valores de estado e os estilos resultantes
- não aplicar estilos animados diretamente sem usar Animated.View/Animated.Text/Animated.Component quando a animação for necessária

## ✅ Checklist

- [ ] A animação foi isolada em hook ou arquivo separado
- [ ] O componente visual ficou limpo
- [ ] O estilo animado é retornado via useAnimatedStyle
- [ ] Os valores compartilhados estão bem nomeados
- [ ] O theme foi usado quando necessário
- [ ] O componente aplica o estilo animado corretamente
