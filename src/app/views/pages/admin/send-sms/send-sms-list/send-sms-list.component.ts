import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { FilterNames } from 'src/app/@core/data/loyalty/enums.model';
import { HeaderFilter } from 'src/app/@core/data/loyalty/header-filter.model';
import { SendedSMSGrid } from 'src/app/@core/data/loyalty/sms.model';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { SMSService } from 'src/app/@core/services/loyalty/SMS.service';
import { BaseSearch } from 'src/app/@core/services/ui/base-search.components';
import { BaseSearchService } from 'src/app/@core/services/ui/base-search.service';

@Component({
  selector: 'app-send-sms-list',
  templateUrl: './send-sms-list.component.html',
  styleUrls: ['./send-sms-list.component.scss']
})
export class SendSmsListComponent extends BaseSearch implements OnInit
{

  public theViewList = new Array<SendedSMSGrid>();
  headerItems: Array<HeaderFilter> = [
    new HeaderFilter(FilterNames.None, 'ردیف'),
    new HeaderFilter(FilterNames.Phone, 'گیرنده'),
    new HeaderFilter(FilterNames.None, 'متن پیام'),
    new HeaderFilter(FilterNames.DateFilter, 'بازه تاریخی'),
    new HeaderFilter(FilterNames.None, 'وضعیت'),
    new HeaderFilter(FilterNames.None, 'الگوی پیامک')];

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
    this.service.sendedSMSGrid$.pipe(takeUntil(this.unsubscribe)).subscribe(value => this.theViewList = value);
  }

  override search(request: any)
  {
    request.pageSize = 10;
    this.service.GetSendedSMSGrid(request);
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
