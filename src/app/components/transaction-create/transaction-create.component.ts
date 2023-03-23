import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, find, from, groupBy, mergeMap, reduce, tap, map } from 'rxjs';

// Fundment libraries
import { BankAccountService } from 'src/app/core/bank-account/bank-account.service';
import { TransactionCreate, TransactionType } from 'src/app/core/transaction/transaction.interface';
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

  // used by Template 
  public ModeType = TransactionType; 

  constructor(
    private accountService: BankAccountService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initAccounts();
    this.setupFormData();
    this.subscribeToSouceAccountChanges();
    this.snapshot.bind(this);
  }

  // Setup subscription to the source dropdown 
  // so that we can update the target correctly
  subscribeToSouceAccountChanges() {
    this.transactionFormGroup.controls.source_bank_account_id.valueChanges
      .subscribe(selectedSourceAccountId => {
        if (this.snapshot().transaction_type === 'TransactionType.TRANSFER') {
          console.log('filtered targetAccountSource');
          this.updateTargetMenuData(selectedSourceAccountId);
        } else {
          console.log('unfiltered targetAccountSource');
          this.targetMenuAccounts = this.accounts;
        } 
      });
  }

  setupFormData() {
    this.transactionFormGroup = this.fb.group({
      transaction_type: [''],
      source_bank_account_id: ['null', validateSourceAccount(this.selectedMode)],
      target_bank_account_id: ['null', validateTargetAccount(this.selectedMode)],
      amount: [''],
      description: ['']
    },);

    console.log('Form Group: ', this.transactionFormGroup);
  }

  // Get the bank accounts from the service
  initAccounts() {
    // Transaction Type: Todo Remove
    //this.selectedMode = TransactionType.DEPOSIT;

    this.accountService.getBankAccounts()
      .subscribe(bankAccounts => { 
        this.accounts = this.targetMenuAccounts = bankAccounts;
        console.log('Init Accounts@TranactionCreate: this.accounts: ', this.accounts, ' this.targetMenuAccount: ', this.targetMenuAccounts);
      });
  }

  public snapshot() {
    return this.transactionFormGroup.getRawValue();
  }

  // updates the target datasource based on the source menu selection
  updateTargetMenuData(selectedSourceAccountId: number) {
    console.log('updating target menu data: ', selectedSourceAccountId);

    from(this.accounts) 
      .pipe(
        find(x => x.id.toString(10) === selectedSourceAccountId.toString(10)),
        mergeMap(srcAcc => from(this.accounts).pipe(reduce((acc, curr)=> { 
          if ((srcAcc.client_id === curr.client_id) && (srcAcc.id !== curr.id)) acc.push(curr);
          return acc;
        }, [])))
      )
      .subscribe(filteredAccounts => {
        this.targetMenuAccounts = filteredAccounts;
      });
  }

  onSubmit() {
    console.log('Submit attempted: ');
    console.log('Form state: ', this.snapshot());
  }

}
