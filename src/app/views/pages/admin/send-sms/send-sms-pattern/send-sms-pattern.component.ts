import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { FilterNames } from 'src/app/@core/data/loyalty/enums.model';
import { SMSDefinitionsGrid } from 'src/app/@core/data/loyalty/sms.model';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { SMSService } from 'src/app/@core/services/loyalty/SMS.service';
import { BaseSearch } from 'src/app/@core/services/ui/base-search.components';
import { BaseSearchService } from 'src/app/@core/services/ui/base-search.service';

@Component({
  selector: 'app-send-sms-pattern',
  templateUrl: './send-sms-pattern.component.html',
  styleUrls: ['./send-sms-pattern.component.scss']
})
export class SendSmsPatternComponent extends BaseSearch implements OnInit
{
  public theViewList = new Array<SMSDefinitionsGrid>();
  headerItems = ['ردیف', FilterNames.Brand, FilterNames.UserType, FilterNames.Customer, 'مخاطب سناریو', FilterNames.Date];

  constructor(public service: SMSService,
    private router: Router,
    public override baseInfoService: BaseInfoService,
    public override baseSearchService: BaseSearchService)
  {
    super(baseInfoService, baseSearchService);
  }

  override ngOnInit(): void
  {
    super.ngOnInit();
    this.service.sMSDefinitionsGrid$.pipe(takeUntil(this.unsubscribe)).subscribe(value => this.theViewList = value);
  }

  override search(request: any)
  {
    request.pageSize = 10;
    this.service.GetSMSDefinitionsGrid(request);
  }

  goToEdit(id: string = '')
  {
    if (id)
    {
      this.router.navigate(['/admin/main/sms/edit'], { queryParams: { id: id } });
      return;
    }
    this.router.navigate(['/admin/main/sms/edit']);
  }

  override ngOnDestroy(): void
  {
    super.ngOnDestroy();
  }

}
