import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { SMS, smsInit } from 'src/app/@core/data/loyalty/sms.model';
import { BaseInfoService } from "src/app/@core/services/loyalty/base-info.service";
import { SMSService } from "src/app/@core/services/loyalty/SMS.service";

@Component({
  selector: 'app-send-sms-create',
  templateUrl: './send-sms-create.component.html',
  styleUrls: ['./send-sms-create.component.scss']
})
export class SendSmsCreateComponent implements OnInit
{

  constructor(private router: Router,
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
          if (value !== null)
          {
            value.id = id;
          }
          this.loadBaseInfo(value);
        });
      } else
      {
        this.loadBaseInfo(null);
      }
    });
    this.service.form.markAllAsTouched();
  }

  private loadBaseInfo(value: SMS | null)
  {
    this.baseInfoService.loadBaseInfo(() =>
    {
      if (!value)
      {
        value = smsInit;
      } else
      {

      }
      this.service.createForm(value);
      this.cdref.detectChanges();
    }, value?.brandIds);
    return value;
  }

  backToList()
  {
    this.router.navigate(['/admin/main/sms/def-list']);
  }
}
