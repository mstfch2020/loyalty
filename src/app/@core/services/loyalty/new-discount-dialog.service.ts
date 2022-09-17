import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { NewDiscountDialogModel, newDiscountDialogModelInit } from "../../data/loyalty/discount-code-dialog.model";
import { IdTitle } from "../../data/loyalty/get-senarios-grid.model";
import { createPeriodFormGroup } from "../../data/loyalty/period.model";
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
      tagIds: [scenario.tagIds, [Validators.required]],
      commissionBasis: [scenario.commissionBasis ?? 200, [Validators.required]],
      consumerDiscount: [scenario.consumerDiscount, [Validators.required]],
      status: [scenario.status, [Validators.required]],
      useCount: [scenario.useCount ?? 200, [Validators.required]],
      code: [scenario.code, [Validators.required]],
      startDate: [Utility.getFullDateTimeFromPeriodInPersion(scenario.periodMin), [Validators.required]],
      endDate: [Utility.getFullDateTimeFromPeriodInPersion(scenario.periodMax), [Validators.required]],
      periodMin: createPeriodFormGroup(scenario.periodMin, this.formBuilder),
      periodMax: createPeriodFormGroup(scenario.periodMax, this.formBuilder),
    });

    this.form.get('brandId')?.valueChanges.subscribe(value =>
    {
      if (value)
      {
        this.baseInfoService.GetAllPromoterContractedTagsByBrand(this.form.get('promoterId')?.value, value).subscribe(
          result => this.tags$.next(result)
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

    if (!this.updatePeriodFormControl(this.getValue('startDate'), 'periodMin') ||
      !this.updatePeriodFormControl(this.getValue('endDate'), 'periodMax'))
    {
      this.uiService.alert('بازه زمانی را وارد نمایید.');
      return;
    }

    const value = this.form.value;
    if (Utility.isNullOrEmpty(value.id)) { delete value.id; }
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
