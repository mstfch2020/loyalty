import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { Discount, DiscountCodesGeneratedGrid, DiscountGrid, discountInit } from "../../data/loyalty/discount.model";
import { DiscountType, DiscountVolumeType } from "../../data/loyalty/enums.model";
import { IdTitleTypeBrandId } from "../../data/loyalty/get-senarios-grid.model";
import { createPeriodFormGroup } from "../../data/loyalty/period.model";
import { ProductGroup } from "../../data/loyalty/product-group.model";
import { Utility } from "../../utils/Utility";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { BaseInfoService } from "./base-info.service";
import { BaseService, callGetService, callPostPagingService, callPostService, isValidProductCode } from "./BaseService";

@Injectable({ providedIn: 'root' })
export class DiscountService extends BaseService<Discount>
{
  submit(): void
  {
    throw new Error("Method not implemented.");
  }
  Discounts$ = new BehaviorSubject<Array<DiscountGrid>>([]);
  DiscountCodesGenerateds$ = new BehaviorSubject<Array<DiscountCodesGeneratedGrid>>([]);

  constructor(public override formBuilder: FormBuilder, public override baseInfoService: BaseInfoService,
    public http: HttpClient,
    public settingService: SettingsService,
    public override uiService: UiService)
  {
    super(formBuilder, uiService, baseInfoService, discountInit);
  }

  GetDiscountCodePatternsGrid(request: any)
  {
    const url = this.settingService.settings?.baseUrl + 'DiscountCode/GetDiscountCodePatternsGrid';
    return callPostPagingService<Array<DiscountGrid>>(url, this.http, this.uiService, request).subscribe(value =>
    {
      this.Discounts$.next([]);
      this.totalPages = 0;
      if (value?.data)
      {
        this.Discounts$.next(value.data);
        this.totalPages = Math.round(value.pagination.total / request.pageSize);
      }
    });
  }

  GetDiscountCodesGeneratedGrid(request: any)
  {
    const url = this.settingService.settings?.baseUrl + 'DiscountCode/GetDiscountCodesGeneratedGrid';
    return callPostPagingService<Array<DiscountGrid>>(url, this.http, this.uiService, request).subscribe(value =>
    {
      this.DiscountCodesGenerateds$.next([]);
      this.totalPages = 0;
      if (value?.data)
      {
        this.DiscountCodesGenerateds$.next(value.data);
        this.totalPages = Math.round(value.pagination.total / request.pageSize);
      }
    });
  }

