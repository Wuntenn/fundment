import { Validators } from '@angular/forms';
import { TransactionType } from 'src/app/core/transaction/transaction.interface';

export function validateSourceAccount(currentMode: TransactionType): any[] { 
  if (currentMode === TransactionType.DEPOSIT) return [];
  if (currentMode === TransactionType.WITHDRAW) return [Validators.required];
  if (currentMode === TransactionType.TRANSFER) return [Validators.required];
}

export function validateTargetAccount(currentMode: TransactionType): any[] | void { 
  if (currentMode === TransactionType.DEPOSIT) return [];
  if (currentMode === TransactionType.WITHDRAW) return [Validators.required];
  if (currentMode === TransactionType.TRANSFER) return [Validators.required];
}
