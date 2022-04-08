import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { BehaviorSubject } from 'rxjs';
import { BehavioralReward, createBehavioralRewardFormGroup } from "../../data/loyalty/behavioral-reward.model";
import { BehavioralRewardType, SenarioType, SenarioStatusType } from '../../data/loyalty/enums.model';
import { GetSenarios as SenarioDetail, IdTitleType } from "../../data/loyalty/get-senarios-grid.model";
import { createPeriodFormGroup } from "../../data/loyalty/period.model";
import { ProductGroup } from "../../data/loyalty/product-group.model";
import { createPurchaseRewardFormGroup, PurchaseReward } from "../../data/loyalty/purchase-reward.model";
import { Scenario, scenarioInit } from "../../data/loyalty/scenario.model";
import { Utility } from '../../utils/Utility';
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { BaseInfoService } from "./base-info.service";
import { BaseService, callGetService, callPostService } from "./BaseService";

@Injectable({ providedIn: 'root' })
export class ScenarioService extends BaseService<Scenario>
{

  scenarios$ = new BehaviorSubject<Array<SenarioDetail>>([]);

  addFreeProduct(term: string) {
    if (term && new RegExp(Utility.numberRegEx).test(term)) {
      return term;
    }
    // this.uiService.showSnackBar('کد تخفیف باید عدد 7 رقمی باشد.', '', 3000);
    this.uiService.alert('کد تخفیف باید عدد 7 رقمی باشد.');
    return null;
  }

  addCustomer(term: string) {
    if (term && new RegExp(Utility.mobileRegEx).test(term)) {
      return { id: term, title: term, type: 3 };
    }
    this.uiService.alert('شماره موبایل معتبر نمیباشد.');
    return null;
  }

  addProductGroups(term: string) {
    if (term && new RegExp(Utility.numberRegEx).test(term) && term.length === 7) {
      return { id: term, title: term, type: 3 };
    }
    return null;
  }

  constructor(public override formBuilder: FormBuilder,
    private baseInfoService: BaseInfoService,
    public http: HttpClient,
    public settingService: SettingsService,
    public uiService: UiService) {
    super(formBuilder, scenarioInit);
  }

