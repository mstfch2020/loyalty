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

  config: any = {
    date: {
      value: new Date().valueOf(),
      onSelect: (shamsiDate: string, gregorianDate: string, timestamp: number) => {
        console.log(shamsiDate, gregorianDate, timestamp);
      }
    },
    ui: {
      theme: 'default',
      isVisible: false,
      hideAfterSelectDate: true,
      hideOnOutsideClick: true,
      yearView: true,
      monthView: true,
    },
    time: {
      enable: false,
      showSecond: false,
      meridian: false
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

}
