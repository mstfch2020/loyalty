import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-system-settings-discount-root',
  templateUrl: './system-settings-discount-root.component.html',
  styleUrls: ['./system-settings-discount-root.component.scss']
})
export class SystemSettingsDiscountRootComponent implements OnInit {

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
