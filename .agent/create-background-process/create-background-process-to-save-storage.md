# Documentação de Contexto: Monitoramento de Background Global no Expo Router (React Native)

## 📋 Visão Geral do Problema

O objetivo é implementar uma rotina específica no aplicativo (desenvolvido em **React Native** com **Expo Router**) que:

1. Fazer com que a “Order” atual que está na SellsScreen seja salva no dispositivo caso a venda não seja completada e o usuário sai do app.

2. É ativada/permitida quando o usuário entra em uma **tela específica** (ex: SellsScreen).

3. Continua funcionando mesmo se o usuário navegar para **outras telas** após passar pela SellsScreen.

4. É acionada automaticamente quando o aplicativo vai para o **segundo plano (background)** — seja minimizado ou enviado para a tela de aplicativos recentes.

5. **Reverte** a rotina automaticamente caso o usuário retorne para o aplicativo, fazendo com que a OrderStorage que foi criada seja deletada e o app continue normalmente (**foreground / active**).

## 🏗️ Arquitetura da Solução

Como o ouvinte do `AppState` precisa persistir mesmo quando o usuário muda de tela (sai da SellsScreen para outra tela), a abordagem correta é:

1. **Estado Global Simples:** Um arquivo de controle (`runInBackgroundStore.ts`) para gerenciar se a rotina está autorizada a rodar.

2. **Ouvinte Global (`_layout.tsx`):** O listener do `AppState` fica posicionado no layout raiz do Expo Router, garantindo que ele exista durante todo o ciclo de vida do app sem causar vazamentos de memória (*memory leaks*).

3. **Ativação por Tela (`SellsScreen.tsx`):** A tela específica altera a flag global para `true` assim que o usuário entra nela.

## 💻 Implementação dos Arquivos

### 1. Criando o Estado Global

Crie um arquivo para gerenciar a chave de permissão dentro de infra/ (ex: `src/constants/globalState.js` ou na raiz):

```
// runInBackgroundStore.ts
export const routineControl= {
  canRun: false
};

```

### 2. Configurando o Ouvinte no Layout Raiz

No arquivo principal de rotas (`app/_layout.tsx`), configuramos o listener global do `AppState` para verificar a chave antes de executar as rotinas de ida para o background e retorno para o foreground.

```
// app/_layout.tsx
import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { Stack } from 'expo-router'; 
import { routineControl } from '../globalState'; // Ajuste o caminho conforme sua estrutura

export default function RootLayout() {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      
      // 1. App vai para o BACKGROUND (Minimizado / Recentes)
      if (appState.current.match(/inactive|active/) && nextAppState === 'background') {
        if (controleDeRotina.podeRodar) {
          console.log('App minimizado! Rodando a rotina global...');
          minhaRotinaGlobal();
        }
      }

      // 2. App volta para o FOREGROUND (Ativo / Aberto novamente)
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        if (controleDeRotina.podeRodar) {
          console.log('App voltou do background! Revertendo a rotina...');
          reverterRotinaGlobal();
        }
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const minhaRotinaGlobal = () => {
    // Insira aqui a lógica que deve rodar ao minimizar (ex: pausar contadores, criptografar tela, etc.)
  };

  const reverterRotinaGlobal = () => {
    // Insira aqui a lógica de reversão ao voltar (ex: retomar contadores, descriptografar, etc.)
  };

  return <Stack />; 
}

```

### 3. Ativando a Rotina na Tela Específica

Na tela onde o comportamento deve ser habilitado (ex: `SellsScreen.tsx`), ativamos a flag no `useEffect`:

```
// app/tela-c.tsx
import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { controleDeRotina } from '../globalState';

export default function TelaC() {
  
  useEffect(() => {
    // Ativa a permissão assim que a tela é montada
    controleDeRotina.podeRodar = true;
    console.log('Rotina de background ativada pela Tela C.');

    // Opcional: Se quiser desativar caso o usuário saia desta tela específica:
    return () => {
      // controleDeRotina.podeRodar = false; 
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Tela C - O monitoramento de background está ativo para o app inteiro.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }
});

```

## ⚠️ Notas Técnicas Importantes para o Copilot / Desenvolvimento

* **Minimizar vs. Matar o App (*Kill*):** O `AppState` detecta perfeitamente quando o app vai para o background (minimizado ou na lista de recentes). No entanto, se o usuário **arrastar o card do app para cima para fechá-lo completamente (matar o processo)**, o sistema operacional encerra a aplicação instantaneamente, sem garantia de tempo hábil para rodar operações assíncronas complexas.

* **Performance:** Centralizar o `AppState.addEventListener` no `_layout.tsx` evita múltiplos ouvintes espalhados pelas telas, prevenindo *memory leaks* e otimizando o consumo de bateria.