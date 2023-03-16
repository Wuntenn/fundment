import { Injectable, OnInit } from '@angular/core';
import { from, of } from 'rxjs';
import { BankAccount } from '../core/bank-account/bank-account.interface';
import { BANK_ACCOUNTS } from '../core/bank-account/bank-account.stub';

@Injectable({
  providedIn: 'root'
})
export class BankAccountsService implements OnInit{
  private accounts: BankAccount[] = [];

  ngOnInit() {
    this.accounts = BANK_ACCOUNTS;
  }

  getBankAccounts() {
    return of(this.accounts);
  }

  getAccountsByClientId() {

  }
}
