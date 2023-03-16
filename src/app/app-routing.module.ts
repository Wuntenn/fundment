import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionCreateComponent } from './components/transaction-create/transaction-create.component';

const routes: Routes = [
  { 'path': 'transaction/create', component: TransactionCreateComponent },
  { 'path': '', redirectTo: 'transaction/create', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
