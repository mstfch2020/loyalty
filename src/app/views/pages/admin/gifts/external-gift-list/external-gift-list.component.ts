import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { takeUntil } from 'rxjs';
import { FilterNames } from 'src/app/@core/data/loyalty/enums.model';
import { ExternalPointAwardGrid } from 'src/app/@core/data/loyalty/external-point-award.model';
import { HeaderFilter } from 'src/app/@core/data/loyalty/header-filter.model';
import { BaseInfoService } from "src/app/@core/services/loyalty/base-info.service";
import { ExternalPointAwardService } from 'src/app/@core/services/loyalty/external-points-award.service';
import { BaseSearch } from 'src/app/@core/services/ui/base-search.components';
import { BaseSearchService } from 'src/app/@core/services/ui/base-search.service';

@Component({
  selector: 'app-external-gift-list',
  templateUrl: './external-gift-list.component.html',
  styleUrls: ['./external-gift-list.component.scss']
})
export class ExternalGiftListComponent extends BaseSearch implements OnInit, OnDestroy
{
  theViewList = new Array<ExternalPointAwardGrid>();
  headerItems: Array<HeaderFilter> =
    [new HeaderFilter(FilterNames.None, 'عنوان جایزه'),
    new HeaderFilter(FilterNames.ExporterBrandTextFilter, 'برند صادرکننده جایزه'),
    new HeaderFilter(FilterNames.Groups, 'مشتری'),
    new HeaderFilter(FilterNames.ProviderBrandFilter, 'نمایش در برند'),
    new HeaderFilter(FilterNames.volumeFilter, 'امتیاز لازم'),
    ];

  constructor(
    private router: Router,
    public service: ExternalPointAwardService,
    public override baseInfoService: BaseInfoService,
    public override baseSearchService: BaseSearchService)
  {
    super(baseInfoService, baseSearchService);
  }

  override ngOnInit(): void
  {
    super.ngOnInit();
    this.service.theListView$.pipe(takeUntil(this.unsubscribe)).subscribe(value =>
    {
      this.theViewList = value;
    });
  }

  override search(request: any)
  {
    request.pageSize = 20;
    this.service.GetExternalPointsAwardsGrid(request);
  }

  goToEdit(id: string = '')
  {
    if (id)
    {
      this.router.navigate(['/admin/main/gifts/external-edit'], { queryParams: { id: id } });
      return;
    }
    this.router.navigate(['/admin/main/gifts/external-edit']);
  }

  override ngOnDestroy(): void
  {
    super.ngOnDestroy();
  }

}