  createForm(scenario: Scenario) {
    this.form = this.formBuilder.group({
      id: [scenario.id, [Validators.required]],
      title: [scenario.title, [Validators.required]],
      senarioType: [scenario.senarioType, [Validators.required]],
      purchaseRoundType: [scenario.purchaseRoundType, [Validators.required]],
      brandIds: [scenario.brandIds.length === 0 && scenario.id ? ['all'] : scenario.brandIds, [Validators.required]],
      productGroupIds: [scenario.productGroupIds.length === 0 && scenario.id ? ['all'] : scenario.productGroupIds, [Validators.required]],
      customerGroupIds: [scenario.customerGroupIds, [Validators.required]],
      campaignIds: [scenario.campaignIds, [Validators.required]],
      phones: [scenario.phones, [Validators.required]],
      userTypeIds: [scenario.userTypeIds.length === 0 && scenario.id ? ['all'] : scenario.userTypeIds, [Validators.required]],
      discountedProductGroupIds: [scenario.discountedProductGroupIds, [Validators.required]],
      discountedProductCodes: [scenario.discountedProductCodes, [Validators.required]],
      freeProductCodes: [scenario.freeProductCodes, [Validators.required]],
      startDate: [Utility.getFullDateTimeFromPeriodInPersion(scenario.periodMin), [Validators.required]],
      endDate: [Utility.getFullDateTimeFromPeriodInPersion(scenario.periodMax), [Validators.required]],
      periodMin: createPeriodFormGroup(scenario.periodMin, this.formBuilder),
      periodMax: createPeriodFormGroup(scenario.periodMax, this.formBuilder),
      behavioralReward: createBehavioralRewardFormGroup(scenario.behavioralReward, this.formBuilder),
      purchaseReward: createPurchaseRewardFormGroup(scenario.purchaseReward, this.formBuilder),

      purchaseAmountMin: [scenario.purchaseAmountMin, [Validators.required]],
      purchaseAmountMax: [scenario.purchaseAmountMax, [Validators.required]],
      purchaseRound: [scenario.purchaseRoundType !== 3 ? scenario.purchaseRound : 0, [Validators.required]],
      purchaseRound1: [scenario.purchaseRoundType === 1 ? scenario.purchaseRound : 0, [Validators.required]],
      purchaseRound2: [scenario.purchaseRoundType === 2 ? scenario.purchaseRound : 0, [Validators.required]],

      activityId: [scenario.activityId, [Validators.required]],
      generalCustomers: [[scenario.id && (scenario.customerGroupIds.length === 0 && scenario.campaignIds.length === 0 && scenario.phones.length === 0) ? ['all'] : []], [Validators.required]],
      productGroups: [[scenario.id && (scenario.discountedProductGroupIds.length === 0 && scenario.discountedProductCodes.length === 0) ? ['all'] : []], [Validators.required]],


    });

    if (scenario.id && (scenario.discountedProductGroupIds.length === 0 && scenario.discountedProductCodes.length === 0)) { } else {
      const scenarioProductGroups = new Array<ProductGroup>();
      const productGroups = this.baseInfoService?.productGroups$?.getValue();
      [...scenario.discountedProductGroupIds, ...scenario.discountedProductCodes].forEach((p: string) => {
        const productGroup = productGroups.find(customer => customer.id === p);
        if (!productGroup || productGroup.id === productGroup.title) {
          scenarioProductGroups.push({ id: p, title: p, brandId: 'null' });
          return;
        }
        scenarioProductGroups.push(productGroup);
      });

      this.setValue('productGroups', scenarioProductGroups.map(p => p.id));

      if (scenarioProductGroups.length > 0) {
        const data = this.baseInfoService?.productGroups$?.getValue()?.concat(scenarioProductGroups.filter(p => p.id === p.title));
        this.baseInfoService?.productGroups$?.next(data);
      }

      this.form.get('behavioralReward.discountCodePercent')?.valueChanges.subscribe(value => {
        this.percentValidation(value);
      });

      this.form.get('behavioralReward.refundToWalletPercent')?.valueChanges.subscribe(value => {
        this.percentValidation(value);
      });

      this.form.get('purchaseReward.productDiscountPercent')?.valueChanges.subscribe(value => {
        this.percentValidation(value);
      });
      /*** */
      this.form.get('purchaseReward.refundPercent')?.valueChanges.subscribe(value => {
        this.percentValidation(value);
      });

      this.form.get('purchaseReward.increaseScorePercent')?.valueChanges.subscribe(value => {
        this.percentValidation(value);
      });
      this.form.get('purchaseReward.sendingDiscount')?.valueChanges.subscribe(value => {
        this.percentValidation(value);
      });
      this.form.get('purchaseReward.basketDiscountPercent')?.valueChanges.subscribe(value => {
        this.percentValidation(value);
      });
    }

    const scenarioGeneralCustomers = new Array<IdTitleType>();
    if (scenario.id && (scenario.customerGroupIds.length === 0 && scenario.campaignIds.length === 0 && scenario.phones.length === 0)) {
      this.setValue('generalCustomers', ['all']);
    } else {
      const generalCustomers = this.baseInfoService?.generalCustomers$?.getValue();
      [...scenario.customerGroupIds, ...scenario.campaignIds, ...scenario.phones].forEach((p: string) => {
        const generalCustomer = generalCustomers.find(customer => customer.id === p);
        if (!generalCustomer || generalCustomer.type === 3) {
          scenarioGeneralCustomers.push({ id: p, title: p, type: 3 });
          return;
        }
        scenarioGeneralCustomers.push(generalCustomer);
      });

      this.setValue('generalCustomers', scenarioGeneralCustomers.map(p => p.id));

      if (scenarioGeneralCustomers.length > 0) {
        const data = this.baseInfoService?.generalCustomers$?.getValue()?.concat(scenarioGeneralCustomers.filter(p => p.type === 3));
        this.baseInfoService?.generalCustomers$?.next(data);
      }
    }

    this.form.controls['brandIds'].valueChanges.subscribe((value: Array<string>) => {
      this.baseInfoService.getProductGroupsByBrandIds(value).subscribe(productGroups => {
        const defArray: Array<ProductGroup> = [{ id: 'all', title: 'همه', brandId: '' }];
        if (!productGroups) { productGroups = []; }
        this.baseInfoService.productGroupsSingle$.next(productGroups);
        productGroups = productGroups.concat(defArray);
        this.baseInfoService.productGroups$.next(productGroups);
      });
      this.form.controls['freeProductCodes'].enable();
      this.form.controls['addFreeProductReward'].enable();
      if (value.length > 1 || (value.length === 1 && value[0] === 'all')) {
        this.form.controls['freeProductCodes'].setValue([]);
        this.form.controls['freeProductCodes'].disable();//addFreeProductReward
        this.form.controls['addFreeProductReward'].setValue(false);
        this.form.controls['addFreeProductReward'].disable();

      }
    });
    this.form.markAllAsTouched();
  }
  percentValidation(value: number): boolean {
    if (value > 100 || value < 0) {
      this.uiService.alert('لطفا برای اقلام درصدی مقدار صحیح از صفر تا 100 را وارد نمایید.');
      return false;
    }
    return true;
  }

