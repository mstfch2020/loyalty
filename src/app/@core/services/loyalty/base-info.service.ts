import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, forkJoin, Observable } from "rxjs";
import { EnumTitle, IdTitle, IdTitleType, IdTitleTypeBrandId } from "../../data/loyalty/get-senarios-grid.model";
import { ProductGroup } from "../../data/loyalty/product-group.model";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { callGetService, callPostService } from "./BaseService";

@Injectable({ providedIn: 'root' })
export class BaseInfoService
{
  senarioDiscountCodePatterns$ = new BehaviorSubject<Array<any>>([]);
  commissionsBasis$ = new BehaviorSubject<Array<number>>([]);
  activity$ = new BehaviorSubject<Array<IdTitle>>([]);
  brands$ = new BehaviorSubject<Array<IdTitle>>([]);
  brandsSingle$ = new BehaviorSubject<Array<IdTitle>>([]);
  userTypes$ = new BehaviorSubject<Array<IdTitle>>([]);
  userTypesSinle$ = new BehaviorSubject<Array<IdTitle>>([]);
  customerGroups$ = new BehaviorSubject<Array<IdTitle>>([]);
  products$ = new BehaviorSubject<Array<IdTitle>>([]);
  scenarios$ = new BehaviorSubject<Array<IdTitle>>([]);
  customerLevel$ = new BehaviorSubject<Array<IdTitle>>([]);
  productGroups$ = new BehaviorSubject<Array<ProductGroup>>([]);
  productGroupsSingle$ = new BehaviorSubject<Array<ProductGroup>>([]);
  applyOnType$ = new BehaviorSubject<Array<EnumTitle>>([]);
  freeProducts$ = new BehaviorSubject<Array<IdTitle>>([]);
  generalCustomers$ = new BehaviorSubject<Array<IdTitleTypeBrandId>>([]);
  generalCustomersByBrandId$ = new BehaviorSubject<Array<IdTitleTypeBrandId>>([]);
  generalCustomersSingle$ = new BehaviorSubject<Array<IdTitleTypeBrandId>>([]);
  productCodes$ = new BehaviorSubject<Array<string>>([]);

  applyOnType: Array<EnumTitle> = [
    { id: 1, title: 'قیمت قبل از تخفیف کالا' },
    { id: 2, title: 'قیمت بعد از تخفیف کالا' },
    { id: 3, title: 'قیمت بعد از اعمال سناریو' },
  ];

  constructor(
    public http: HttpClient,
    public settingService: SettingsService,
    public uiService: UiService)
  {
    this.applyOnType$.next(this.applyOnType);
  }

  loadBaseInfo(callback: any, brandIds: Array<string> = [], productIds: Array<string> = []): void
  {
    const requests: any = {
      activity: this.getActivity(),
      brands: this.getBrands(),
      userTypes: this.getUserTypes(),
      customerGroups: this.getCustomerGroups(),
      products: this.getProducts(),
      generalCustomers: this.getGeneralCustomer()
    };

    requests.productGroups = this.getProductGroupsByBrandIds(brandIds);
    requests.senarioDiscountCodePatterns = this.GetSenarioDiscountCodePatternsByBrandIds(brandIds);

    if (productIds?.length > 0)
    {
      requests.freeProducts = this.getFreeProducts(productIds);
    }

    forkJoin(requests).subscribe(resutl =>
    {
      const resultValue = resutl as any;
      const defArray = [{ id: 'all', title: 'همه' }];
      const defArrayType = [{ id: 'all', title: 'همه', type: 4 }];
      this.activity$.next(resultValue?.activity === null ? [] : resultValue?.activity);
      this.brands$.next(resultValue?.brands === null ? defArray : resultValue?.brands.concat(defArray));
      this.brandsSingle$.next(resultValue?.brands === null ? [] : resultValue?.brands);
      this.userTypes$.next(resultValue?.userTypes === null ? defArray : resultValue?.userTypes.concat(defArray));
      this.userTypesSinle$.next(resultValue?.userTypes === null ? [] : resultValue?.userTypes);
      this.customerGroups$.next(resultValue?.customerGroups === null ? [] : resultValue?.customerGroups);
      this.products$.next(resultValue?.products === null ? [] : resultValue?.products);
      this.generalCustomers$.next(resultValue?.generalCustomers === null ? defArrayType : resultValue?.generalCustomers.concat(defArrayType));
      this.generalCustomersByBrandId$.next(resultValue?.generalCustomers === null ? defArrayType : resultValue?.generalCustomers.concat(defArrayType));
      this.generalCustomersSingle$.next(resultValue?.generalCustomers === null ? [] : resultValue?.generalCustomers);

      this.productGroups$.next(resultValue?.productGroups === null ? defArray : resultValue?.productGroups.concat(defArray));
      this.productGroupsSingle$.next(resultValue?.productGroups === null ? [] : resultValue?.productGroups);
      this.senarioDiscountCodePatterns$.next(resultValue?.senarioDiscountCodePatterns === null ? [] : resultValue?.senarioDiscountCodePatterns);

      if (productIds?.length > 0)
      {
        this.freeProducts$.next(resultValue?.freeProducts === null ? [] : resultValue?.freeProducts);
      }
      callback();
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
    const url = this.settingService.settings?.baseUrl + 'Senario/GetSenariosDropDown';
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
    if (!brandIds || brandIds.length === 0 || brandIds.some(p => p === 'all'))
    {
      return callGetService<Array<ProductGroup> | null>(url, this.http, this.uiService);
    }
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

  getGeneralCustomer()
  {
    const url = this.settingService.settings?.baseUrl + 'Group/GetCustomerDrpDown';
    return callGetService<Array<IdTitleType> | null>(url, this.http, this.uiService);
  }

  GetAllCommissionsBasis()
  {
    const url = this.settingService.settings?.baseUrl + 'PromoterDiscountSetting/GetAllCommissionsBasis';
    return callGetService<Array<number> | null>(url, this.http, this.uiService);
  }

  GetSenarioDiscountCodePatternsByBrandIds(brandIds: Array<string>)
  {
    const url = this.settingService.settings?.baseUrl + 'DiscountCode/GetSenarioDiscountCodePatterns';
    if (!brandIds || brandIds.length === 0 || brandIds.some(p => p === 'all'))
    {
      return callPostService<any>(url, this.http, this.uiService, { brandIds: brandIds });
    }
    return callPostService<any>(url, this.http, this.uiService, { brandIds: brandIds });
  }
}


