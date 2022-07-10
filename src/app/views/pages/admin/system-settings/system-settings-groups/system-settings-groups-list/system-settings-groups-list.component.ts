import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilterNames } from 'src/app/@core/data/loyalty/enums.model';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { GroupService } from 'src/app/@core/services/loyalty/group.service';
import { BaseSearch } from 'src/app/@core/services/ui/base-search.components';
import { BaseSearchService } from 'src/app/@core/services/ui/base-search.service';

@Component({
  selector: 'app-system-settings-groups-list',
  templateUrl: './system-settings-groups-list.component.html',
  styleUrls: ['./system-settings-groups-list.component.scss']
})
export class SystemSettingsGroupsListComponent extends BaseSearch implements OnInit
{

  theViewList = new Array<any>();
  headerItems = ['ردیف', FilterNames.Brand, FilterNames.RestPeriodType, 'تعداد گروه مشتری'];

  constructor(
    private router: Router,
    public service: GroupService,
    public override baseInfoService: BaseInfoService,
    public override baseSearchService: BaseSearchService)
  {
    super(baseInfoService, baseSearchService);

    service.groups$.subscribe(value =>
    {
      this.theViewList = value;
    });

    this.activeFilterName = FilterNames.None;
  }

  override ngOnInit(): void
  {
    super.ngOnInit();
  }

  override search(request: any)
  {
    request.pageSize = 10;
    this.service.GetGroupsGrid(request);
  }

  goToEdit(id: string = '')
  {
    if (id)
    {
      this.router.navigate(['/admin/main/settings/groups/edit'], { queryParams: { id: id } });
      return;
    }
    this.router.navigate(['/admin/main/settings/groups/edit']);
  }

  getResetPeriodType(restPeriodType: any)
  {
    return (this.baseSearchService.theFilterRestPeriodTypeList.find(p => p.id === restPeriodType?.toString())?.title);
  }
}
