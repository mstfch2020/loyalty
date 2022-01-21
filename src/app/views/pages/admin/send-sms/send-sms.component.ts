import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {Moment} from 'moment';

@Component({
  selector: 'app-send-sms',
  templateUrl: './send-sms.component.html',
  styleUrls: ['./send-sms.component.scss']
})
export class SendSmsComponent implements OnInit {

  form: FormGroup;

  cars = [
    {id: 1, name: 'زینجا'},
    {id: 2, name: 'مون'},
    {id: 3, name: 'قهر کرده'},
    {id: 4, name: '09192935850'},
  ];

  // date?: Moment;
  // dates: Moment[] = [];
  today: any;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      selectedCar: [null, [Validators.required]],
      datePicker: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.form.markAllAsTouched();
  }

  setDateReturn($event: any) {
    console.log($event);
  }

  dpickerFocus(picker: any) {
    console.log(picker);
  }

}
