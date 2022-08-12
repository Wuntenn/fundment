import { NestedBankAccount } from '../bank-account/bank-account.interface';

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  TRANSFER = 'TRANSFER',
}

export interface Transaction {
  id: number;
  transaction_type: TransactionType;
  amount: number;
  source_bank_account_id: number;
  target_bank_account_id: number;
  description: string;
}

export interface TransactionCreate {
  transaction_type: TransactionType;
  amount: number;
  source_bank_account_id: number;
  target_bank_account_id: number;
  description: string;
}

export interface ExtendedTransaction extends Transaction {
  source: NestedBankAccount;
  target: NestedBankAccount;
}