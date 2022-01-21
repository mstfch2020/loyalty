import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-group',
  templateUrl: './customer-group.component.html',
  styleUrls: ['./customer-group.component.scss']
})
export class CustomerGroupComponent implements OnInit
{

  form: FormGroup;


  cars = [
    { id: 1, name: 'زینجا' },
    { id: 2, name: 'مون' },
    { id: 3, name: 'قهر کرده' },
    { id: 4, name: '09192935850' },
  ];

  constructor(private formBuilder: FormBuilder)
  {
    this.form = this.formBuilder.group({
      selectedCar: [null, [Validators.required]]
    });
  }

  ngOnInit(): void
  {
    this.form.markAllAsTouched();
  }

}