  getProductGroupsByBrandIds(brandIds: Array<string> = []) {
    return this.baseInfoService.getProductGroupsByBrandIds(brandIds);
  }

  getFreeProducts(productIds: Array<string> = []) {
    return this.baseInfoService.getFreeProducts(productIds);
  }

  behavioralRewardTypeChange($event: boolean) {
    if ($event) {
      this.form.get(`behavioralReward.behavioralRewardType`)?.setValue(BehavioralRewardType.UserHimself);
      return;
    }
    this.form.get(`behavioralReward.behavioralRewardType`)?.setValue(BehavioralRewardType.ThirdParty);
  }

  getScenarios(pageSize: number, pageIndex: number) {
    const url = this.settingService.settings?.baseUrl + 'Senario/GetAllSenarios';
    return callGetService<Array<SenarioDetail>>(url, this.http, this.uiService, {
      pageSize: pageSize, pageIndex: pageIndex
    }).subscribe(value => {
      if (!value) {
        value = [];
      }
      this.scenarios$.next(value);
    });
  }

  getSenariosGrid(
    pageSize: number,
    pageIndex: number,
    brandIds: Array<string> = [],
    groupIds: Array<string> = [],
    campaignIds: Array<string> = [],
    phones: Array<string> = [],
    fromDate: string = '',
    toDate: string = '',
    status: SenarioStatusType = SenarioStatusType.Enable,
  ) {
    const url = this.settingService.settings?.baseUrl + 'Senario/GetSenariosGrid';
    return callGetService<Array<SenarioDetail>>(url, this.http, this.uiService, {
      pageSize: pageSize, pageIndex: pageIndex, brandIds: brandIds, fromDate: fromDate, groupIds: groupIds, campaignIds: campaignIds, phones: phones, status: status
    }).subscribe(value => {
      if (!value) {
        value = [];
      }
      this.scenarios$.next(value);
    });
  }

  getScenarioById(id: string) {
    const url = this.settingService.settings?.baseUrl + 'Senario/GetSenarioById';
    return callGetService<Scenario>(url, this.http, this.uiService, {
      senarioId: id
    });
  }

