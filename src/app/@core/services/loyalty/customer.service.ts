import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CustomerDetail, CustomerMainGrid, CustomerSubGrid } from "../../data/loyalty/customer.model";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { callGetService } from "./BaseService";

@Injectable({ providedIn: 'root' })
export class CustomerService
{
  customerMainGrid$ = new BehaviorSubject<Array<CustomerMainGrid>>([]);
  customerSubGrid$ = new BehaviorSubject<Array<CustomerSubGrid>>([]);
  customer$ = new BehaviorSubject<CustomerDetail>({} as CustomerDetail);

  constructor(
    public http: HttpClient,
    public settingService: SettingsService,
    public uiService: UiService)
  {
  }

  getCustomerMainGrid(pageSize: number, pageIndex: number)
  {
    const url = this.settingService.settings?.baseUrl + 'Customer/GetCustmersGrid';
    return callGetService<Array<CustomerMainGrid>>(url, this.http, this.uiService, {
      pageSize: pageSize, pageIndex: pageIndex
    }).subscribe(value =>
    {
      if (!value) { value = []; }
      this.customerMainGrid$.next(value);
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
