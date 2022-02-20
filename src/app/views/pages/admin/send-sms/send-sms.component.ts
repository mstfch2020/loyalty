import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { SMSService } from 'src/app/@core/services/loyalty/SMS.service';

@Component({
  selector: 'app-send-sms',
  templateUrl: './send-sms.component.html',
  styleUrls: ['./send-sms.component.scss']
})
export class SendSmsComponent implements OnInit
{

  constructor(public smsService: SMSService, public baseInfoService: BaseInfoService, private route: ActivatedRoute)
  {

  }

  ngOnInit(): void
  {
    this.baseInfoService.loadBaseInfo();
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
