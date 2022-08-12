import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ExtendedTransaction, Transaction } from './transaction.interface';
import { TRANSACTIONS } from './transaction.stub';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  getTransactions(): Observable<Transaction[]> {
    return of(TRANSACTIONS);
  }

  // getEnhancedTransactions(): Observable<ExtendedTransaction[]> { }
}