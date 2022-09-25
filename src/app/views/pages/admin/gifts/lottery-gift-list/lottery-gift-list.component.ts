import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { takeUntil } from 'rxjs';
import { FilterNames } from 'src/app/@core/data/loyalty/enums.model';
import { HeaderFilter } from 'src/app/@core/data/loyalty/header-filter.model';
import { LotteryPointAwardGrid } from 'src/app/@core/data/loyalty/lottery-point-award.model';
import { BaseInfoService } from "src/app/@core/services/loyalty/base-info.service";
import { LotteryPointAwardService } from 'src/app/@core/services/loyalty/lottery-points-award.service';
import { BaseSearch } from 'src/app/@core/services/ui/base-search.components';
import { BaseSearchService } from 'src/app/@core/services/ui/base-search.service';

@Component({
  selector: 'app-lottery-gift-list',
  templateUrl: './lottery-gift-list.component.html',
  styleUrls: ['./lottery-gift-list.component.scss']
})
export class LotteryGiftListComponent extends BaseSearch implements OnInit, OnDestroy
{
  theViewList = new Array<LotteryPointAwardGrid>();
  headerItems: Array<HeaderFilter> =
    [new HeaderFilter(FilterNames.None, 'عنوان جایزه'),
    new HeaderFilter(FilterNames.ProviderBrandFilter, 'نمایش در برند'),
    new HeaderFilter(FilterNames.MinimumVolumeFilter),
    new HeaderFilter(FilterNames.MaximumVolumeFilter),
    ];

  constructor(
    private router: Router,
    public service: LotteryPointAwardService,
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
    this.service.GetLotteryPointsAwardsGrid(request);
  }

  goToEdit(id: string = '')
  {
    if (id)
    {
      this.router.navigate(['/admin/main/gifts/lottery-edit'], { queryParams: { id: id } });
      return;
    }
    this.router.navigate(['/admin/main/gifts/lottery-edit']);
  }

  override ngOnDestroy(): void
  {
    super.ngOnDestroy();
  }

}
