import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, forkJoin, Observable, Subject, takeUntil } from "rxjs";
import { EnumTitle, IdTitle, IdTitleTypeBrandId } from "../../data/loyalty/get-senarios-grid.model";
import { ProductGroup } from "../../data/loyalty/product-group.model";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { callGetService, callPostService } from "./BaseService";

@Injectable({ providedIn: 'root' })
export class BaseInfoService
{
  constructor(
    public http: HttpClient,
    public settingService: SettingsService,
    public uiService: UiService)
  {
    this.applyOnType$.next(this.applyOnType);
  }

  private unsubscribe = new Subject<void>();
  destroy()
  {
    // Emit something to stop all Observables
    // this.unsubscribe.next();
    // // Complete the notifying Observable to remove it
    // this.unsubscribe.complete();

    // this.senarioDiscountCodePatterns$?.complete();
    // this.commissionsBasis$?.complete();
    // this.scoresVolumes$?.complete();
    // this.activitiesCount$?.complete();
    // this.activity$?.complete();
    // this.brands$?.complete();
    // this.brandsSingle$?.complete();
    // this.userTypes$?.complete();
    // this.userTypesSinle$?.complete();
    // this.customerGroups$?.complete();
    // this.products$?.complete();
    // this.scenarios$?.complete();
    // this.customerLevel$?.complete();
    // this.productGroups$?.complete();
    // this.productGroups = [];
    // this.productGroupsSingle$?.complete();
    // this.applyOnType$?.complete();
    // this.freeProducts$?.complete();
    // this.generalCustomers$?.complete();
    // this.generalCustomers = [];
    // this.generalCustomersByBrandId$?.complete();
    // this.generalCustomersSingle$?.complete();
    // this.productCodes$?.complete();
    // this.allCampaigns$?.complete();

  }

  scenarioDiscountCodePatterns$ = new BehaviorSubject<Array<any>>([]);
  commissionsBasis$ = new BehaviorSubject<Array<number>>([]);
  scoresVolumes$ = new BehaviorSubject<Array<number>>([]);
  activitiesCount$ = new BehaviorSubject<Array<number>>([]);
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
  allCampaigns$ = new BehaviorSubject<Array<IdTitle>>([]);

  applyOnType: Array<EnumTitle> = [
    { id: 1, title: 'قیمت قبل از تخفیف کالا' },
    { id: 2, title: 'قیمت بعد از تخفیف کالا' },
    { id: 3, title: 'قیمت بعد از اعمال سناریو' },
  ];


  contractType: Array<EnumTitle> = [
    { id: 1, title: 'دبیر' },
    { id: 2, title: 'توضیع کننده' },
    { id: 3, title: 'فروشگاه' },
  ];

  RestPeriodTypeList: Array<EnumTitle> = [
    {
      id: 1,
      title: 'یک ماهه'
    },
    {
      id: 2,
      title: 'دو ماهه'
    },
    {
      id: 3,
      title: 'سه ماهه'
    },
    {
      id: 4,
      title: 'شش ماهه'
    },
    {
      id: 5,
      title: 'دوازده ماهه'
    }
  ];



  loadBaseInfo(callback?: any, brandIds: Array<string> = [], productIds: Array<string> = []): void
  {
    if (!brandIds || brandIds.length === 0 || brandIds.some(p => p === 'all'))
    {
      brandIds = [];
    }

    const requests: any = {
      activity: this.getActivity(),
      brands: this.getBrands(),
      userTypes: this.getUserTypes(),
      customerGroups: this.getCustomerGroups(),
      products: this.getProducts(),
      generalCustomers: this.getGeneralCustomer({ text: '', brandIds: [] })
    };

    requests.productGroups = this.getProductGroupsByBrandIds(brandIds);
    requests.scenarioDiscountCodePatterns = this.GetScenarioDiscountCodePatternsByBrandIds(brandIds);

    if (productIds?.length > 0)
    {
      requests.freeProducts = this.getFreeProducts(productIds);
    }

    forkJoin(requests).pipe(takeUntil(this.unsubscribe)).subscribe(result =>
    {
      const resultValue = result as any;
      const defArray = [{ id: 'all', title: 'همه' }];
      const defArrayType = [{ id: 'all', title: 'همه', type: 4 }];
      this.activity$.next(resultValue?.activity === null ? [] : resultValue?.activity);
      this.brands$.next(resultValue?.brands === null ? defArray : resultValue?.brands.concat(defArray));
      this.brandsSingle$.next(resultValue?.brands === null ? [] : resultValue?.brands);
      this.userTypes$.next(resultValue?.userTypes === null ? defArray : resultValue?.userTypes.concat(defArray));
      this.userTypesSinle$.next(resultValue?.userTypes === null ? [] : resultValue?.userTypes);
      this.customerGroups$.next(resultValue?.customerGroups === null ? [] : resultValue?.customerGroups);
      this.products$.next(resultValue?.products === null ? [] : resultValue?.products);
      const generalCustomers = resultValue?.generalCustomers === null ? defArrayType : resultValue?.generalCustomers.concat(defArrayType);
      this.generalCustomers$.next(generalCustomers);
      this.generalCustomersByBrandId$.next(resultValue?.generalCustomers === null ? defArrayType : resultValue?.generalCustomers.concat(defArrayType));
      this.generalCustomersSingle$.next(resultValue?.generalCustomers === null ? [] : resultValue?.generalCustomers);

      const productGroups = resultValue?.productGroups === null ? defArray : resultValue?.productGroups.concat(defArray);
      this.productGroups$.next(productGroups);
      this.productGroupsSingle$.next(resultValue?.productGroups === null ? [] : resultValue?.productGroups);
      this.scenarioDiscountCodePatterns$.next(resultValue?.scenarioDiscountCodePatterns === null ? [] : resultValue?.scenarioDiscountCodePatterns);

      if (productIds?.length > 0)
      {
        this.freeProducts$.next(resultValue?.freeProducts === null ? [] : resultValue?.freeProducts);
      }
      if (callback)
      {
        callback();
      }
    });
  }

