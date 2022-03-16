import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { Discount, DiscountGrid, discountInit } from "../../data/loyalty/discount.model";
import { DiscountType, DiscountVolumeType } from "../../data/loyalty/enums.model";
import { createPeriodFormGroup } from "../../data/loyalty/period.model";
import { Utility } from "../../utils/Utility";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { BaseInfoService } from "./base-info.service";
import { BaseService, callGetService, callPostService } from "./BaseService";

@Injectable({ providedIn: 'root' })
export class DiscountService extends BaseService<Discount>
{
  Discounts$ = new BehaviorSubject<Array<DiscountGrid>>([]);

  constructor(public override formBuilder: FormBuilder, private baseInfoService: BaseInfoService,
    public http: HttpClient,
    public settingService: SettingsService,
    public uiService: UiService)
  {
    super(formBuilder, discountInit);
  }

  getDiscount(pageSize: number, pageIndex: number)
  {
    const url = this.settingService.settings?.baseUrl + 'Discount/GetDiscountsGrid';
    return callGetService<Array<DiscountGrid>>(url, this.http, this.uiService, {
      pageSize: pageSize, pageIndex: pageIndex
    }).subscribe(value =>
    {
      if (!value) { value = []; }
      this.Discounts$.next(value);
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
      productGroupsExceptedIds: [scenario.productGroupsExceptedIds, [Validators.required]],
      productGroupsConditionIds: [scenario.productGroupsExceptedIds, [Validators.required]],
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


    });

    this.form.controls['brandIds'].valueChanges.subscribe(value =>
    {
      this.baseInfoService.getProductGroupsByBrandIds(value).subscribe(productGroups =>
      {
        if (!productGroups) { productGroups = []; }
        this.baseInfoService.productGroups$.next(productGroups);
      });
    });
  }

  getDiscountById(id: any)
  {
    const url = this.settingService.settings?.baseUrl + 'Discount/GetDiscountById';
    return callGetService<Discount>(url, this.http, this.uiService, {
      id: id
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

  submit(): void
  {
    if (this.form.invalid)
    {
      this.uiService.showSnackBar('موارد الزامی در فرم را وارد نمایید.', '', 3000);
      return;
    }
    console.log(this.form.value);
    const option = Utility.isNullOrEmpty(this.getValue('id')) ? 'Create' : 'Edit';
    const url = this.settingService.settings?.baseUrl + `DiscountCode/${ option }`;

    this.updatePeriodFormControl(this.getValue('startDate'), 'periodMin');
    this.updatePeriodFormControl(this.getValue('endDate'), 'periodMax');

    const value = this.form.value;

    if (value.brandIds.some((p: string) => p === 'all'))
    {
      value.brandIds = [];
    }

    if (value.userTypeIds.some((p: string) => p === 'all'))
    {
      value.userTypeIds = [];
    }

    if (value.productGroupIds.some((p: string) => p === 'all'))
    {
      value.productGroupIds = [];
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
