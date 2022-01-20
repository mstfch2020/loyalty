import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-group-temporary',
  templateUrl: './customer-group-temporary.component.html',
  styleUrls: ['./customer-group-temporary.component.scss']
})
export class CustomerGroupTemporaryComponent implements OnInit {

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
