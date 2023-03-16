import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransactionCreateComponent } from './components/transaction-create/transaction-create.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule, BrowserAnimationsModule],
  declarations: [AppComponent, TransactionCreateComponent, DropdownComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
