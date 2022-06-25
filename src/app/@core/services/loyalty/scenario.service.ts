import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { BehaviorSubject } from 'rxjs';
import { BehavioralReward, createBehavioralRewardFormGroup } from "../../data/loyalty/behavioral-reward.model";
import { BehavioralRewardType, SenarioType } from '../../data/loyalty/enums.model';
import { GetSenarios as SenarioDetail, IdTitleTypeBrandId } from "../../data/loyalty/get-senarios-grid.model";
import { createPeriodFormGroup } from "../../data/loyalty/period.model";
import { ProductGroup } from "../../data/loyalty/product-group.model";
import { createPurchaseRewardFormGroup, PurchaseReward } from "../../data/loyalty/purchase-reward.model";
import { Scenario, scenarioInit } from "../../data/loyalty/scenario.model";
import { GetAllSenarios } from "../../data/loyalty/scenario/get-all-scenarios.model";
import { Utility } from '../../utils/Utility';
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { BaseInfoService } from "./base-info.service";
import { BaseService, callGetService, callPostPagingService, callPostService, isValidProductCode } from "./BaseService";

@Injectable({ providedIn: 'root' })
export class ScenarioService extends BaseService<Scenario>
{

  scenarios$ = new BehaviorSubject<Array<SenarioDetail>>([]);

  constructor(public override formBuilder: FormBuilder,
    public override baseInfoService: BaseInfoService,
    public http: HttpClient,
    public settingService: SettingsService,
    public override uiService: UiService)
  {
    super(formBuilder, uiService, baseInfoService, scenarioInit);
  }

