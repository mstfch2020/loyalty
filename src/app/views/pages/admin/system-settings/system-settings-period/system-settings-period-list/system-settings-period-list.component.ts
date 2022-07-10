import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterNames } from 'src/app/@core/data/loyalty/enums.model';
import { FilterTitle, IdTitle } from 'src/app/@core/data/loyalty/get-senarios-grid.model';
import { AuthService } from 'src/app/@core/services/auth/auth.service';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { PromoterDiscountSettingService } from 'src/app/@core/services/loyalty/promoter-discount-setting.service';
import { BaseSearch } from 'src/app/@core/services/ui/base-search.components';
import { BaseSearchService } from 'src/app/@core/services/ui/base-search.service';

@Component({
  selector: 'app-system-settings-period-list',
  templateUrl: './system-settings-period-list.component.html',
  styleUrls: ['./system-settings-period-list.component.scss']
})
export class SystemSettingsPeriodListComponent extends BaseSearch implements OnInit
{
  theViewList = new Array<any>();
  headerItems = ['ردیف', FilterNames.Brand, FilterNames.RestPeriodType,];

  constructor(
    private router: Router,
    public override baseInfoService: BaseInfoService,
    public override baseSearchService: BaseSearchService)
  {
    super(baseInfoService, baseSearchService);

    // service.groups$.subscribe(value =>
    // {
    //   this.theViewList = value;
    // });

    this.activeFilterName = FilterNames.None;
  }

  override ngOnInit(): void
  {
    super.ngOnInit();
  }

  override search(request: any)
  {
    request.pageSize = 10;
    // this.service.GetGroupsGrid(request);
  }

  goToEdit(id: string = '')
  {
    if (id)
    {
      this.router.navigate(['/admin/main/settings/period/edit'], { queryParams: { id: id } });
      return;
    }
    this.router.navigate(['/admin/main/settings/period/edit']);
  }
  getResetPeriodType(restPeriodType: any)
  {
    return (this.baseSearchService.theFilterRestPeriodTypeList.find(p => p.id === restPeriodType?.toString())?.title);
  }
}
