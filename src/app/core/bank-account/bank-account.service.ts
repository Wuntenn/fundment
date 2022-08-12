import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { BankAccount } from './bank-account.interface';
import { BANK_ACCOUNTS } from './bank-account.stub';

@Injectable({
  providedIn: 'root',
})
export class BankAccountService {
  getBankAccounts(): Observable<BankAccount[]> {
    return of(BANK_ACCOUNTS)
      .pipe(delay(1000));
  }
}