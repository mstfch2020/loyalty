import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, forkJoin, Observable } from "rxjs";
import { IdTitle } from "../../data/loyalty/get-senarios-grid.model";
import { ProductGroup } from "../../data/loyalty/product-group.model";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { callGetService } from "./BaseService";

@Injectable({ providedIn: 'root' })
export class BaseInfoService
{

  activity$ = new BehaviorSubject<Array<IdTitle>>([]);
  brands$ = new BehaviorSubject<Array<IdTitle>>([]);
  userTypes$ = new BehaviorSubject<Array<IdTitle>>([]);
  customerGroups$ = new BehaviorSubject<Array<IdTitle>>([]);
  products$ = new BehaviorSubject<Array<IdTitle>>([]);
  scenarios$ = new BehaviorSubject<Array<IdTitle>>([]);
  customerLevel$ = new BehaviorSubject<Array<IdTitle>>([]);
  productGroups$ = new BehaviorSubject<Array<ProductGroup>>([]);
  freeProducts$ = new BehaviorSubject<Array<IdTitle>>([]);


  constructor(
    public http: HttpClient,
    public settingService: SettingsService,
    public uiService: UiService)
  {
  }

  loadBaseInfo(brandIds: Array<string> = [], productIds: Array<string> = [])
  {
    const requests: any = {
      activity: this.getActivity(),
      brands: this.getBrands(),
      userTypes: this.getUserTypes(),
      customerGroups: this.getCustomerGroups(),
      products: this.getProducts(),
    };
    if (brandIds?.length > 0)
    {
      requests.productGroups = this.getProductGroupsByBrandIds(brandIds);
    }

    if (productIds?.length > 0)
    {
      requests.freeProducts = this.getFreeProducts(productIds);
    }

    forkJoin(requests).subscribe(resutl =>
    {
      const resultValue = resutl as any;
      this.activity$.next(resultValue?.activity === null ? [] : resultValue?.activity);
      this.brands$.next(resultValue?.brands === null ? [] : resultValue?.brands);
      this.userTypes$.next(resultValue?.userTypes === null ? [] : resultValue?.userTypes);
      this.customerGroups$.next(resultValue?.customerGroups === null ? [] : resultValue?.customerGroups);
      this.products$.next(resultValue?.products === null ? [] : resultValue?.products);
      if (brandIds?.length > 0)
      {
        this.productGroups$.next(resultValue?.productGroups === null ? [] : resultValue?.productGroups);
      }
      if (productIds?.length > 0)
      {
        this.freeProducts$.next(resultValue?.freeProducts === null ? [] : resultValue?.freeProducts);
      }
    });
  }

  loadScenario()
  {
    this.getScenario().subscribe(value =>
    {
      if (!value) { value = []; }
      this.scenarios$.next(value);
    });
  }

  loadCustomerLevel()
  {
    this.getCustomerLevel().subscribe(value =>
    {
      if (!value) { value = []; }
      this.customerLevel$.next(value);
    });
  }


  getCustomerLevel(): Observable<Array<IdTitle> | null>
  {
    const url = this.settingService.settings?.baseUrl + 'Level/GetAllLevel';
    return callGetService<Array<IdTitle> | null>(url, this.http, this.uiService);
  }

  getActivity(): Observable<Array<IdTitle> | null>
  {
    const url = this.settingService.settings?.baseUrl + 'Activity/GetAllActivitys';
    return callGetService<Array<IdTitle> | null>(url, this.http, this.uiService);
  }

  getScenario(): Observable<Array<IdTitle> | null>
  {
    const url = this.settingService.settings?.baseUrl + 'Senario/GetAllSenarios?pageSize=999999&pageIndex=1';
    return callGetService<Array<IdTitle> | null>(url, this.http, this.uiService);
  }

  getBrands(): Observable<Array<IdTitle> | null>
  {
    const url = this.settingService.settings?.baseUrl + 'Brand/GetAllBrands';
    return callGetService<Array<IdTitle> | null>(url, this.http, this.uiService);
  }

  getUserTypes(): Observable<Array<IdTitle> | null>
  {
    const url = this.settingService.settings?.baseUrl + 'UserType/GetUserTypes';
    return callGetService<Array<IdTitle> | null>(url, this.http, this.uiService);
  }

  getCustomerGroups(): Observable<Array<IdTitle> | null>
  {
    const url = this.settingService.settings?.baseUrl + 'Group/GetAllGroups';
    return callGetService<Array<IdTitle> | null>(url, this.http, this.uiService);
  }

  getProductGroupsByBrandIds(brandIds: Array<string>): Observable<Array<ProductGroup> | null>
  {
    const url = this.settingService.settings?.baseUrl + 'ProductGroup/GetProductGroupsByBrandIds';
    return callGetService<Array<ProductGroup> | null>(url, this.http, this.uiService, { brandIds: brandIds });
  }

  getFreeProducts(productIds: string[]): Observable<Array<IdTitle> | null>
  {
    const url = this.settingService.settings?.baseUrl + 'Product/GetFreeProducts';

    return callGetService<Array<IdTitle> | null>(url, this.http, this.uiService, {
      productIds: productIds
    });
  }

  getProducts(): Observable<Array<IdTitle> | null>
  {
    const url = this.settingService.settings?.baseUrl + 'Product/GetAllProducts';
    return callGetService<Array<IdTitle> | null>(url, this.http, this.uiService);
  }
}