  createForm(scenario: Discount): void
  {
    this.form = this.formBuilder.group({
      id: [scenario.id, []],
      patternName: [scenario.patternName, [Validators.required]],
      startDate: [Utility.getFullDateTimeFromPeriodInPersion(scenario.periodMin), [Validators.required]],
      endDate: [Utility.getFullDateTimeFromPeriodInPersion(scenario.periodMax), [Validators.required]],
      periodMin: createPeriodFormGroup(scenario.periodMin, this.formBuilder),
      periodMax: createPeriodFormGroup(scenario.periodMax, this.formBuilder),
      brandIds: [scenario.brandIds.length === 0 && scenario.id ? ['all'] : scenario.brandIds, [Validators.required]],
      groupIds: [scenario.groupIds, [Validators.required]],
      userTypeIds: [scenario.userTypeIds.length === 0 && scenario.id ? ['all'] : scenario.userTypeIds, [Validators.required]],
      productGroupIds: [scenario.productGroupIds.length === 0 && scenario.id ? ['all'] : scenario.productGroupIds, [Validators.required]],
      productGroupCodes: [scenario.productGroupCodes?.filter(p => !Utility.isNullOrEmpty(p?.toString()) && isValidProductCode(p?.toString())), [Validators.required]],
      productGroupsExceptedIds: [scenario.productGroupsExceptedIds, [Validators.required]],
      productGroupsExceptedCodes: [scenario.productGroupsExceptedCodes?.filter(p => !Utility.isNullOrEmpty(p?.toString()) && isValidProductCode(p?.toString())), [Validators.required]],
      productGroupsConditionIds: [scenario.productGroupsConditionIds, [Validators.required]],
      productGroupsConditionCodes: [scenario.productGroupsConditionCodes?.filter(p => !Utility.isNullOrEmpty(p?.toString()) && isValidProductCode(p?.toString())), [Validators.required]],
      purchanseAmountMin: [scenario.purchanseAmountMin, [Validators.required]],
      purchanseAmountMax: [scenario.purchanseAmountMax, [Validators.required]],
      generatedDiscountCodes: [scenario.generatedDiscountCodes, [Validators.required]],
      discountVolumeType: [scenario.discountVolumeType, [Validators.required]],
      discountVolumeValue: [scenario.discountVolumeValue, [Validators.required]],
      discountVolumeThreshold: [scenario.discountVolumeThreshold, [Validators.required]],
      numberUsesPerUser: [scenario.numberUsesPerUser, [Validators.required]],
      numberUsesTotal: [scenario.numberUsesTotal, [Validators.required]],
      applyOnType: [scenario.applyOnType, [Validators.required]],
      discountType: [scenario.discountType, [Validators.required]],
      discountCodeType: [scenario.discountCodeType, [Validators.required]],
      integrateOtherDiscount: [scenario.integrateOtherDiscount, [Validators.required]],
      freeSending: [scenario.freeSending, [Validators.required]],
      randomDiscountCodePrefix: [scenario.randomDiscountCodePrefix, [Validators.required]],
      randomDiscountCodeCount: [scenario.randomDiscountCodeCount, [Validators.required]],
      discountFixCode: [scenario.discountFixCode, [Validators.required]],
      staticCode: [scenario.staticCode, [Validators.required]],
      generalCustomers: [[scenario.id && (scenario.groupIds?.length === 0 && scenario.campaignIds?.length === 0 && scenario.phones?.length === 0) ? ['all'] : []], [Validators.required]],
      productGroups: [[scenario.id && (scenario.productGroupIds?.length === 0 && scenario.productGroupCodes?.length === 0) ? ['all'] : []], [Validators.required]],
      productGroupsExcepted: [[scenario.id && (scenario.productGroupsExceptedIds?.length === 0 && scenario.productGroupsExceptedCodes?.length === 0) ? ['all'] : []], [Validators.required]],
      productGroupsCondition: [[scenario.id && (scenario.productGroupsConditionIds?.length === 0 && scenario.productGroupsConditionCodes?.length === 0) ? ['all'] : []], [Validators.required]]

    });


    this.baseInfoService?.productCodes$?.next(scenario.productGroupCodes?.concat(scenario.productGroupsExceptedCodes)?.concat(scenario.productGroupsConditionCodes));

    if (!scenario.id)
    {
      if (scenario.productGroupIds.length !== 0 || scenario.productGroupCodes.length !== 0)
      {
        const data = scenario.productGroupIds.concat(scenario.productGroupCodes);
        const formControlName = 'productGroups';
        const productGroups = this.baseInfoService?.productGroups$?.getValue();

        this.updateProductGroupsIdCode(data, productGroups, formControlName);
      }

      if (scenario.productGroupsExceptedIds.length !== 0 || scenario.productGroupsExceptedCodes.length !== 0)
      {
        const data = scenario.productGroupsExceptedIds.concat(scenario.productGroupsExceptedCodes);
        const formControlName = 'productGroupsExcepted';
        const productGroups = this.baseInfoService?.productGroups$?.getValue();

        this.updateProductGroupsIdCode(data, productGroups, formControlName);
      }

      if (scenario.productGroupsConditionIds.length !== 0 || scenario.productGroupsConditionCodes.length !== 0)
      {
        const data = scenario.productGroupsConditionIds.concat(scenario.productGroupsConditionCodes);
        const formControlName = 'productGroupsCondition';
        const productGroups = this.baseInfoService?.productGroups$?.getValue();

        this.updateProductGroupsIdCode(data, productGroups, formControlName);
      }
    }


    this.updateGeneralCustomer(scenario);

    this.form.controls['brandIds'].valueChanges.subscribe(value =>
    {
      this.baseInfoService.getProductGroupsByBrandIds(value).subscribe(productGroups =>
      {
        if (!productGroups) { productGroups = []; }
        this.baseInfoService.productGroups$.next(productGroups);
      });
    });

    this.form.controls['brandIds'].valueChanges.subscribe((value: Array<string>) =>
    {
      const generalCustomers = this.getCustomerByBrandId(scenario);
      this.baseInfoService?.generalCustomersByBrandId$?.next(generalCustomers);
      this.baseInfoService?.getProductGroupsByBrandIds(value)?.subscribe(productGroups =>
      {
        const defArray: Array<ProductGroup> = [{ id: 'all', title: 'همه', brandId: '' }];
        if (!productGroups) { productGroups = []; }
        this.baseInfoService.productGroupsSingle$.next(productGroups);
        productGroups = productGroups.concat(defArray);
        this.baseInfoService.productGroups$.next(productGroups);
      });

      // this.form.controls['freeProductCodes'].enable();
      // this.form.get('purchaseReward.addFreeProductReward')?.enable();
      // if (value.length > 1 || (value.length === 1 && value[0] === 'all'))
      // {
      //   this.form.controls['freeProductCodes'].setValue([]);
      //   this.form.controls['freeProductCodes'].disable();//addFreeProductReward
      //   this.form.get('purchaseReward.addFreeProductReward')?.setValue(false);
      //   this.form.get('purchaseReward.addFreeProductReward')?.disable();
      // }
    });
    this.form.markAllAsTouched();
  }


