import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { filter, find, from, groupBy, mergeMap, reduce, tap, map, Observable, concatMap } from 'rxjs';

// Fundment libraries
import { BankAccountService } from 'src/app/core/bank-account/bank-account.service';
import { TransactionCreate, TransactionType } from 'src/app/core/transaction/transaction.interface';
import { BankAccount } from '../../core/bank-account/bank-account.interface';

// Validators
import { validateSourceAccount, validateTargetAccount, validateAmount, valdationObj } from './transaction-create.validators';


@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.scss']
})
export class TransactionCreateComponent implements OnInit {
  accounts? : Observable<BankAccount[]>;
  selectedMode? : TransactionType;
  targetMenuAccounts : Observable<BankAccount[]>;
  transactionFormGroup: FormGroup;

  onSubmitCallback: Function = null; 

  sourceValidator: valdationObj;
  targetValidator: valdationObj;
  amountValidator: valdationObj;
  
  // Form state
  selectedSourceAcc: BankAccount;
  transferFullSourceAmount: boolean = false;
  previousAmount: number = 0;

  // used by Template 
  public ModeType = TransactionType; 

  constructor(
    private accountService: BankAccountService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initAccounts();
    this.setupFormValidation();
    this.subscribeToSouceAccountCtrlChanges();
    this.subscribeToTargetAccountCtrlChanges();
    this.subscribeToTransactionTypeChanges();
  }

  // Get the bank accounts from the service
  initAccounts() {
    this.accounts = this.accountService.getBankAccounts();
  }

  /**
   * Setup the form group and controls
   */
  setupFormValidation() {
    this.transactionFormGroup = this.fb.group({
      transaction_type: ['', Validators.required],
      source_bank_account_id: [''],
      target_bank_account_id: [''],
      amount: [0, { validators: [Validators.required, Validators.min(0)/*, Validators.max(20)*/]}],
      description: ['']
    },);

    console.log('Form Group: ', this.transactionFormGroup);
  }

  /**
   * Create the getters/setters for the controls
   */
  get transactionType() {
    return this.transactionFormGroup.get('transaction_type') as FormControl;
  }

  get sourceAccount() {
    return this.transactionFormGroup.get('source_bank_account_id') as FormControl;
  }

  get targetAccount() {
    return this.transactionFormGroup.get('target_bank_account_id') as FormControl;
  }

  get amount() {
    return this.transactionFormGroup.get('amount') as FormControl;
  }

  get description() {
    return this.transactionFormGroup.get('description') as FormControl;
  }

  // helper getter
  get snapshot() { 
    return this.transactionFormGroup.getRawValue();
  }

  /**
   *  Create the subscriptions
   */

  // Setup subscription to the source dropdown 
  // so that we can update the target correctly
  subscribeToSouceAccountCtrlChanges() {
    this.sourceAccount.valueChanges
      .subscribe(selectedSourceAccountId => {
        if (this.snapshot.transaction_type === 'TransactionType.TRANSFER') {
          this.updateTargetMenuData(selectedSourceAccountId); // Show menu other than selected
        } else {
          this.targetMenuAccounts = from(this.accounts); // Show menu with original options available
        } 
        
        this.setupValidatorWithSourceAccountAmount();
      });
  }

  subscribeToTransactionTypeChanges() {
    this.transactionType.valueChanges
      .subscribe(transactionType => {
        console.log('transaction type: ',transactionType);
        this.resetInnerFormData();
      });
  }


  /**
   *  Setup Validation
   */
  setupValidatorWithSourceAccountAmount() {
    console.log('@subToType: setValidators (source): group', this.sourceAccount.value);
    console.log('@subToType: setValidators (target): group', this.targetAccount.value);
    console.log('@subToType: setValidators (amount): group', this.amount.value);

    if (this.sourceAccount.value === null) return;

    this.accounts.pipe(
      concatMap(from),
      find((account: BankAccount) => parseInt(account.id.toString(), 10) === parseInt(this.sourceAccount.value, 10)),
    ).subscribe(srcBankAccount => {
      console.log('updating class validators');
      this.sourceValidator = validateSourceAccount(this.transactionType.value, this.transactionFormGroup);
      this.targetValidator = validateTargetAccount(this.transactionType.value, this.transactionFormGroup);
      this.amountValidator = validateAmount(this.transactionType.value, this.transactionFormGroup, srcBankAccount);
      this.selectedSourceAcc = srcBankAccount;

      console.log('applying validators');
      this.sourceAccount.setValidators(this.sourceValidator?.validationArray);
      this.targetAccount.setValidators(this.targetValidator?.validationArray);
      this.amount.setValidators(this.amountValidator?.validationArray);

    });

    this.transactionFormGroup.updateValueAndValidity();

    const OKeys =  Object.keys(this.amountValidator?.validationFuncs || {});
    console.log('keys:', OKeys);

    OKeys.length && OKeys.forEach(key => {
      if ((key === null) || (key === undefined)) return;
      const valFn = this.amountValidator && this.amountValidator.validationFuncs[key]; 
      console.log('Has validator for key: ', key, this.amount.hasValidator(valFn));
    });
  }

  /**
   *  Form Helpers
   */

  // updates the target datasource based on the source menu selection
  // Want same client_Id and diffent account_id
  updateTargetMenuData(selectedSourceAccountId: number) {
    console.log('updating target menu data - Source account selected with Id: ', selectedSourceAccountId);

    if (selectedSourceAccountId == null) return;

    this.targetMenuAccounts = this.accounts.pipe(
      map(x => {
        const sourceAcc = x.find(acc => acc.id.toString(10) === selectedSourceAccountId.toString(10));
        
        const res: BankAccount[] = x.reduce((acc, curr)=> { 
          if ((sourceAcc.client_id === curr.client_id) && (sourceAcc.id !== curr.id)) acc.push(curr);
          return acc;
        }, []);
        return res;
      })
    );
  }
  
  updateTargetValidity() { 
    console.log('validating target dd');
    this.targetAccount.updateValueAndValidity();
  }

  updateAmountValidity() { 
    console.log('validating amount');
    this.amount.updateValueAndValidity()
  }

  // reset all the data previously entered
  resetInnerFormData() {
    this.sourceAccount.reset();
    this.targetAccount.reset();
    this.amount.reset();
    this.description.reset();

    // reset form state 
    this.transferFullSourceAmount = false;
    this.previousAmount = 0;
  }

  // show the final object that will be returned from the form
  // Btn handler
  onSubmit() {
    console.log('Submit attempted');
    console.log('Form state: ', this.snapshot);
  }

  onFullAmountClicked() {
    this.transferFullSourceAmount = !this.transferFullSourceAmount;

    if (this.transferFullSourceAmount) {
      this.previousAmount = this.amount.value || 0;
      const selAccBal = this.selectedSourceAcc?.current_value || 0;
      this.amount.setValue(selAccBal);
    } else {
      this.amount.setValue(this.previousAmount);
    }
  }
}
