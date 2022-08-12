import { Transaction, TransactionType } from './transaction.interface';

export const TRANSACTIONS: Transaction[] = [{
  id: 1,
  transaction_type: TransactionType.DEPOSIT,
  amount: 100,
  source_bank_account_id: null,
  target_bank_account_id: 2,
  description: `Thomas' birthday present`
}, {
  id: 2,
  transaction_type: TransactionType.TRANSFER,
  amount: 12502,
  source_bank_account_id: 1,
  target_bank_account_id: 5,
  description: 'Janes transfer'
}, {
  id: 3,
  transaction_type: TransactionType.WITHDRAW,
  amount: 325480.82,
  source_bank_account_id: 4,
  target_bank_account_id: null,
  description: `Closing account`
}, {
  id: 3,
  transaction_type: TransactionType.DEPOSIT,
  amount: 35.50,
  source_bank_account_id: null,
  target_bank_account_id: 3,
  description: `Repayment to John`
}]