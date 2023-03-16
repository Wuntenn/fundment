import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BankAccount } from 'src/app/core/bank-account/bank-account.interface';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() fCtrl: FormControl = new FormControl();
  @Input() dropdownId: string;
  @Input() dropdownText: string;
  @Input() dropdownDataSrc: BankAccount[];

  constructor() { }

  ngOnInit(): void {
    /*
    console.log('init@dropdownComponent');
    console.log('dropdownId: ', { type: typeof this.dropdownId, data: this.dropdownId });
    console.log('dropdownText: ', { type: typeof this.dropdownText, data: this.dropdownText });
    console.log('dropdownDataSrc: ', { type: typeof this.dropdownDataSrc, data: this.dropdownDataSrc });
    */
  }
}
