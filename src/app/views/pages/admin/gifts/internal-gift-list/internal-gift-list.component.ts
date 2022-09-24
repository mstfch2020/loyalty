import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { takeUntil } from 'rxjs';
import { FilterNames } from 'src/app/@core/data/loyalty/enums.model';
import { HeaderFilter } from 'src/app/@core/data/loyalty/header-filter.model';
import { InternalPointAwardGrid } from 'src/app/@core/data/loyalty/internal-point-award.model';
import { BaseInfoService } from "src/app/@core/services/loyalty/base-info.service";
import { InternalPointAwardService } from 'src/app/@core/services/loyalty/internal-points-award.service';
import { BaseSearch } from 'src/app/@core/services/ui/base-search.components';
import { BaseSearchService } from 'src/app/@core/services/ui/base-search.service';

@Component({
  selector: 'app-internal-gift-list',
  templateUrl: './internal-gift-list.component.html',
  styleUrls: ['./internal-gift-list.component.scss']
})
export class InternalGiftListComponent extends BaseSearch implements OnInit, OnDestroy
{
  theViewList = new Array<InternalPointAwardGrid>();
  headerItems: Array<HeaderFilter> =
    [new HeaderFilter(FilterNames.None, 'عنوان جایزه'),
    new HeaderFilter(FilterNames.ExporterBrandFilter, 'نمایش در برند'),
    new HeaderFilter(FilterNames.Groups, 'مشتری'),
    new HeaderFilter(FilterNames.ProviderBrandFilter, 'برند صادرکننده جایزه'),
    new HeaderFilter(FilterNames.volumeFilter, 'امتیاز لازم'),
    ];

  constructor(
    private router: Router,
    public service: InternalPointAwardService,
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

    // const newReq: any = {};
    // newReq.pageSize = 20;
    // newReq.pageIndex = this.pageIndex;

    // if (request.providerBrandFilter)
    // {
    //   if (request.providerBrandFilter.expression)
    //   {
    //     const providerBrandFilter = request.providerBrandFilter as FilterOption;
    //     newReq.providerBrandFilter = {};
    //     newReq.providerBrandFilter.brandIds = providerBrandFilter.event.value.map((a: any) => a.id);
    //     newReq.providerBrandFilter.filterType = parseInt(providerBrandFilter.event.conditionType, 0);
    //   } else
    //   {
    //     newReq.providerBrandFilter = request.providerBrandFilter;
    //   }
    // }

    // if (request.exporterBrandFilter)
    // {
    //   if (request.exporterBrandFilter.expression)
    //   {
    //     const exporterBrandFilter = request.exporterBrandFilter as FilterOption;
    //     newReq.exporterBrandFilter = {};
    //     newReq.exporterBrandFilter.brandIds = exporterBrandFilter.event.value.map((a: any) => a.id);
    //     newReq.exporterBrandFilter.filterType = parseInt(exporterBrandFilter.event.conditionType, 0);
    //   } else
    //   {
    //     newReq.exporterBrandFilter = request.exporterBrandFilter;
    //   }
    // }

    // if (request.groupFilter)
    // {
    //   if (request.groupFilter.expression)
    //   {
    //     const groupFilter = request.groupFilter as FilterOption;
    //     newReq.groupFilter = {};
    //     newReq.groupFilter.groupIds = groupFilter.event.value.map((a: any) => a.id);
    //     newReq.groupFilter.filterType = parseInt(groupFilter.event.conditionType, 0);
    //   } else
    //   {
    //     newReq.groupFilter = request.groupFilter;
    //   }
    // }

    // if (request.volumeFilter)
    // {
    //   if (request.volumeFilter.expression)
    //   {
    //     const volumeFilter = request.volumeFilter as FilterOption;
    //     newReq.volumeFilter = parseInt(volumeFilter.event.value, 0);
    //   } else
    //   {
    //     newReq.groupFilter = request.groupFilter;
    //   }
    // }

    this.service.GetLocalPointsAwardsGrid(request);
  }

  goToEdit(id: string = '')
  {
    if (id)
    {
      this.router.navigate(['/admin/main/gifts/internal-edit'], { queryParams: { id: id } });
      return;
    }
    this.router.navigate(['/admin/main/gifts/internal-edit']);
  }

  override ngOnDestroy(): void
  {
    super.ngOnDestroy();
  }

}
