import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject, forkJoin } from 'rxjs';
import { Activity } from "../../data/loyalty/activity.model";
import { createBehavioralRewardFormGroup } from "../../data/loyalty/behavioral-reward.model";
import { Brand } from "../../data/loyalty/brand.model";
import { CustomerGroup } from "../../data/loyalty/customer-group.model";
import { BehavioralRewardType, SenarioType } from "../../data/loyalty/enums.model";
import { FreeProduct } from "../../data/loyalty/free-product.model";
import { createPeriodFormGroup } from "../../data/loyalty/period.model";
import { ProductGroup } from "../../data/loyalty/product-group.model";
import { Product } from "../../data/loyalty/product.model";
import { createPurchaseRewardFormGroup } from "../../data/loyalty/purchase-reward.model";
import { Scenario, scenarioInit } from "../../data/loyalty/scenario.model";
import { UserType } from "../../data/loyalty/user-type.model";
import { Utility } from '../../utils/Utility';
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { BaseInfoService } from "./base-info.service";
import { callGetService, callPostService } from "./BaseService";

@Injectable({ providedIn: 'root' })
export class ScenarioService
{

  startDate = new Date().valueOf();
  endDate = new Date().valueOf();
  expierDate = new Date().valueOf();

  activity$ = new BehaviorSubject<Array<Activity>>([]);
  brands$ = new BehaviorSubject<Array<Brand>>([]);
  userTypes$ = new BehaviorSubject<Array<UserType>>([]);
  customerGroups$ = new BehaviorSubject<Array<CustomerGroup>>([]);
  products$ = new BehaviorSubject<Array<Product>>([]);

  productGroups$ = new BehaviorSubject<Array<ProductGroup>>([]);
  freeProducts$ = new BehaviorSubject<Array<FreeProduct>>([]);

