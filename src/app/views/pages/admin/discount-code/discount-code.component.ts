import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-discount-code',
  templateUrl: './discount-code.component.html',
  styleUrls: ['./discount-code.component.scss']
})
export class DiscountCodeComponent implements OnInit {

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
      onSelect: (shamsiDate: string, gregorianDate: string, timestamp: number) =>
      {
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


  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal)
  {
    this.form = this.formBuilder.group({
      selectedCar1: [null, [Validators.required]],
      selectedCar2: [null, [Validators.required]],
      selectedCar3: [null, [Validators.required]],
      selectedCar4: [null, [Validators.required]],
    });
  }

  ngOnInit(): void
  {
    this.form.markAllAsTouched();
  }
}
