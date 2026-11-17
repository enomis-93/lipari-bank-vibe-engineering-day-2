# Lipari Bank - demo React

Una demo didattica realizzata con React 19, TypeScript e Vite. Saldo, IBAN e movimenti sono dati di esempio: non esiste un collegamento a un conto bancario o a un'API.

## Avvio

È richiesto Node.js 22.12+ (oppure una versione compatibile con Vite).

```bash
npm install
npm run dev
```

Il server di sviluppo mostra l'indirizzo locale nel terminale. Per le verifiche:

```bash
npm test
npm run lint
npm run build
```

## Funzionamento

- `AccountBalanceCard` formatta il saldo con `Intl.NumberFormat` e lo varia casualmente di ±10 euro ogni 30 secondi. Il cleanup dell'intervallo evita timer residui. Il refresh manuale resta disabilitato per almeno un secondo.
- `NotificationBell`, nell'header, carica notifiche mock per `userId`, annulla l'effetto con `AbortController` e apre/chiude il dropdown con un aggiornamento funzionale dello stato.
- `DashboardPage` mostra tre conti e cinque movimenti. Ogni riga gestisce il click con un handler `useCallback` che registra l'ID selezionato.
- `useInterval(callback, delay)` mantiene la callback più recente in un ref senza riavviare il timer a ogni render; `null` ferma l'intervallo.
- `TransactionList` usa l'ID stabile di ogni movimento come `key`, mai l'indice; date e importi sono formattati con le API `Intl`.

Saldo, notifiche e movimenti sono dati di esempio: non esiste un collegamento a un conto bancario o a un'API. I test coprono polling e cleanup, refresh, caricamento e toggle delle notifiche, propagation dei click e selezione dei movimenti.