  submit(): void {
    console.log(this.form.value);
    this.uiService.alertService.clearAllMessages();
    const option = Utility.isNullOrEmpty(this.getValue('id')) ? 'Create' : 'Edit';
    const url = this.settingService.settings?.baseUrl + `Senario/${option}`;

    if (!this.updatePeriodFormControl(this.getValue('startDate'), 'periodMin') ||
      !this.updatePeriodFormControl(this.getValue('endDate'), 'periodMax')) {
      this.uiService.alert('بازه زمانی را وارد نمایید.');
      return;
    }

    if (this.getValue('senarioType') === SenarioType.Purchase) {
      this.updatePeriodFormControl(this.getValue('purchaseReward.expierDate'), 'purchaseReward.discountCodeDate');

      const purchaseReward: PurchaseReward = this.getValue('purchaseReward');
      if (!purchaseReward.sendingDiscountReward
        && !purchaseReward.basketDiscountReward
        && !purchaseReward.productDiscountReward
        && !purchaseReward.addFreeProductReward
        && !purchaseReward.refundReward
        && !purchaseReward.increasScoreReward
        && !purchaseReward.discountCodeReward) {
        this.uiService.alert('انتخاب حداقل یکی از گزینه های جوایز الزامی است.');
        return;
      }

      if (!this.form.value.productGroupIds || this.form.value.productGroupIds.length === 0) {
        this.uiService.alert('تگ کالا را مشخص نمایید.');
        return;
      }
    } else {
      this.updatePeriodFormControl(this.getValue('behavioralReward.expierDate'), 'behavioralReward.discountCodeDate');

      const purchaseReward: BehavioralReward = this.getValue('behavioralReward');
      if (!purchaseReward.refundReward
        && !purchaseReward.increasScoreReward
        && !purchaseReward.discountCodeReward) {
        this.uiService.alert('انتخاب حداقل یکی از گزینه های جوایز الزامی است.');
        return;
      }

      if (!this.form.value.activityId || this.form.value.activityId.length === 0) {
        this.uiService.alert('فعالیت را مشخص نمایید.');
        return;
      }
    }

    if (this.getValue('purchaseRoundType') === 1) {
      this.form.controls['purchaseRound'].setValue(Number(this.getValue('purchaseRound1')));
    }
    else if (this.getValue('purchaseRoundType') === 2) {
      this.form.controls['purchaseRound'].setValue(Number(this.getValue('purchaseRound2')));
    } else {
      this.form.controls['purchaseRound'].setValue(0);
    }
    const value = this.form.value;

    if (!this.percentValidation(value.behavioralReward.discountCodePercent)) {
      return;
    } else if (!this.percentValidation(value.behavioralReward.refundToWalletPercent)) {
      return;
    } else if (!this.percentValidation(value.purchaseReward.productDiscountPercent)) {
      return;
    } else if (!this.percentValidation(value.purchaseReward.refundPercent)) {
      return;
    } else if (!this.percentValidation(value.purchaseReward.increaseScorePercent)) {
      return;
    } else if (!this.percentValidation(value.purchaseReward.sendingDiscount)) {
      return;
    } else if (!this.percentValidation(value.purchaseReward.basketDiscountPercent)) {
      return;
    }

    if (!value.title) {
      this.uiService.alert('نام سناریو را وارد نمایید.');
      return;
    }

    if (!value.brandIds || value.brandIds.length === 0) {
      this.uiService.alert('برند را مشخص نمایید.');
      return;
    }

    if (!value.userTypeIds || value.userTypeIds.length === 0) {
      this.uiService.alert('نوع کاربری را مشخص نمایید.');
      return;
    }

    if (!value.generalCustomers || value.generalCustomers.length === 0) {
      this.uiService.alert('مشتری را مشخص نمایید.');
      return;
    }

    if (value.senarioType === SenarioType.Purchase) {
      delete value.activityId;
    }

    value.customerGroupIds = [];
    value.campaignIds = [];
    value.phones = [];
    const generalCustomers = this.baseInfoService.generalCustomers$.getValue();

    [...value.generalCustomers].forEach((p: string) => {
      const generalCustomer = generalCustomers.find(customer => customer.id === p);
      if (!generalCustomer) {
        value.phones.push(p);
        return;
      }
      switch (generalCustomer?.type) {
        case 1: { value.customerGroupIds.push(p); break; }
        case 2: { value.campaignIds.push(p); break; }
        default: { value.phones.push(p); break; }
      }
    });

    if (value.generalCustomers.some((p: string) => p === 'all')) {
      value.customerGroupIds = [];
      value.campaignIds = [];
      value.phones = [];
    }

    delete value.generalCustomers;

    value.discountedProductGroupIds = [];
    value.discountedProductCodes = [];
    const productGroups = this.baseInfoService.productGroups$.getValue();

    [...value.productGroups].forEach((p: string) => {
      const productGroup = productGroups.find(a => a.id === p);
      if (!productGroup) {
        value.discountedProductCodes.push(p);
        return;
      }
      value.discountedProductGroupIds.push(p);
    });

    if (value.productGroupIds.some((p: string) => p === 'all')) {
      value.discountedProductGroupIds = [];
      value.discountedProductCodes = [];
      value.productGroupIds = [];
    }

    delete value.productGroups;

    if (value.brandIds.some((p: string) => p === 'all')) {
      value.brandIds = [];
    }

    if (value.userTypeIds.some((p: string) => p === 'all')) {
      value.userTypeIds = [];
    }

    if (this.getValue('senarioType') === SenarioType.Purchase) {
      delete value.behavioralReward;
    } else {
      delete value.purchaseReward;
      delete value.discountedProductCodes;
      delete value.discountedProductGroupIds;
      delete value.freeProductCodes;
      delete value.productGroupIds;
    }

    if (Utility.isNullOrEmpty(value.id)) { delete value.id; }

    console.log(value);
    callPostService<Scenario>(url, this.http, this.uiService, value).subscribe(value => {
      this.form.controls['id'].setValue(value?.id);
      this.uiService.success('با موفقیت ثبت شد.');
      setTimeout(() => { this.uiService.alertService.clearAllMessages(); }, 1500);

    });

  }
}
