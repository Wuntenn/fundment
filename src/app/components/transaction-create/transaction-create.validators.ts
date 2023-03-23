import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { BankAccount } from 'src/app/core/bank-account/bank-account.interface';
import { TransactionType } from 'src/app/core/transaction/transaction.interface';

/** retun type interface */
export interface valdationObj {
  validationFuncs: any;
  validationArray: Array<ValidatorFn>;
}

/** Validation for the source account */
export function validateSourceAccount(currentMode: any, fGroup: FormGroup, fCtrl?: FormControl): valdationObj { 
  const vReq = Validators.required;

  if (currentMode === 'TransactionType.DEPOSIT') return { validationFuncs: { vReq }, validationArray: [vReq] };
  if (currentMode === 'TransactionType.WITHDRAW') return { validationFuncs: {}, validationArray: [] };
  if (currentMode === 'TransactionType.TRANSFER') return { validationFuncs: { vReq }, validationArray: [vReq] };
}

/** Validation for the target account */
export function validateTargetAccount(currentMode: any, fGroup: FormGroup, fCtrl?: FormControl): valdationObj { 
  const vReq = Validators.required;

  if (currentMode === 'TransactionType.DEPOSIT') return { validationFuncs: {}, validationArray: [] };
  if (currentMode === 'TransactionType.WITHDRAW') return { validationFuncs: { vReq }, validationArray: [vReq] };
  if (currentMode === 'TransactionType.TRANSFER') return { validationFuncs: { vReq }, validationArray: [vReq] };
}

/** Validation for the amount */
export function validateAmount(currentMode: any, fGroup: FormGroup, srcAccount: BankAccount): valdationObj { 
  const vReq = Validators.required;

  const maxAcc = srcAccount.current_value;
  console.log('Source accout amount: ', maxAcc);

  const vMax = Validators.max(maxAcc);
  const vMin = Validators.min(0);

  if (currentMode === 'TransactionType.DEPOSIT') return { validationFuncs: { vReq }, validationArray: [vReq] };
  if (currentMode === 'TransactionType.WITHDRAW') return { validationFuncs: { vReq, vMin, vMax }, validationArray: [vReq, vMin, vMax] };
  if (currentMode === 'TransactionType.TRANSFER') return { validationFuncs: { vReq, vMin, vMax }, validationArray: [vReq, vMin, vMax] };
}
