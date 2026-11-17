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

- `AccountBalanceCard` riceve il conto e le callback per i movimenti e l'aggiornamento. Formatta il saldo in euro con `Intl.NumberFormat`, mostra il tipo di conto e gestisce localmente caricamento ed eventuali errori del refresh.
- `useInterval(callback, delay)` mantiene la callback più recente in un ref senza riavviare il timer a ogni render. `null` ferma l'intervallo e il cleanup lo elimina quando cambia il delay o il componente viene smontato.
- `LiveBalance` simula un incremento di 0,05 euro ogni cinque secondi. Il refresh manuale simula una breve richiesta senza recuperare dati reali.
- `TransactionList` usa l'ID stabile di ogni movimento come `key`, mai l'indice; `TransactionItem` visualizza importi con segno e date con `Intl.DateTimeFormat` in fuso `Europe/Rome`. Le date di esempio sono timestamp ISO.

I test coprono anche callback aggiornate, pausa e cleanup del timer, caricamento e errore del refresh, formattazione e riordino dei movimenti.
