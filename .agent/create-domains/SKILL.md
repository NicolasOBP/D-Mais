---
name: create-domains
description: How to create domain modules, types, interfaces and use cases.
---

# SKILL: Criação de Domínios

Use esta skill para criar novas funcionalidades na camada de domínio em src/domain.

## 📁 Estrutura recomendada

```text
src/domain/
  moduleName/
    ├── index.ts
    ├── ModuleNameTypes.ts
    ├── IModuleNameRepo.ts (opcional)
    └── useCases/
```

## Padrões do projeto

- Os tipos e interfaces devem ficar em arquivos nomeados com sufixo Type ou Types
- Exemplo atual: ProductTypes.ts, CartTypes.ts, OrdersType.ts, SellsType.ts
- Interfaces de repositório devem seguir o padrão I<Nome>Repo.ts
- O módulo deve ser exportado pelo index.ts da pasta do domínio e pelo index.ts principal de src/domain
- A camada de domínio deve ser agnóstica a UI; evite imports de @components ou react-native

## Regras de implementação

- Defina tipos puros em TypeScript para entidades e contratos de dados
- Use useCases para encapsular regras de negócio e chamadas de repositórios; não acesse API/HTTP diretamente nesta camada
- Para operações remotas, siga o padrão atual dos hooks em `src/domain/<feature>/useCases`: obtenha o repositório com `useRepository` e use `useAppQuery` para consultas ou `useAppMutation` para alterações
- Mantenha query keys e o fluxo de invalidação consistentes com os helpers existentes; examine use cases próximos antes de adicionar um novo padrão
- Nem todo use case precisa ser um hook: use a forma mais simples que se encaixa no comportamento e siga o padrão existente da funcionalidade
- Mantenha nomes em PascalCase para tipos e interfaces e camelCase para funções
- Se houver uma abstração de repositório, declare-a em src/domain/Repositories.ts ou no módulo específico

## Exemplo de estrutura

```ts
// src/domain/product/ProductTypes.ts
export interface Product {
  id: string;
  title: string;
  price: number;
}
```

## Checklist

- [ ] Módulo está em src/domain/<moduleName>
- [ ] Tipos e interfaces estão bem nomeados
- [ ] Operações remotas usam o repositório injetado e os wrappers de query/mutation existentes
- [ ] Há index.ts exportando o módulo
- [ ] Não há dependência direta de UI
- [ ] O módulo é exposto em src/domain/index.ts
