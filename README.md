# D'Mais

Aplicativo mobile desenvolvido para vendedores e gerentes de uma distribuidora de combustiveis. O D'Mais permite registrar pedidos diretamente no posto, consultar historico de pedidos, montar um carrinho com varios produtos e editar ou excluir vendas pendentes.

Com o app, o vendedor realiza o pedido no local da visita e envia as informacoes ao escritorio, reduzindo o preenchimento manual posterior. O fluxo foi pensado para manter o controle das vendas e restringir o acesso a usuarios autorizados da distribuidora.

## Principais funcionalidades

- login de vendedores e gerentes;
- configuracao do endereco do servidor de API;
- catalogo de combustiveis com busca e atualizacao;
- selecao de estoque de origem;
- carrinho persistente com varios itens;
- selecao de clientes, transportadora, motorista, carreta e caminhao;
- selecao de condicao e forma de pagamento;
- calculo de valor dos produtos e do frete;
- envio de pedidos ao servidor;
- consulta ao historico de pedidos;
- edicao e exclusao de pedidos pendentes;
- venda a partir de um pedido registrado;
- armazenamento local de pedidos pendentes e rascunhos;
- estados de carregamento, lista vazia, erro e toast;
- perfil do usuario autenticado e encerramento de sessao.

## Tecnologias

- React Native 0.81
- Expo SDK 54
- Expo Router
- TypeScript
- React Query
- Axios
- Zustand
- React Hook Form
- Zod
- Restyle
- React Native Reanimated
- React Native Skia
- MMKV
- EAS Build e EAS Update

## Requisitos

- Node.js e npm ou Yarn
- Expo CLI via `npx expo`
- Android Studio e Android SDK para executar no Android
- Java/JDK compativel com o projeto Android
- Xcode para executar no iOS em macOS
- acesso a uma API compativel ou ao servidor configurado no aplicativo

Este repositorio contem a pasta `android/` gerada pelo Expo prebuild e utiliza Yarn por possuir `yarn.lock`.

## Instalacao

Na raiz do projeto:

```bash
yarn install
```

Alternativamente:

```bash
npm install
```

## Executando o aplicativo

### Expo em modo desenvolvimento

```bash
yarn dev
```

Esse comando inicia o Expo com `APP_VARIANT=development`.

Para iniciar com configuracoes locais:

```bash
yarn devLocal
```

Para abrir no Android com um build local:

```bash
yarn android
```

Para builds nativos por variante:

```bash
yarn android:dev
yarn android:devLocal
yarn android:prod
```


## Variantes de ambiente

A configuracao em `app.config.ts` cria nomes e pacotes diferentes conforme `APP_VARIANT`:

| Variante | Nome exibido | Package Android |
| --- | --- | --- |
| `development` | DEV D'Mais | `com.nicolasobp.DMaisDev` |
| `devLocal` | LOCAL D'Mais | `com.nicolasobp.DMaisLocal` |
| Produção | D'Mais | `com.nicolasobp.DMais` |

Os builds EAS tambem configuram essas variantes em `eas.json`.

## Servidor da API

Na primeira abertura, a tela de login pode solicitar o endereco do servidor no formato informado pela modal:

```text
IP e porta
```

O endereco e persistido localmente. A base da API utiliza:

```text
https://<servidor>/datasnap/rest/
```

Existe uma URL padrao configurada em `src/infra/repositories/adapters/api/apiConfig.ts`. Ao alterar o servidor pela configuracao, o Axios atualiza automaticamente o `baseURL`.

## Estrutura do projeto

```text
app/
  _layout.tsx                    # Providers, autenticacao e monitoramento do app
  index.tsx                      # Entrada/login
  (protected)/                   # Rotas acessiveis apos autenticacao
    _layout.tsx
    (tabs)/                      # Abas principais
      home.tsx
      sell.tsx
      cart.tsx
      orders.tsx
      orders/[id].tsx
      profile.tsx

src/
  domain/                        # Contratos, tipos e use cases
    auth/
    cart/
    inventory/
    orders/
    product/
    sells/
  infra/                         # Implementacoes, providers e estado global
    authCredentials/
    cartStore/
    orderStore/
    serverConfigStore/
    storage/
    repositories/
      adapters/
        api/
        inMemory/
  ui/
    components/                  # Componentes especificos e composicoes
      core/                      # Componentes base reutilizaveis
    containers/                  # Containers de tela
    screens/                     # Telas da aplicacao
    theme/                       # Tema, tokens e tipos visuais
  schemas/                       # Validacoes Zod e integracao com React Hook Form
  hooks/                         # Hooks compartilhados da interface
  utils/                         # Utilitarios e hooks genericos
```

