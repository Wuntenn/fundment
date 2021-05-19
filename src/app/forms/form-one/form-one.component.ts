import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataTypeOne } from '../../core/model/data.model';

@Component({
  selector: 'app-form-one',
  templateUrl: './form-one.component.html',
  styleUrls: ['./form-one.component.scss'],
})
export class FormOneComponent implements OnInit {
  formOne: FormGroup;

  constructor() {}

  ngOnInit() {
    this.formOne = new FormGroup({
      field1: new FormControl(''),
      field2: new FormControl(''),
      field3: new FormControl(''),
      field4: new FormControl(''),
      field5: new FormControl(''),
      field6: new FormControl(''),
      field7: new FormControl(''),
      field8: new FormControl(''),
      field9: new FormControl(''),
      field10: new FormControl(''),
    });
  }

  logFormValue() {
    const value: DataTypeOne = this.formOne.value;
    console.log(value);
  }
}
