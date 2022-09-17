import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CustomerDetail, CustomerInfo, CustomerMainGrid, CustomerScenario, CustomerSubGrid, GetPromoterCommissionsGridResultDetail } from "../../data/loyalty/customer.model";
import { PromoterDiscountCodeStatus } from "../../data/loyalty/enums.model";
import { Period } from "../../data/loyalty/period.model";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { callGetService, callPostPagingService, callPostService } from "./BaseService";

@Injectable({ providedIn: 'root' })
export class CustomerService
{

  customerMainGrid$ = new BehaviorSubject<Array<CustomerMainGrid>>([]);
  customerSubGrid$ = new BehaviorSubject<Array<CustomerSubGrid>>([]);
  scenarioCustomer$ = new BehaviorSubject<Array<CustomerScenario>>([]);
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
        this.totalPages = Math.ceil(value.pagination.total / request.pageSize);
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

  getCustomerScenarioGrid(request: any)
  {
    const url = this.settingService.settings?.baseUrl + 'Customer/GetCustmerSenariosGrid';
    return callPostService<Array<CustomerScenario>>(url, this.http, this.uiService, request).subscribe(value =>
    {
      if (!value) { value = []; }
      this.scenarioCustomer$.next(value);
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

  GetPromoterCommissionsGrid(request: any)
  {
    const url = this.settingService.settings?.baseUrl + 'PromoterDiscountCode/GetPromoterCommissionsGrid';
    return callPostPagingService<any>(url, this.http, this.uiService, request);
  }

  GetPromoterDiscountCodesGeneralInfo(customerId: string): Observable<Array<CustomerInfo> | null>
  {
    const url = this.settingService.settings?.baseUrl + 'PromoterDiscountCode/GetPromoterDiscountCodesGeneralInfo?customerId=' + customerId;
    return callGetService<Array<CustomerInfo>>(url, this.http, this.uiService);
  }

  GetPromoterCommissionsDetails(date: Period, promoterDiscountCodeId: string): Observable<Array<GetPromoterCommissionsGridResultDetail> | null>
  {
    const url = this.settingService.settings?.baseUrl + 'PromoterDiscountCode/GetPromoterCommissionsDetails';
    return callPostService<Array<GetPromoterCommissionsGridResultDetail>>(url, this.http, this.uiService, { date: date, promoterDiscountCodeId: promoterDiscountCodeId });
  }

  GetPromoterDiscountCodesGrid(request: any)
  {
    const url = this.settingService.settings?.baseUrl + 'PromoterDiscountCode/GetPromoterDiscountCodesGrid';
    return callPostPagingService<any>(url, this.http, this.uiService, request);
  }

  PromoterDiscountCodeSetStatus(status: PromoterDiscountCodeStatus, id: string)
  {
    const url = this.settingService.settings?.baseUrl + 'PromoterDiscountCode/SetStatus';
    return callPostService<Array<GetPromoterCommissionsGridResultDetail>>(url, this.http, this.uiService, {
      id: id,
      status: status
    });
  }
}
