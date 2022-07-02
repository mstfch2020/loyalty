import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { smsInit } from 'src/app/@core/data/loyalty/sms.model';
import { BaseInfoService } from "src/app/@core/services/loyalty/base-info.service";
import { SMSService } from "src/app/@core/services/loyalty/SMS.service";

@Component({
  selector: 'app-send-sms-create',
  templateUrl: './send-sms-create.component.html',
  styleUrls: ['./send-sms-create.component.scss']
})
export class SendSmsCreateComponent implements OnInit
{

  constructor(public service: SMSService, public baseInfoService: BaseInfoService, private route: ActivatedRoute)
  {

  }

  ngOnInit(): void
  {
    this.route.queryParams.subscribe(params =>
    {
      const id = params['id'];
      this.updateScenarioFromServer(id);
    });

    this.route.params.subscribe(params =>
    {
      const id = params['id'];
      this.updateScenarioFromServer(id);
    });

  }

  private updateScenarioFromServer(id: any)
  {
    if (id)
    {
      this.service.getSmsById(id).subscribe((value) =>
      {
        this.baseInfoService.loadBaseInfo(() =>
        {
          if (!value)
          {
            value = smsInit;
          }
          this.service.createForm(value);
        });
      });
    }
    else
    {
      this.baseInfoService.loadBaseInfo(() => { this.service.createForm(smsInit); });
    }
  }

}
