import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-system-settings-discount-edit',
  templateUrl: './system-settings-discount-edit.component.html',
  styleUrls: ['./system-settings-discount-edit.component.scss']
})
export class SystemSettingsDiscountEditComponent implements OnInit {

  form: FormGroup;

  public percent: number;
  public percentFrom: number;
  public percentTo: number;

  cars = [
    { id: 1, name: 'زینجا' },
    { id: 2, name: 'مون' },
    { id: 3, name: 'قهر کرده' },
    { id: 4, name: '09192935850' },
  ];

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal) {
    this.form = this.formBuilder.group({
      selectedCar1: [null, [Validators.required]],
      selectedCar2: [null, [Validators.required]]
    });

    this.percent = 0;
    this.percentFrom = 0;
    this.percentTo = 0;
  }

  ngOnInit(): void {
    this.form.markAllAsTouched();
  }

}