  private updateGeneralCustomer(scenario: Discount)
  {
    const scenarioGeneralCustomers = new Array<IdTitleTypeBrandId>();
    if (scenario.id && (scenario.groupIds.length === 0 && scenario.campaignIds.length === 0 && scenario.phones.length === 0))
    {
      this.setValue('generalCustomers', ['all']);
    }
    else
    {
      const generalCustomers = this.getCustomerByBrandId(scenario);
      this.baseInfoService?.generalCustomersByBrandId$?.next(generalCustomers);
      [...scenario.groupIds, ...scenario.campaignIds, ...scenario.phones].forEach((p: string) =>
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
  getCustomerByBrandId(scenario: Discount): Array<IdTitleTypeBrandId>
  {
    return this.baseInfoService?.generalCustomers$?.getValue()?.filter(p => p.id === 'all' || scenario.brandIds.length === 0 || scenario.brandIds.findIndex(a => a === p.brandId) !== -1 || p.type !== 1);
  }


  getDiscountById(id: any)
  {
    const url = this.settingService.settings?.baseUrl + 'DiscountCode/GetDiscountCodeById';
    return callGetService<Discount>(url, this.http, this.uiService, {
      discountCodeId: id
    });
  }

  discountVolumeTypeChange($event: boolean)
  {
    if ($event)
    {
      this.setValue('discountVolumeType', DiscountVolumeType.Toman);
      return;
    }
    this.setValue('discountVolumeType', DiscountVolumeType.Percent);
  }

  discountTypeChange($event: boolean)
  {
    if ($event)
    {
      this.setValue('discountType', DiscountType.Product);
      return;
    }
    this.setValue('discountType', DiscountType.ShoppingBasket);
  }

  submitDiscount(isCreate: boolean): void
  {
    console.log(this.form.value);

    let option = 'CreatePattern';
    if (!isCreate)
    {
      if (Utility.isNullOrEmpty(this.getValue('id')))
      {
        option = 'CreateWithGeneratingCode';
      } else
      {
        option = 'GenerateCode';
      }
    }
    const url = this.settingService.settings?.baseUrl + `DiscountCode/${ option }`;

    this.updatePeriodFormControl(this.getValue('startDate'), 'periodMin');
    this.updatePeriodFormControl(this.getValue('endDate'), 'periodMax');

    const value = this.form.value;

    if (!value.generalCustomers || value.generalCustomers.length === 0)
    {
      this.uiService.alert('مشتری را مشخص نمایید.');
      return;
    }


    value.groupIds = [];
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
        case 1: { value.groupIds.push(p); break; }
        case 2: { value.campaignIds.push(p); break; }
        default: { value.phones.push(p); break; }
      }
    });

    if (value.generalCustomers.some((p: string) => p === 'all'))
    {
      value.groupIds = [];
      value.campaignIds = [];
      value.phones = [];
    }


    if (value.productGroupIds.some((p: string) => p === 'all'))
    {
      value.productGroupIds = [];
    }

    delete value.generalCustomers;


    let idsName = "productGroupIds";
    let codesName = "productGroupCodes";
    let formName = "productGroups";
    const productGroups = this.baseInfoService.productGroups$.getValue();

    this.updateValueForProductGroupsCodeIds(value, idsName, codesName, formName, productGroups);

    idsName = "productGroupsExceptedIds";
    codesName = "productGroupsExceptedCodes";
    formName = "productGroupsExcepted";

    this.updateValueForProductGroupsCodeIds(value, idsName, codesName, formName, productGroups);

    idsName = "productGroupsConditionIds";
    codesName = "productGroupsConditionCodes";
    formName = "productGroupsCondition";

    this.updateValueForProductGroupsCodeIds(value, idsName, codesName, formName, productGroups);



    if (value.brandIds.some((p: string) => p === 'all'))
    {
      value.brandIds = [];
    }

    if (value.userTypeIds.some((p: string) => p === 'all'))
    {
      value.userTypeIds = [];
    }

    if (Utility.isNullOrEmpty(value.id)) { delete value.id; }

    console.log(value);
    callPostService<Discount>(url, this.http, this.uiService, value).subscribe(value =>
    {
      this.form.controls['id'].setValue(value?.id);
      this.uiService.showSnackBar('با موفقیت ثبت شد.', '', 3000);
    });

  }

  savePattern(): void
  {
    this.submit();
  }
  createCode(): void { }
}
