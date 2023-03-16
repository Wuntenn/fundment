import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, from, reduce } from 'rxjs';

// Fundment libraries
import { BankAccountService } from 'src/app/core/bank-account/bank-account.service';
import { BankAccount } from '../../core/bank-account/bank-account.interface';

import { Mode } from './mode.enum';

// Validators
import { validateSourceAccount, validateTargetAccount } from './transaction-create.validators';


@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.scss']
})
export class TransactionCreateComponent implements OnInit {
  accounts? : BankAccount[] = [];
  selectedMode? : Mode;
  targetMenuAccounts? : BankAccount[] = [];
  transactionFormGroup: FormGroup;

  public ModeType = Mode; 

  constructor(
    private accountService: BankAccountService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initAccounts();
    this.setupFormData();
    this.setupSourceSubs();
  }

  // Setup subscription to the source dropdown 
  // so that we can update the target correctly
  setupSourceSubs() {
    this.transactionFormGroup.controls.source.valueChanges.subscribe(x => {
      this.onSourceChange(x);
    })
  }

  setupFormData() {
    this.transactionFormGroup = this.fb.group({
      source: ['', validateSourceAccount(this.selectedMode)],
      target: ['', validateTargetAccount(this.selectedMode)],
      maxwithdrawl: [''],
      amount: [''],
      description: ['']
    },);

    console.log('Form Group: ', this.transactionFormGroup);
  }

  // Get the bank accounts from the service
  initAccounts() {
    // select mode
    this.selectedMode = Mode.Deposit;

    this.accountService.getBankAccounts()
      .subscribe(bankAccounts => { 
        this.accounts = bankAccounts;
        this.updateTargetMenuData(JSON.stringify({index: 0, data: this.accounts[0]}))

        console.log('Init Accounts@TranactionCreate: this.accounts: ', this.accounts);
      });
  }

  // Allow the user to choose the transaction mode
  onModeChange(value: any) {
    switch (value) {
      case 'deposit':
        this.selectedMode = Mode.Deposit;
        break;
      case 'withdrawl':
        this.selectedMode = Mode.Withdrawl;
        break;
      case 'transfer':
        this.selectedMode = Mode.Transfer;
        break;
      default: 
        this.selectedMode = Mode.Withdrawl;
        break;
    }

    console.log('Mode is: ', { mode: value, enumName: this.selectedMode});
  }


  // After updating the souce menu we need to update the target data 
  onSourceChange(selectedMenuItem: any) {
    this.updateTargetMenuData(selectedMenuItem);    
  }

  // updates the target datasource based on the source menu selection
  updateTargetMenuData(selectedMenuItem: any) {
    const selectedSource = JSON.parse(selectedMenuItem);
    console.log('updating target menu data: ', selectedSource);
    
    if (this.selectedMode === Mode.Transfer) {
      from(this.accounts).pipe(
        filter(x => (x.client_id === selectedSource.data.client_id) && ((x.account_number !== selectedSource.data.account_number) && (x.sort_code !== selectedSource.data.sort_code))),
        reduce((acc, cur) => [...acc, cur], [])
      )
      .subscribe(filteredAccounts => {
        this.targetMenuAccounts = filteredAccounts;
      })
    } else {
      this.targetMenuAccounts = this.accounts;
    }

  }



}
