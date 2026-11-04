# Salvamento de pedido ao enviar o app para background

Este documento descreve o fluxo implementado para salvar temporariamente uma venda quando o app vai para background e removê-la se o usuário retornar. Antes de alterar esse comportamento, consulte os arquivos atuais:

- `src/infra/orderStore/backgroundOrder.ts`
- `src/ui/screens/SellsScreen/useSellScreen.tsx`
- `app/_layout.tsx`

## Arquitetura atual

- `useBackgroundOrderStore()` mantém `canRun` e `savedOrderId` em Zustand.
- `useBackgroundOrderService()` expõe as operações `enableBackgroundOrderSaving`, `disableBackgroundOrderSaving`, `saveBackgroundOrder`, `reverseBackgroundOrder` e `showBackgroundNotification`.
- `useSellScreen` habilita o salvamento ao focar a tela de vendas por meio de `useFocusEffect`. A habilitação continua válida ao navegar para outra tela.
- O monitor global de `AppState` fica no layout raiz (`AppStateMonitor` em `app/_layout.tsx`), não na tela de vendas. Ele instala e remove a subscription no ciclo de vida do componente.
- O pedido pendente continua na storage de pedidos; a storage do app mantém um marcador `@BackgroundOrder` com o ID para identificar que o pedido foi salvo pelo fluxo de background.

## Ciclo de vida

1. Ao focar a tela de vendas, `enableBackgroundOrderSaving()` habilita o comportamento global.
2. Na transição para `background`, o monitor chama `saveBackgroundOrder()` somente se `canRun` estiver habilitado.
3. O serviço não cria outro pedido quando já existe um ID salvo em memória/storage, ou quando o pedido não tem produtos. Caso contrário, salva o pedido como pendente, grava o ID em `@BackgroundOrder` e atualiza `savedOrderId`.
4. Se a gravação do marcador falhar depois de salvar o pedido, remova o pedido recém-criado e propague o erro. Não deixe um pedido órfão nem esconda a falha.
5. Na transição de volta para `active`, `reverseBackgroundOrder()` remove o pedido pendente somente se o marcador armazenado corresponder ao `savedOrderId` atual; em seguida remove o marcador e limpa o ID em memória.
6. Se o processo for reiniciado após o salvamento, a inicialização no layout identifica o marcador enquanto o fluxo não está habilitado, limpa o marcador e mostra a notificação/modal de pedido salvo com acesso à lista de pedidos.
7. Quando a venda é enviada com sucesso ou salva explicitamente como pendente, a tela desabilita o salvamento de background e reseta o estado apropriado antes de limpar a venda/navegar.

## Ao implementar ou alterar

- Mantenha o listener de `AppState` no layout raiz para sobreviver à navegação e remova a subscription no cleanup.
- Reutilize o store, os serviços, a storage e o fluxo de pedidos existentes; não introduza uma flag mutável global fora do Zustand.
- Preserve as condições de idempotência e a ordem transacional entre salvar pedido, gravar marcador e atualizar o estado.
- Mantenha a reversão condicionada à correspondência do ID para não remover pedidos que não foram criados por esse fluxo.
- Trate erros explicitamente. O monitor atual captura e registra erros durante o salvamento/reversão; não transforme falhas em sucesso silencioso.
- `AppState` pode detectar a ida ao background, mas não garante tempo de execução assíncrona quando o sistema operacional encerra o processo.
