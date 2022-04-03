import { Component, OnInit } from '@angular/core';
import {SMSService} from "src/app/@core/services/loyalty/SMS.service";
import {BaseInfoService} from "src/app/@core/services/loyalty/base-info.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-send-sms-create',
  templateUrl: './send-sms-create.component.html',
  styleUrls: ['./send-sms-create.component.scss']
})
export class SendSmsCreateComponent implements OnInit {

  constructor(public smsService: SMSService, public baseInfoService: BaseInfoService, private route: ActivatedRoute)
  {

  }

  ngOnInit(): void
  {
    this.baseInfoService.loadBaseInfo(() => { });
    this.baseInfoService.loadScenario();
    this.route.queryParams.subscribe(params =>
    {
      const id = params['id'];
      if (id)
      {
        // this.scenarioService.getScenarioById(id).subscribe((value) =>
        // {
        //   this.scenarioService.createForm(value);
        //   this.baseInfoService.loadBaseInfo(value.brandIds);
        // });
      }
    });

    this.smsService.form.markAllAsTouched();
  }

}