  scenarios$ = new BehaviorSubject<Array<Scenario>>([]);

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private baseInfoService: BaseInfoService, public http: HttpClient,
    public settingService: SettingsService,
    public uiService: UiService)
  {
    this.form = this.formBuilder.group({});
    this.createForm(scenarioInit);
  }

  createForm(scenario: Scenario)
  {
    this.form = this.formBuilder.group({
      id: [scenario.id, [Validators.required]],
      title: [scenario.title, [Validators.required]],

      senarioType: [scenario.senarioType, [Validators.required]],
      purchaseRoundType: [scenario.purchaseRoundType, [Validators.required]],

      brandIds: [scenario.brandIds, [Validators.required]],
      productGroupIds: [scenario.productGroupIds, [Validators.required]],
      customerGroupIds: [scenario.customerGroupIds, [Validators.required]],
      userTypeIds: [scenario.userTypeIds, [Validators.required]],
      productDiscountProductGroupIds: [scenario.productDiscountProductGroupIds, [Validators.required]],
      freeProductIds: [scenario.freeProductIds, [Validators.required]],

      periodMin: createPeriodFormGroup(scenario.periodMin, this.formBuilder),
      periodMax: createPeriodFormGroup(scenario.periodMax, this.formBuilder),
      behavioralReward: createBehavioralRewardFormGroup(scenario.behavioralReward, this.formBuilder),
      purchaseReward: createPurchaseRewardFormGroup(scenario.purchaseReward, this.formBuilder),

      purchaseAmountMin: [scenario.purchaseAmountMin, [Validators.required]],
      purchaseAmountMax: [scenario.purchaseAmountMax, [Validators.required]],
      purchaseRound: [scenario.purchaseRound, [Validators.required]],
      purchaseRound2: [scenario.purchaseRound2, [Validators.required]],

      activityId: [scenario.activityId, [Validators.required]],

    });

    this.form.controls['brandIds'].valueChanges.subscribe(value =>
    {
      this.baseInfoService.getProductGroupsByBrandIds(value).subscribe(productGroups =>
      {
        this.productGroups$.next(productGroups);
      });
    });
  }


  loadBaseInfo(brandIds: Array<string> = [], productIds: Array<string> = [])
  {
    const requests: any = {
      activity: this.baseInfoService.getActivity(),
      brands: this.baseInfoService.getBrands(),
      userTypes: this.baseInfoService.getUserTypes(),
      customerGroups: this.baseInfoService.getCustomerGroups(),
      products: this.baseInfoService.getProducts(),
    };
    if (brandIds?.length > 0)
    {
      requests.productGroups = this.baseInfoService.getProductGroupsByBrandIds(brandIds);
    }

    if (productIds?.length > 0)
    {
      requests.freeProducts = this.baseInfoService.getFreeProducts(productIds);
    }

    forkJoin(requests).subscribe(resutl =>
    {
      const resultValue = resutl as any;
      this.activity$.next(resultValue.activity);
      this.brands$.next(resultValue.brands);
      this.userTypes$.next(resultValue.userTypes);
      this.customerGroups$.next(resultValue.customerGroups);
      this.products$.next(resultValue.products);
      if (brandIds?.length > 0)
      {
        this.productGroups$.next(resultValue.productGroups);
      }
      if (productIds?.length > 0)
      {
        this.freeProducts$.next(resultValue.freeProducts);
      }
    });
  }

  getProductGroupsByBrandIds(brandIds: Array<string> = [])
  {
    return this.baseInfoService.getProductGroupsByBrandIds(brandIds);
  }

  getFreeProducts(productIds: Array<string> = [])
  {
    return this.baseInfoService.getFreeProducts(productIds);
  }


  onSelectStartDate = (shamsiDate: string, gregorianDate: string, timestamp: number): void =>
  {
    this.updatePeriodFormControl(shamsiDate, 'periodMin');
  };

  updatePeriodFormControl = (shamsiDate: string, formControlName: string): void =>
  {
    const date = shamsiDate.substring(0, 10)?.split('/');
    const time = shamsiDate.substring(11, shamsiDate.length)?.split(':');
    if (date && date.length === 3)
    {
      this.form.get(`${ formControlName }.year`)?.setValue(parseInt(date[0], 0));
      this.form.get(`${ formControlName }.month`)?.setValue(parseInt(date[1], 0));
      this.form.get(`${ formControlName }.day`)?.setValue(parseInt(date[2], 0));
    }

    if (time && time.length === 3)
    {
      this.form.get(`${ formControlName }.hours`)?.setValue(parseInt(time[0], 0));
      this.form.get(`${ formControlName }.minutes`)?.setValue(parseInt(time[1], 0));
      this.form.get(`${ formControlName }.seconds`)?.setValue(parseInt(time[2], 0));
    }
  };

  behavioralRewardTypeChange($event: number)
  {
    if ($event === 1)
    {
      this.form.get(`behavioralReward.behavioralRewardType`)?.setValue(BehavioralRewardType.UserHimself);
      return;
    }
    this.form.get(`behavioralReward.behavioralRewardType`)?.setValue(BehavioralRewardType.ThirdParty);
  }

  onSelectEndDate = (shamsiDate: string, gregorianDate: string, timestamp: number): void =>
  {
    this.updatePeriodFormControl(shamsiDate, 'periodMax');
  };

  onSelectExpierDate = (shamsiDate: string, gregorianDate: string, timestamp: number): void =>
  {
    if (this.getValue('senarioType') === SenarioType.Behavioral)
    {
      this.updatePeriodFormControl(shamsiDate, 'behavioralReward.discountCodeDate');
      return;
    }
    this.updatePeriodFormControl(shamsiDate, 'purchaseReward.discountCodeDate');
  };

  getScenarios(pageSize: number, pageIndex: number)
  {
    const url = this.settingService.settings?.baseUrl + 'Senario/GetAllSenarios';
    return callGetService<Array<Scenario>>(url, this.http, this.uiService, {
      pageSize: pageSize, pageIndex: pageIndex
    }).subscribe(value =>
    {
      this.scenarios$.next(value);
    });
  }

  submit(): void
  {
    console.log(this.form.value);
    const option = Utility.isNullOrEmpty(this.getValue('id')) ? 'Create' : 'Edit';
    const url = this.settingService.settings?.baseUrl + `Senario/${ option }`;

    callPostService<Scenario>(url, this.http, this.uiService, this.form.value).subscribe(value =>
    {
      this.form.controls['id'].setValue(value?.id);
    });

  }

  getValue(name: string)
  {
    return this.form.get(name)?.value;
  }

  getFormGroup(fgName: string): FormGroup
  {
    return (this.form.controls[fgName] as any);
  }
}