  createForm(scenario: Scenario)
  {
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
      discountedProductCodes: [scenario.discountedProductCodes?.filter(p => !Utility.isNullOrEmpty(p?.toString()) && isValidProductCode(p?.toString())), [Validators.required]],
      freeProductCodes: [scenario.freeProductCodes?.filter(p => !Utility.isNullOrEmpty(p?.toString()) && isValidProductCode(p?.toString())), []],
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
      generalCustomers: [[scenario.id && (scenario?.customerGroupIds?.length === 0 && scenario?.campaignIds?.length === 0 && scenario?.phones?.length === 0) ? ['all'] : []], [Validators.required]],
      productGroups: [[scenario.id && (scenario?.discountedProductGroupIds?.length === 0 && scenario?.discountedProductCodes?.length === 0) ? ['all'] : []], []],


    });

    this.baseInfoService?.productCodes$?.next(scenario.freeProductCodes.concat(scenario.discountedProductCodes));

    if (scenario.id && (scenario.discountedProductGroupIds.length === 0 && scenario.discountedProductCodes.length === 0)) { } else
    {
      const data = scenario.discountedProductGroupIds.concat(scenario.discountedProductCodes);
      const formControlName = 'productGroups';
      const productGroups = this.baseInfoService?.productGroups$?.getValue();

      this.updateProductGroupsIdCode(data, productGroups, formControlName);
    }

    this.form.get('behavioralReward.discountCodePercent')?.valueChanges.subscribe(value =>
    {
      this.percentValidation(value);
    });

    this.form.get('behavioralReward.refundToWalletPercent')?.valueChanges.subscribe(value =>
    {
      this.percentValidation(value);
    });

    this.form.get('purchaseReward.productDiscountPercent')?.valueChanges.subscribe(value =>
    {
      this.percentValidation(value);
    });
    /*** */
    this.form.get('purchaseReward.refundPercent')?.valueChanges.subscribe(value =>
    {
      this.percentValidation(value);
    });

    this.form.get('purchaseReward.increaseScorePercent')?.valueChanges.subscribe(value =>
    {
      this.percentValidation(value);
    });
    this.form.get('purchaseReward.sendingDiscount')?.valueChanges.subscribe(value =>
    {
      this.percentValidation(value);
    });
    this.form.get('purchaseReward.basketDiscountPercent')?.valueChanges.subscribe(value =>
    {
      this.percentValidation(value);
    });


    this.updateGeneralCustomer(scenario);

    this.form.controls['brandIds'].valueChanges.subscribe((value: Array<string>) =>
    {
      const generalCustomers = this.getCustomerByBrandId(value);
      this.baseInfoService?.generalCustomersByBrandId$?.next(generalCustomers);
      this.baseInfoService?.getProductGroupsByBrandIds(value)?.subscribe(productGroups =>
      {
        const defArray: Array<ProductGroup> = [{ id: 'all', title: 'همه', brandId: '' }];
        if (!productGroups) { productGroups = []; }
        this.baseInfoService.productGroupsSingle$.next(productGroups);
        productGroups = productGroups.concat(defArray);
        this.baseInfoService.productGroups$.next(productGroups);
      });

      this.form.controls['freeProductCodes'].enable();
      this.form.get('purchaseReward.addFreeProductReward')?.enable();
      if (value.length > 1 || (value.length === 1 && value[0] === 'all'))
      {
        this.form.controls['freeProductCodes'].setValue([]);
        this.form.controls['freeProductCodes'].disable();//addFreeProductReward
        this.form.get('purchaseReward.addFreeProductReward')?.setValue(false);
        this.form.get('purchaseReward.addFreeProductReward')?.disable();

      }

      this.form.get('purchaseReward.addFreeProductReward')?.valueChanges.subscribe(value =>
      {
        if (value)
        {
          this.form.controls['freeProductCodes'].setValidators([Validators.required]);
        } else
        {
          this.form.controls['freeProductCodes'].setValidators([]);
        }
      });

      this.baseInfoService?.GetSenarioDiscountCodePatternsByBrandIds(value)?.subscribe(codePattern =>
      {
        if (!codePattern) { codePattern = []; }
        this.baseInfoService.senarioDiscountCodePatterns$.next(codePattern);
      });

    });

    this.form.get('purchaseReward.productDiscountReward')?.valueChanges.subscribe(value =>
    {
      if (value)
      {
        this.form.get('productGroups')?.addValidators(Validators.required);
      } else
      {
        this.form.get('productGroups')?.clearValidators();
      }
      this.form.get('productGroups')?.updateValueAndValidity();
    });

    this.form.get('purchaseReward.addFreeProductReward')?.valueChanges.subscribe(value =>
    {
      if (value)
      {
        this.form.get('freeProductCodes')?.addValidators(Validators.required);
      }
      else
      {
        this.form.get('freeProductCodes')?.clearValidators();
      }
      this.form.get('freeProductCodes')?.updateValueAndValidity();
    });


    this.form.get('purchaseReward.discountCodeReward')?.valueChanges.subscribe(value =>
    {
      if (value)
      {
        this.form.get('purchaseReward.discountCodePattern')?.addValidators(Validators.required);
      }
      else
      {
        this.form.get('purchaseReward.discountCodePattern')?.clearValidators();
      }
      this.form.get('purchaseReward.discountCodePattern')?.updateValueAndValidity();
    });

    this.form.get('behavioralReward.discountCodeReward')?.valueChanges.subscribe(value =>
    {
      if (value)
      {
        this.form.get('behavioralReward.discountCodePattern')?.addValidators(Validators.required);
      }
      else
      {
        this.form.get('behavioralReward.discountCodePattern')?.clearValidators();
      }
      this.form.get('behavioralReward.discountCodePattern')?.updateValueAndValidity();
    });

    this.form.markAllAsTouched();
  }

  private updateGeneralCustomer(scenario: Scenario)
  {
    const scenarioGeneralCustomers = new Array<IdTitleTypeBrandId>();
    if (scenario.id && (scenario.customerGroupIds.length === 0 && scenario.campaignIds.length === 0 && scenario.phones.length === 0))
    {
      this.setValue('generalCustomers', ['all']);
    }
    else
    {
      const generalCustomers = this.getCustomerByBrandId(scenario.brandIds);
      this.baseInfoService?.generalCustomersByBrandId$?.next(generalCustomers);
      [...scenario.customerGroupIds, ...scenario.campaignIds, ...scenario.phones].forEach((p: string) =>
      {
        if (Utility.isNullOrEmpty(p)) { return; }
        const generalCustomer = generalCustomers.find(customer => customer.id === p);
        if (!generalCustomer || generalCustomer.type === 3)
        {
          scenarioGeneralCustomers.push({ id: p, title: p, type: 3, brandId: '' });
          return;
        }
        scenarioGeneralCustomers.push(generalCustomer);
      });

      this.setValue('generalCustomers', scenarioGeneralCustomers.map(p => p.id));

      if (scenarioGeneralCustomers.length > 0)
      {
        const data = this.baseInfoService?.generalCustomers$?.getValue()?.concat(scenarioGeneralCustomers.filter(p => p.type === 3));
        this.baseInfoService?.generalCustomers$?.next(data);
        this.baseInfoService?.generalCustomersByBrandId$?.next(data);
      }
    }
  }

  getCustomerByBrandId(brandIds: Array<string>): Array<IdTitleTypeBrandId>
  {
    return this.baseInfoService?.generalCustomers$?.getValue()?.filter(p => p.id === 'all' || brandIds.length === 0 || brandIds.findIndex(a => a === p.brandId) !== -1 || p.type !== 1);
  }

  percentValidation(valueStr: string): boolean
  {
    const value = Number(valueStr);
    if (value > 100 || value < 0)
    {
      this.uiService.alert('لطفا برای اقلام درصدی مقدار صحیح از صفر تا 100 را وارد نمایید.');
      return false;
    }
    return true;
  }

  getProductGroupsByBrandIds(brandIds: Array<string> = [])
  {
    return this.baseInfoService.getProductGroupsByBrandIds(brandIds);
  }

  getFreeProducts(productIds: Array<string> = [])
  {
    return this.baseInfoService.getFreeProducts(productIds);
  }

  behavioralRewardTypeChange($event: boolean)
  {
    if ($event)
    {
      this.form.get(`behavioralReward.behavioralRewardType`)?.setValue(BehavioralRewardType.UserHimself);
      return;
    }
    this.form.get(`behavioralReward.behavioralRewardType`)?.setValue(BehavioralRewardType.ThirdParty);
  }

  getSenariosGrid(
    request: GetAllSenarios
  )
  {
    const url = this.settingService.settings?.baseUrl + 'Senario/GetAllSenarios';

    return callPostPagingService<Array<SenarioDetail>>(url, this.http, this.uiService, request).subscribe(value =>
    {
      this.scenarios$.next([]);
      this.totalPages = 0;
      if (value?.data)
      {
        this.scenarios$.next(value?.data);
        this.totalPages = Math.ceil(value.pagination.total / request.pageSize);
      }
    });
  }

  getScenarioById(id: string)
  {
    const url = this.settingService.settings?.baseUrl + 'Senario/GetSenarioById';
    return callGetService<Scenario>(url, this.http, this.uiService, {
      senarioId: id
    });
  }

  submit(): void
  {
    console.log(this.form.value);
    this.uiService.alertService.clearAllMessages();
    const option = Utility.isNullOrEmpty(this.getValue('id')) ? 'Create' : 'Edit';
    const url = this.settingService.settings?.baseUrl + `Senario/${ option }`;

    if (!this.updatePeriodFormControl(this.getValue('startDate'), 'periodMin') ||
      !this.updatePeriodFormControl(this.getValue('endDate'), 'periodMax'))
    {
      this.uiService.alert('بازه زمانی را وارد نمایید.');
      return;
    }

    if (this.getValue('senarioType') === SenarioType.Purchase)
    {
      this.updatePeriodFormControl(this.getValue('purchaseReward.expierDate'), 'purchaseReward.discountCodeDate');

      const purchaseReward: PurchaseReward = this.getValue('purchaseReward');
      if (!purchaseReward.sendingDiscountReward
        && !purchaseReward.basketDiscountReward
        && !purchaseReward.productDiscountReward
        && !purchaseReward.addFreeProductReward
        && !purchaseReward.refundReward
        && !purchaseReward.increasScoreReward
        && !purchaseReward.discountCodeReward)
      {
        this.uiService.alert('انتخاب حداقل یکی از گزینه های جوایز الزامی است.');
        return;
      }

      if (!this.form.value.productGroupIds || this.form.value.productGroupIds.length === 0)
      {
        this.uiService.alert('تگ کالا را مشخص نمایید.');
        return;
      }
    } else
    {
      this.updatePeriodFormControl(this.getValue('behavioralReward.expierDate'), 'behavioralReward.discountCodeDate');

      const purchaseReward: BehavioralReward = this.getValue('behavioralReward');
      if (!purchaseReward.refundReward
        && !purchaseReward.increasScoreReward
        && !purchaseReward.discountCodeReward)
      {
        this.uiService.alert('انتخاب حداقل یکی از گزینه های جوایز الزامی است.');
        return;
      }

      if (!this.form.value.activityId || this.form.value.activityId.length === 0)
      {
        this.uiService.alert('فعالیت را مشخص نمایید.');
        return;
      }
    }

    if (this.getValue('purchaseRoundType') === 1)
    {
      this.form.controls['purchaseRound'].setValue(Number(this.getValue('purchaseRound1')));
    }
    else if (this.getValue('purchaseRoundType') === 2)
    {
      this.form.controls['purchaseRound'].setValue(Number(this.getValue('purchaseRound2')));
    } else
    {
      this.form.controls['purchaseRound'].setValue(0);

    }

    const purchaseRound = this.getValue('purchaseRound');
    if (!purchaseRound)
    {
      this.uiService.alert('لطفا مرتبه خرید وارد شود.');
      return;
    }

    const value = this.form.value;

    if (!this.percentValidation(value.behavioralReward.discountCodePercent))
    {
      return;
    } else if (!this.percentValidation(value.behavioralReward.refundToWalletPercent))
    {
      return;
    } else if (!this.percentValidation(value.purchaseReward.productDiscountPercent))
    {
      return;
    } else if (!this.percentValidation(value.purchaseReward.refundPercent))
    {
      return;
    } else if (!this.percentValidation(value.purchaseReward.increaseScorePercent))
    {
      return;
    } else if (!this.percentValidation(value.purchaseReward.sendingDiscount))
    {
      return;
    } else if (!this.percentValidation(value.purchaseReward.basketDiscountPercent))
    {
      return;
    }

    if (!value.title)
    {
      this.uiService.alert('نام سناریو را وارد نمایید.');
      return;
    }

    if (!value.brandIds || value.brandIds.length === 0)
    {
      this.uiService.alert('برند را مشخص نمایید.');
      return;
    }

    if (!value.userTypeIds || value.userTypeIds.length === 0)
    {
      this.uiService.alert('نوع کاربری را مشخص نمایید.');
      return;
    }

    if (!value.generalCustomers || value.generalCustomers.length === 0)
    {
      this.uiService.alert('مشتری را مشخص نمایید.');
      return;
    }

    if (value.senarioType === SenarioType.Purchase)
    {
      delete value.activityId;
    }

    value.customerGroupIds = [];
    value.campaignIds = [];
    value.phones = [];
    const generalCustomers = this.baseInfoService.generalCustomers$.getValue();

    [...value.generalCustomers].forEach((p: string) =>
    {
      const generalCustomer = generalCustomers.find(customer => customer.id === p);
      if (!generalCustomer)
      {
        value.phones.push(p);
        return;
      }
      switch (generalCustomer?.type)
      {
        case 1: { value.customerGroupIds.push(p); break; }
        case 2: { value.campaignIds.push(p); break; }
        default: { value.phones.push(p); break; }
      }
    });

    if (value.generalCustomers.some((p: string) => p === 'all'))
    {
      value.customerGroupIds = [];
      value.campaignIds = [];
      value.phones = [];
    }


    if (value.productGroupIds.some((p: string) => p === 'all'))
    {
      value.productGroupIds = [];
    }

    delete value.generalCustomers;

    value.discountedProductGroupIds = [];
    value.discountedProductCodes = [];
    const productGroups = this.baseInfoService.productGroups$.getValue();

    [...value.productGroups].forEach((p: any) =>
    {
      const productGroup = productGroups.find(a => a.id === p);
      if (!productGroup)
      {
        if (new RegExp(Utility.numberRegEx).test(p?.toString()) && p?.toString()?.length === 7)
        { value.discountedProductCodes.push(p?.toString()); }
        return;
      }
      value.discountedProductGroupIds.push(p);
    });

    if (value.productGroups.some((p: string) => p === 'all'))
    {
      value.discountedProductGroupIds = [];
      value.discountedProductCodes = [];
    }

    delete value.productGroups;

    if (value.brandIds.some((p: string) => p === 'all'))
    {
      value.brandIds = [];
    }

    if (value.userTypeIds.some((p: string) => p === 'all'))
    {
      value.userTypeIds = [];
    }

    if (value?.purchaseReward?.discountCodeReward)
    {
      if (Utility.isNullOrEmpty(value.purchaseReward.discountCodePattern))
      {
        this.uiService.alert('الگوی کد تخفیف را انتخاب نمایید.');
        return;
      }
    } else
    {
      delete value?.purchaseReward?.discountCodePattern;
    }

    if (value?.behavioralReward?.discountCodeReward)
    {
      if (Utility.isNullOrEmpty(value.behavioralReward.discountCodePattern))
      {
        this.uiService.alert('الگوی کد تخفیف را انتخاب نمایید.');
        return;
      }
    } else
    {
      delete value?.behavioralReward?.discountCodePattern;
    }

    if (this.getValue('senarioType') === SenarioType.Purchase)
    {
      delete value.behavioralReward;
    } else
    {
      delete value.purchaseReward;
      delete value.discountedProductCodes;
      delete value.discountedProductGroupIds;
      delete value.freeProductCodes;
      delete value.productGroupIds;
    }



    if (Utility.isNullOrEmpty(value.id)) { delete value.id; }

    console.log(value);
    callPostService<Scenario>(url, this.http, this.uiService, value).subscribe(value =>
    {
      this.form.controls['id'].setValue(value?.id);
      if (value?.id)
      {
        this.uiService.success('با موفقیت ثبت شد.');
      }
      setTimeout(() => { this.uiService.alertService.clearAllMessages(); }, 3000);

    });

  }
}

