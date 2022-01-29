import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-system-settings-discount-root',
  templateUrl: './system-settings-discount-root.component.html',
  styleUrls: ['./system-settings-discount-root.component.scss']
})
export class SystemSettingsDiscountRootComponent implements OnInit
{


  form: FormGroup;


  cars = [
    { id: 1, name: 'زینجا' },
    { id: 2, name: 'مون' },
    { id: 3, name: 'قهر کرده' },
    { id: 4, name: '09192935850' },
  ];

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal)
  {
    this.form = this.formBuilder.group({
      selectedCar1: [null, [Validators.required]],
      selectedCar2: [null, [Validators.required]]
    });
  }

  ngOnInit(): void
  {
    this.form.markAllAsTouched();
  }
}
