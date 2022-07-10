import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { FilterNames } from "../../data/loyalty/enums.model";
import { BaseInfoService } from "../loyalty/base-info.service";
import { BaseSearchService } from "./base-search.service";

@Component({
  selector: 'base-search',
  template: '',
})
export class BaseSearch implements OnInit, OnDestroy
{
  public unsubscribe = new Subject<void>();
  pageIndex = 1;
  pageSize = 20;
  activeFilterName = FilterNames.None;

  constructor(public baseInfoService: BaseInfoService, public baseSearchService: BaseSearchService)
  {

  }

  ngOnInit(): void
  {
    this.baseSearchService.loadData();
    this.search({ pageSize: this.pageSize, pageIndex: this.pageIndex });
  }

  openFilterForm(filterType: FilterNames)
  {
    this.activeFilterName = filterType;
    // this.cdref?.detectChanges();

  }

  applyFilterForm(item: { event: any, filterType: FilterNames; })
  {
    if (item.filterType !== FilterNames.Paging)
    {
      this.pageIndex = 1;
    }
    const request = this.baseSearchService.applyFilterForm(item.event, item.filterType);
    request.pageIndex = this.pageIndex;
    request.pageSize = this.pageSize;
    this.search(request);
    this.activeFilterName = FilterNames.Searched;
    // this.cdref?.detectChanges();

  }

  search(request: any) { }

  closeFilterForm(filterType: FilterNames)
  {
    this.activeFilterName = FilterNames.Searched;
    // this.cdref?.detectChanges();

  }

  selectedPageIndex(event: number)
  {
    this.pageIndex = event;
    this.applyFilterForm({ event: null, filterType: FilterNames.Paging });
  }

  ngOnDestroy(): void
  {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.baseInfoService.destroy();
  }
}
