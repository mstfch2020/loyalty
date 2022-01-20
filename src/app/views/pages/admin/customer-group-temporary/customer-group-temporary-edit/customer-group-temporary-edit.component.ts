import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-group-temporary-edit',
  templateUrl: './customer-group-temporary-edit.component.html',
  styleUrls: ['./customer-group-temporary-edit.component.scss']
})
export class CustomerGroupTemporaryEditComponent implements OnInit {

  selectedCar = 1;

  cars = [
    { id: 1, name: 'زینجا' },
    { id: 2, name: 'مون' },
    { id: 3, name: 'قهر کرده' },
    { id: 4, name: '09192935850' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
