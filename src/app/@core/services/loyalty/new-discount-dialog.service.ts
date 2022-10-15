import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { NewDiscountDialogModel, newDiscountDialogModelInit } from "../../data/loyalty/discount-code-dialog.model";
import { IdTitle } from "../../data/loyalty/get-senarios-grid.model";
import { createPeriodFormGroup } from "../../data/loyalty/period.model";
import { PromoterDiscountSetting, promoterDiscountSettingInit } from "../../data/loyalty/promoter-discount-setting.model";
import { Utility } from "../../utils/Utility";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { BaseInfoService } from "./base-info.service";
import { BaseService, callPostService } from "./BaseService";

@Injectable({ providedIn: 'root' })
export class NewDiscountDialogService extends BaseService<NewDiscountDialogModel>
{
  brands$ = new BehaviorSubject<Array<IdTitle>>([]);
  tags$ = new BehaviorSubject<Array<IdTitle>>([]);
  commissionSetting$ = new BehaviorSubject<PromoterDiscountSetting>(promoterDiscountSettingInit);

  constructor(public override formBuilder: FormBuilder,
    public override baseInfoService: BaseInfoService,
    public http: HttpClient,
    public settingService: SettingsService,
    public override uiService: UiService,)
  {
    super(formBuilder, uiService, baseInfoService, newDiscountDialogModelInit);
  }

  createForm(scenario: NewDiscountDialogModel)
  {
    this.form = this.formBuilder.group({
      id: [scenario.id, [Validators.required]],
      promoterId: [scenario.promoterId, [Validators.required]],
      brandId: [scenario.brandId, [Validators.required]],
      tagIds: [scenario.tagIds.length === 0 && scenario.id ? ['all'] : scenario.tagIds, [Validators.required]],
      commissionBasis: [scenario.commissionBasis, [Validators.required]],
      consumerDiscount: [scenario.consumerDiscount, [Validators.required]],
      status: [scenario.status, [Validators.required]],
      useCount: [scenario.useCount ?? 200, [Validators.required]],
      code: [scenario.code, [Validators.required]],
      startDate: [Utility.getFullDateTimeFromPeriodInPersian(scenario.periodMin), [Validators.required]],
      endDate: [Utility.getFullDateTimeFromPeriodInPersian(scenario.periodMax), [Validators.required]],
      periodMin: createPeriodFormGroup(scenario.periodMin, this.formBuilder),
      periodMax: createPeriodFormGroup(scenario.periodMax, this.formBuilder),
    });

    this.form.get('brandId')?.valueChanges.subscribe(value =>
    {
      this.form.get('tagIds')?.setValue(null);
      this.tags$.next([]);
      this.commissionSetting$.next(promoterDiscountSettingInit);

      if (value)
      {
        this.baseInfoService.GetAllPromoterContractedTagsByBrand(this.form.get('promoterId')?.value, value).subscribe(
          result =>
          {
            result.push({ id: 'all', title: 'همه' });
            this.tags$.next(result);
          }
        );

        this.baseInfoService.GetCommissionSettingByBrand(this.form.get('promoterId')?.value, value).subscribe(
          (result: PromoterDiscountSetting) =>
          {
            this.commissionSetting$.next(result);
            this.form.get('commissionBasis')?.setValue(result.commissionBasis);
          }
        );
      }
    });
  }

  submit(): void
  {
    console.log(this.form.value);
    this.uiService.alertService.clearAllMessages();
    const option = Utility.isNullOrEmpty(this.getValue('id')) ? 'Create' : 'Edit';
    const url = this.settingService.settings?.baseUrl + `PromoterDiscountCode/${ option }`;
    let errorMessage = '';

    if (!this.updatePeriodFormControl(this.getValue('startDate'), 'periodMin') ||
      !this.updatePeriodFormControl(this.getValue('endDate'), 'periodMax'))
    {
      errorMessage += ('بازه زمانی را وارد نمایید.\n');
    }
    const value: NewDiscountDialogModel = this.form.value as NewDiscountDialogModel;
    value.commissionBasis = this.form.get('commissionBasis')?.value;
    const commissionSetting = this.commissionSetting$.getValue();

    if (!value.brandId)
    {
      errorMessage += (`لطفا برند را انتخاب کنید.`);
    }

    else if (!value.tagIds || value.tagIds.length === 0)
    {
      errorMessage += (`لطفا تگ کالا را انتخاب کنید.`);
    }
    else if (!value.code)
    {
      errorMessage += (`لطفا کد تخفیف را وارد نمایید.`);
    }

    else if (value.consumerDiscount > commissionSetting.customerDiscountMax ||
      value.consumerDiscount < commissionSetting.customerDiscountMin)
    {
      errorMessage += (`تخفیف مصرف کننده باید بین ${ commissionSetting.customerDiscountMin } تا ${ commissionSetting.customerDiscountMax } باشد.`);
    }

    else if (!value.useCount)
    {
      errorMessage += (`لطفا تعداد کد تخفیف را وارد نمایید.`);
    }

    if (errorMessage)
    {
      this.uiService.alert(errorMessage);
      return;
    }
    if (value.tagIds.some((p: string) => p === 'all'))
    {
      value.tagIds = [];
    }
    console.log(value);

    callPostService<NewDiscountDialogModel>(url, this.http, this.uiService, value).subscribe(value =>
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
