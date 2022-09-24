import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import moment from "jalali-moment";
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

  refresh()
  {
    this.applyFilterForm({ filterType: FilterNames.Paging, event: null });
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

  updatePeriodFormControl(shamsiDate: string, formControlName: string, form: FormGroup): boolean
  {
    if (!shamsiDate)
    {
      return false;
    }
    const m = moment.from(shamsiDate.substring(0, 10), 'fa', 'YYYY/MM/DD');
    if (!m.isValid())
    {
      return false;
    }

    const date = shamsiDate.substring(0, 10)?.split('/');

    if (date && date.length === 3)
    {
      form.get(`${ formControlName }.year`)?.setValue(parseInt(date[0], 0));
      form.get(`${ formControlName }.month`)?.setValue(parseInt(date[1], 0));
      form.get(`${ formControlName }.day`)?.setValue(parseInt(date[2], 0));
    }

    const time = shamsiDate.substring(11, shamsiDate.length)?.split(':');
    if (time && time.length === 3)
    {
      form.get(`${ formControlName }.hours`)?.setValue(parseInt(time[0], 0));
      form.get(`${ formControlName }.minutes`)?.setValue(parseInt(time[1], 0));
      form.get(`${ formControlName }.seconds`)?.setValue(parseInt(time[2], 0));
    }
    return true;
  }


  ngOnDestroy(): void
  {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.baseInfoService.destroy();
  }
}
