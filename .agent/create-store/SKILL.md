---
name: create-store
description: How to create Zustand stores and their hook accessors for the app.
---

# SKILL: Criação de Stores

Use esta skill para criar stores Zustand em src/infra seguindo o padrão já usado no projeto.

## 📁 Estrutura recomendada

```text
src/infra/
  featureStore/
    ├── index.ts
    ├── useFeatureStore.ts
    └── useFeature.ts (opcional)
```

## Padrões do projeto

- O store atual de carrinho está em src/infra/cartStore e usa Zustand
- O padrão recomendado é:
  - initialState com o estado inicial
  - type do store com ações e dados
  - create<StoreType>() com as actions
  - hooks separados para leitura e escrita

## Estrutura base

```ts
import { create } from "zustand";

const initialState = {
  items: [],
  selectedItems: 0,
};

export type ExampleStoreType = typeof initialState & {
  addItem: (item: Item) => void;
  clear: () => void;
};

const useExampleStore = create<ExampleStoreType>()((set, get) => ({
  ...initialState,
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  clear: () => set(initialState),
}));
```

## Regras importantes

- Nunca mutar diretamente o estado; sempre use set
- Separe hooks de leitura e hooks de ação para evitar re-render desnecessário
- Use types bem explícitos para o estado e as actions
- Exporte o módulo via src/infra/<store>/index.ts

## Checklist

- [ ] Store está em src/infra/<storeName>
- [ ] Usa Zustand com types explícitos
- [ ] Tem estado inicial bem definido
- [ ] As actions são tipadas
- [ ] Há um index.ts exportando os hooks
