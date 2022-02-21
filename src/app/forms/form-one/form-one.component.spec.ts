import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormOneComponent } from './form-one.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FormOneComponent', () => {
  let component: FormOneComponent;
  let fixture: ComponentFixture<FormOneComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [FormOneComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show field7 if field2 and field3 are true', () => {

  });

  it('should show field10 if field5 value is larger than 500 and field7 is true', () => {

  });

  it('should only allow field9 to have a value between 100 and 1000', () => {

  });

  it('should return the correct JSON from formOne.value', () => {

  });

});
