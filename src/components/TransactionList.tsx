import { TransactionItem, type Transaction } from './TransactionItem'
import styles from './TransactionList.module.css'

export function TransactionList({ transactions }: { transactions: Transaction[] }) {
  return (
    <section className={styles.section} aria-labelledby="transactions-title">
      <h2 id="transactions-title">Ultimi movimenti</h2>
      {transactions.length === 0 ? (
        <p>Nessun movimento disponibile.</p>
      ) : (
        <ul className={styles.list}>
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </ul>
      )}
    </section>
  )
}
