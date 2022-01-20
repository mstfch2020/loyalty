import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-group-root',
  templateUrl: './customer-group-root.component.html',
  styleUrls: ['./customer-group-root.component.scss']
})
export class CustomerGroupRootComponent implements OnInit {

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
