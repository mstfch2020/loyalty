import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-group-root',
  templateUrl: './customer-group-root.component.html',
  styleUrls: ['./customer-group-root.component.scss']
})
export class CustomerGroupRootComponent implements OnInit
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
      selectedCar: [null, [Validators.required]],
      selectedCar1: [null, [Validators.required]],
      selectedCar2: [null, [Validators.required]],
      selectedCar3: [null, [Validators.required]],
      selectedCar4: [null, [Validators.required]],
      selectedCar5: [null, [Validators.required]],
    });
  }

  ngOnInit(): void
  {
    this.form.markAllAsTouched();
  }

}