  loadScenario()
  {
    this.getScenario().pipe(takeUntil(this.unsubscribe)).subscribe(value =>
    {
      if (!value) { value = []; }
      this.scenarios$.next(value);
    });
  }

  loadCustomerLevel()
  {
    this.getCustomerLevel().pipe(takeUntil(this.unsubscribe)).subscribe(value =>
    {
      if (!value) { value = []; }
      this.customerLevel$.next(value);
    });
  }

  loadAllCampaigns()
  {
    this.GetAllCampaigns().pipe(takeUntil(this.unsubscribe)).subscribe(value =>
    {
      if (!value) { value = []; }
      this.allCampaigns$.next(value);
    });
  }

  loadScoresVolumes()
  {
    this.GetAllScoresVolume().pipe(takeUntil(this.unsubscribe)).subscribe(value =>
    {
      if (!value?.score)
      {
        this.scoresVolumes$.next([]);
        return;
      }
      this.scoresVolumes$.next(value.score);
    });
  }

  loadActivitiesCount()
  {
    this.GetAllActivitiesCount().pipe(takeUntil(this.unsubscribe)).subscribe(value =>
    {
      if (!value?.activitiesCount)
      {
        this.activitiesCount$.next([]);
        return;
      }
      this.activitiesCount$.next(value.activitiesCount);
    });
  }

  loadComissions()
  {
    this.GetAllCommissionsBasis().pipe(takeUntil(this.unsubscribe)).subscribe(value =>
    {
      if (!value?.commissionsBasis)
      {
        this.commissionsBasis$.next([]);
        return;
      }
      this.commissionsBasis$.next(value.commissionsBasis);

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

  getGeneralCustomer(request: { text: string, brandIds: Array<string>; })
  {
    if (!request.brandIds || request.brandIds.length === 0 || request.brandIds.some(p => p === 'all'))
    {
      request.brandIds = [];
    }

    const url = this.settingService.settings?.baseUrl + 'Group/GetCustomerDrpDown';
    return callPostService<Array<IdTitleTypeBrandId> | null>(url, this.http, this.uiService, request);
  }

  GetAllCommissionsBasis()
  {
    const url = this.settingService.settings?.baseUrl + 'PromoterDiscountSetting/GetAllCommissionsBasis';
    return callGetService<any>(url, this.http, this.uiService);
  }

  GetAllCampaigns()
  {
    const url = this.settingService.settings?.baseUrl + 'Campaign/GetAllCampaigns';
    return callGetService<Array<IdTitle>>(url, this.http, this.uiService);
  }

  GetAllScoresVolume()
  {
    const url = this.settingService.settings?.baseUrl + 'CustomerGroupAndLevelRule/GetAllScoresVolume';
    return callGetService<any>(url, this.http, this.uiService);
  }

  GetAllActivitiesCount()
  {
    const url = this.settingService.settings?.baseUrl + 'CustomerGroupAndLevelRule/GetAllActivitiesCount';
    return callGetService<any>(url, this.http, this.uiService);
  }

  GetScenarioDiscountCodePatternsByBrandIds(brandIds: Array<string>): Observable<Array<IdTitle>>
  {
    const url = this.settingService.settings?.baseUrl + 'DiscountCode/GetSenarioDiscountCodePatterns';
    if (!brandIds || brandIds.length === 0 || brandIds.some(p => p === 'all'))
    {
      return callPostService<any>(url, this.http, this.uiService, {});
    }
    return callPostService<any>(url, this.http, this.uiService, { brandIds: brandIds });
  }
}


