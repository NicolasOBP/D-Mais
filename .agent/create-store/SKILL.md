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
  - hooks de leitura com seletores e hooks de serviço/ação separados quando isso reduzir re-renders e acoplar consumidores ao mínimo necessário
- Use persistência apenas quando o estado precisar sobreviver ao ciclo de vida da tela/app. Para persistir, siga a integração já usada pelo store de carrinho e o adapter de storage do projeto; não adicione outro mecanismo de persistência.

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
- Selecione apenas o estado necessário nos hooks de leitura e mantenha ações acessíveis por hooks de serviço quando esse for o padrão da feature
- Não persista estado sem requisito explícito; quando necessário, use o adapter de storage existente
- Use types bem explícitos para o estado e as actions
- Exporte o módulo via src/infra/<store>/index.ts

## Checklist

- [ ] Store está em src/infra/<storeName>
- [ ] Usa Zustand com types explícitos
- [ ] Tem estado inicial bem definido
- [ ] As actions são tipadas
- [ ] Persistência (se necessária) usa o adapter e o padrão já adotados pelo app
- [ ] Há um index.ts exportando os hooks
