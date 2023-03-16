import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, from, reduce } from 'rxjs';

// Fundment libraries
import { BankAccountService } from 'src/app/core/bank-account/bank-account.service';
import { TransactionType } from 'src/app/core/transaction/transaction.interface';
import { BankAccount } from '../../core/bank-account/bank-account.interface';

// Validators
import { validateSourceAccount, validateTargetAccount } from './transaction-create.validators';


@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.scss']
})
export class TransactionCreateComponent implements OnInit {
  accounts? : BankAccount[] = [];
  selectedMode? : TransactionType;
  targetMenuAccounts? : BankAccount[] = [];
  transactionFormGroup: FormGroup;

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
    this.transactionFormGroup.controls.source_bank_account_id.valueChanges.subscribe(x => {
      this.onSourceChange(x);
    })
  }

  setupFormData() {
    this.transactionFormGroup = this.fb.group({

      source_bank_account_id: ['', validateSourceAccount(this.selectedMode)],
      target_bank_account_id: ['', validateTargetAccount(this.selectedMode)],
      amount: [''],
      description: ['']
    },);

    console.log('Form Group: ', this.transactionFormGroup);
  }

  // Get the bank accounts from the service
  initAccounts() {
    // Transaction Type: Todo Remove
    this.selectedMode = TransactionType.DEPOSIT;

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
        this.selectedMode = TransactionType.DEPOSIT;
        break;
      case 'withdrawl':
        this.selectedMode = TransactionType.WITHDRAW;
        break;
      case 'transfer':
        this.selectedMode = TransactionType.TRANSFER;
        break;
      default: 
        this.selectedMode = TransactionType.WITHDRAW;
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
    
    if (this.selectedMode === TransactionType.TRANSFER) {
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

  onSubmit() {
    console.log('Submit attempted: ');
    console.log('Form state: ', this.transactionFormGroup.getRawValue());
  }

}