## Arquitetura

O projeto separa responsabilidades em camadas:

1. `app/` contem layouts e rotas do Expo Router.
2. `src/ui/screens` implementa as telas.
3. `src/domain` define contratos, tipos e use cases.
4. `src/infra/repositories` fornece os repositorios para API ou dados em memoria.
5. `src/infra` gerencia autenticacao, persistencia, stores e integracoes.
6. `src/ui/components/core` concentra os componentes visuais base.

O fluxo de dados remoto segue o padrao:

```text
tela -> use case de domain -> repositorio injetado -> adapter de infraestrutura -> API
```

Os repositorios sao disponibilizados pelo `RepositoryProvider`. O React Query e usado por wrappers compartilhados em `src/infra/useCases` para queries e mutations.

## Estado e persistencia

- autenticacao persistida em MMKV;
- carrinho persistido em MMKV por meio do Zustand;
- endereco do servidor persistido em MMKV;
- pedidos pendentes armazenados localmente;
- estado atual do pedido e lojas auxiliares gerenciados pelo Zustand;
- React Query usado para dados remotos e invalidação de consultas.

Quando o envio da venda falha, o usuario pode salvar o pedido como pendente e conclui-lo posteriormente pela tela de pedidos.

## Navegacao

O roteamento usa Expo Router e esta protegido por autenticacao:

| Rota | Tela |
| --- | --- |
| `/` | Login |
| `/home` | Catalogo de combustiveis |
| `/sell` | Formulario de venda |
| `/cart` | Carrinho |
| `/orders` | Historico e pedidos pendentes |
| `/orders/[id]` | Detalhes de um pedido |
| `/profile` | Perfil e logout |

As rotas dentro de `app/(protected)/(tabs)` ficam protegidas enquanto houver usuario autenticado.

## Alias de importacao

O projeto utiliza os seguintes alias definidos em `tsconfig.json`:

- `@core-components`
- `@components`
- `@containers`
- `@screens`
- `@domain`
- `@infra`
- `@utils`
- `@schemas`
- `@hooks`
- `@theme`

Exemplo:

```tsx
import { Box, Text } from "@core-components"
import { useAppTheme } from "@theme"
```

## Scripts

| Comando | Descricao |
| --- | --- |
| `yarn dev` | Expo com variante development |
| `yarn devLocal` | Expo com variante devLocal |
| `yarn android` | Executa o app Android localmente |
| `yarn android:dev` | Android com variante development |
| `yarn android:devLocal` | Android com variante devLocal |
| `yarn android:prod` | Android com variante production |
| `yarn ios` | Executa o app iOS |
| `yarn web` | Executa a versao web |
| `yarn tsc` | Verifica os tipos com TypeScript |
| `yarn lint` | Executa o Biome |
| `yarn format` | Formata os arquivos com o Biome |
| `yarn eas:dev` | Cria build Android development |
| `yarn eas:prev` | Cria build Android preview |
| `yarn up:prev` | Publica atualizacao no canal preview |

## Validacao

Antes de enviar alteracoes, execute:

```bash
yarn tsc
```

O workflow EAS em `.eas/workflows/check-code.yaml` executa `npx tsc --noEmit` em pull requests.

## Padroes de desenvolvimento

- manter rotas em `app/` como wrappers finos;
- implementar telas em `src/ui/screens`;
- manter regra de negocio fora da camada visual;
- acessar dados por use cases e repositorios;
- preferir componentes de `@core-components`;
- usar cores, espaçamento e raios do tema Restyle;
- usar Zod e React Hook Form para formularios;
- manter os exports atualizados nos arquivos `index.ts`;
- nao acessar a API diretamente dentro da interface;
- nao usar cores ou medidas fixas quando existir token no tema.
