import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CustomerDetail, CustomerMainGrid, CustomerSubGrid } from "../../data/loyalty/customer.model";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { callGetService, callPostPagingService } from "./BaseService";

@Injectable({ providedIn: 'root' })
export class CustomerService
{
  customerMainGrid$ = new BehaviorSubject<Array<CustomerMainGrid>>([]);
  customerSubGrid$ = new BehaviorSubject<Array<CustomerSubGrid>>([]);
  customer$ = new BehaviorSubject<CustomerDetail>({} as CustomerDetail);
  totalPages = 0;

  constructor(
    public http: HttpClient,
    public settingService: SettingsService,
    public uiService: UiService)
  {
  }

  getCustomerMainGrid(request: any)
  {
    const url = this.settingService.settings?.baseUrl + 'Customer/GetCustmersGrid';
    return callPostPagingService<Array<CustomerMainGrid>>(url, this.http, this.uiService, request).subscribe(value =>
    {
      this.customerMainGrid$.next([]);
      this.totalPages = 0;
      if (value?.data)
      {
        this.customerMainGrid$.next(value.data);
        this.totalPages = Math.round(value.pagination.total / request.pageSize);
      }
    });
  }

  getCustomerSubGrid(pageSize: number, pageIndex: number, id: string)
  {
    const url = this.settingService.settings?.baseUrl + 'Customer/GetCustomerScoresGrid';
    return callGetService<Array<CustomerSubGrid>>(url, this.http, this.uiService, {
      pageSize: pageSize, pageIndex: pageIndex, cusotmerId: id
    }).subscribe(value =>
    {
      if (!value) { value = []; }
      this.customerSubGrid$.next(value);
    });
  }

  getCustomerById(id: any)
  {
    const url = this.settingService.settings?.baseUrl + 'Customer/GetCustomerDetails';
    return callGetService<CustomerDetail>(url, this.http, this.uiService, {
      cusotmerId: id
    }).subscribe(value =>
    {
      if (!value)
      {
        this.customer$.next({} as CustomerDetail);
        return;
      }
      this.customer$.next(value);
    });
  }
}
