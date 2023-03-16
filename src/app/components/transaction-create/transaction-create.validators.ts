import { Validators } from '@angular/forms';
import { Mode } from './mode.enum'; 


export function validateSourceAccount(currentMode: Mode): any[] { 
  if (currentMode === Mode.Deposit) return [];
  if (currentMode === Mode.Withdrawl) return [Validators.required];
  if (currentMode === Mode.Transfer) return [Validators.required];
}

export function validateTargetAccount(currentMode: Mode): any[] | void { 
  if (currentMode === Mode.Deposit) return [];
  if (currentMode === Mode.Withdrawl) return [Validators.required];
  if (currentMode === Mode.Transfer) return [Validators.required];
}
