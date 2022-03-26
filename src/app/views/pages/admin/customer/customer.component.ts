import { Component, OnInit } from '@angular/core';
import {AlertService} from "src/app/@core/services/ui/alert.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit
{

  constructor(private alertService:AlertService) { }

  ngOnInit(): void
  {
    this.alertService.error('موارد الزامی را وارد نمایید.');
    // this.alertService.info('موارد الزامی را وارد نمایید.');
    // this.alertService.warning('موارد الزامی را وارد نمایید.');
    // this.alertService.success('موارد الزامی را وارد نمایید.');
  }

}
