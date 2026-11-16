---
name: create-api
description: How to add or extend API repository adapters using the app's Axios, mapping, and error-handling conventions.
---

# SKILL: Criação de Repositórios de API

Use esta skill para integrar uma funcionalidade com o servidor ou alterar uma integração existente. A API fica em `src/infra/repositories/adapters/api`; telas e use cases não devem fazer chamadas HTTP diretamente.

## Estrutura do adapter

```text
src/infra/repositories/adapters/api/
  apiConfig.ts                 # cliente Axios compartilhado e configuração de servidor
  apiError.ts                  # conversão centralizada de erros de transporte
  APITypes.ts                  # tipos comuns da resposta de erro
  <feature>/
    Api<Feature>Repo.ts        # implementação do contrato de domínio
    <Feature>Adapter.ts        # mapeamento request/response
```

Antes de criar arquivos, confira todos os adapters próximos e siga os tipos e o estilo da feature. Tipos de domínio e contratos de API existentes são exportados por `@domain`; preserve esse padrão no escopo desta alteração.

## Procedimento

1. **Defina o contrato no domínio.** Adicione/estenda a interface do repositório e os tipos necessários em `src/domain/<feature>`. Use tipos explícitos para o payload recebido e enviado, sem deixar a resposta da API vazar sem adaptação para a UI.
2. **Crie funções de adapter puras.** Em `<Feature>Adapter.ts`, separe a construção do payload de request do mapeamento/validação da resposta. Converta nomes e formatos do servidor para modelos de domínio. Valide respostas dinâmicas como `unknown` antes de acessá-las e lance erro explícito para dados ausentes ou inválidos.
3. **Implemente o repositório.** Em `Api<Feature>Repo.ts`, implemente o contrato de domínio (ou `Pick<Interface, ...>` quando o adapter cobre intencionalmente apenas parte dele). Use o cliente compartilhado `API` de `../apiConfig`, os tipos de resposta explícitos e as funções do adapter. Não crie um cliente Axios por feature.
4. **Trate erros centralmente.** Envolva a operação no `try/catch` e encaminhe o erro a `handleApiError` de `../apiError` com mensagens contextuais de fallback, conexão, HTTP e causa traduzida. Use `getServerErrorMessage` somente quando o formato de erro do endpoint exigir parser específico; faça o parser validar a resposta antes de extrair a mensagem. Erros de validação locais devem continuar explícitos.
5. **Integre o repositório.** Registre a implementação nas factories/providers e exports da infraestrutura, seguindo os adapters e `RepositoryProvider` existentes. O domínio deve continuar consumindo o contrato injetado, não a implementação concreta.
6. **Valide a integração.** Confirme método HTTP, endpoint e formato do payload com o contrato existente; trate lista vazia, resposta sem `result[0]`, status de negócio diferente de `"OK"` e quantidade/formato inesperados conforme aplicável.

## Padrões do projeto

- Reutilize `API` de `apiConfig.ts` para manter base URL e configuração comuns.
- Mantenha o repositório responsável por HTTP, validação da forma da resposta e erros; mantenha conversões específicas em funções nomeadas `adapt...` no arquivo adapter.
- As respostas costumam usar `response.data.result[0]`; confirme se o endpoint espera `GET` ou `PUT` e se os parâmetros vão em `params` ou no body.
- Para listas, confirme `Array.isArray` antes de mapear. Para respostas únicas, confirme a existência do item, valide status e adapte ao tipo de domínio.
- Para formatos de negócio especiais ou JSON serializado como string, crie parser específico que aceite `unknown`, valide o formato e gere erros claros. Não esconda falhas com valores padrão de sucesso.
- Diferencie erros de servidor, HTTP e conexão através de `handleApiError`; não engula erros nem retorne listas ou resultados vazios como fallback.
- Exporte e registre apenas o necessário, mantendo a API pública da feature alinhada ao restante de `src/domain` e `src/infra`.

## Checklist

- [ ] O contrato e os tipos de domínio foram definidos/atualizados
- [ ] O repositório usa o cliente compartilhado e implementa o contrato correto
- [ ] Request e response são convertidos por adapters tipados
- [ ] Dados inválidos, status de negócio e erros de transporte são reportados explicitamente
- [ ] A implementação foi registrada nos providers/factories e barrels pertinentes
- [ ] O use case acessa o repositório injetado, sem chamada HTTP direta
- [ ] O fluxo foi validado com `npx tsc --noEmit`
