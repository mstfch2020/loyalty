import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  constructor(
    private route: ActivatedRoute,
    public service: SMSService,
    public baseInfoService: BaseInfoService,
    private cdref: ChangeDetectorRef)
  {
  }
  ngOnInit(): void
  {
    this.baseInfoService.loadScenario();
    this.service.createForm(smsInit);
    this.route.queryParams.subscribe(params =>
    {
      const id = params['id'];
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
            this.cdref.detectChanges();
          }, value?.brandIds);
        });
      } else
      {
        this.baseInfoService.loadBaseInfo(() =>
        {
          this.service.createForm(smsInit);
          this.cdref.detectChanges();
        });
      }
    });
    this.service.form.markAllAsTouched();
  }
}
