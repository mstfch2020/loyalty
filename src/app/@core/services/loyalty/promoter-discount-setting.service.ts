import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { GetPromoterDiscountSettingGrid } from "src/app/@core/data/loyalty/get-promoter-discount-setting-grid.model";
import { PromoterDiscountSetting, PromoterDiscountSettingGrid, promoterDiscountSettingInit } from "src/app/@core/data/loyalty/promoter-discount-setting.model";
import { Utility } from 'src/app/@core/utils/Utility';
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { BaseInfoService } from "./base-info.service";
import { BaseService, callGetService, callPostPagingService, callPostService } from "./BaseService";

@Injectable({
  providedIn: 'root'
})
export class PromoterDiscountSettingService extends BaseService<PromoterDiscountSetting>{

  promoterDiscountSettings$ = new BehaviorSubject<Array<PromoterDiscountSettingGrid>>([]);

  constructor(
    public override formBuilder: FormBuilder,
    private baseInfoService: BaseInfoService,
    public http: HttpClient,
    public settingService: SettingsService,
    public uiService: UiService)
  {
    super(formBuilder, promoterDiscountSettingInit);
  }

  createForm(promoterDiscountSetting: PromoterDiscountSetting)
  {
    this.form = this.formBuilder.group({
      brandId: [promoterDiscountSetting.brandId, [Validators.required]],
      commissionBasis: [promoterDiscountSetting.commissionBasis, [Validators.required]],
      customerDiscountMin: [promoterDiscountSetting.customerDiscountMin, [Validators.required]],
      customerDiscountMax: [promoterDiscountSetting.customerDiscountMax, [Validators.required]],
      id: [promoterDiscountSetting.id, [Validators.required]],
      userTypeId: [promoterDiscountSetting.userTypeId, [Validators.required]],
    });
  }

  // getPromoterDiscountSettingGrid(request: any)
  // {

  //   const url = this.settingService.settings?.baseUrl + 'PromoterDiscountSetting/GetPromoterDiscountSettingsGrid';

  //   return callPostPagingService<Array<GetPromoterDiscountSettingGrid>>(url, this.http, this.uiService, request).subscribe(value =>
  //   {
  //     this.promoterDiscountSettings$.next([]);
  //     this.total = 0;
  //     if (value?.data)
  //     {
  //       this.promoterDiscountSettings$.next(value.data);
  //       this.total = value.pagination.total;
  //     }
  //   });
  // }

  getPromoterDiscountSettingGrid(request: any)
  {

    const url = this.settingService.settings?.baseUrl + 'PromoterDiscountSetting/GetPromoterDiscountSettingsGrid';

    return callPostPagingService<Array<GetPromoterDiscountSettingGrid>>(url, this.http, this.uiService, request).subscribe(value =>
    {
      this.promoterDiscountSettings$.next([]);
      this.totalPages = 0;
      if (value?.data)
      {
        this.promoterDiscountSettings$.next(value.data);
        this.totalPages = value.pagination.total;
      }
    });
  }

  getPromoterDiscountSettingById(id: string)
  {
    const url = this.settingService.settings?.baseUrl + 'PromoterDiscountSetting/GetPromoterDiscountSettingById';
    return callGetService<PromoterDiscountSetting>(url, this.http, this.uiService, {
      id: id
    });
  }

  submit(): void
  {
    console.log(this.form.value);
    this.uiService.alertService.clearAllMessages();
    const option = Utility.isNullOrEmpty(this.getValue('id')) ? 'Create' : 'Edit';
    const url = this.settingService.settings?.baseUrl + `PromoterDiscountSetting/${ option }`;

    const value = this.form.value;

    if (!value.brandId)
    {
      this.uiService.alert('برند را مشخص نمایید.');
      return;
    }

    if (!value.userTypeId)
    {
      this.uiService.alert('نوع کاربری را مشخص نمایید.');
      return;
    }

    if (!value.commissionBasis)
    {
      this.uiService.alert('پایه پورسانت را مشخص نمایید.');
      return;
    }

    if (!value.customerDiscountMin)
    {
      this.uiService.alert('تخفیف برای مشتری را مشخص نمایید.');
      return;
    }

    if (!value.customerDiscountMax)
    {
      this.uiService.alert('تخفیف برای مشتری را مشخص نمایید.');
      return;
    }


    if (Utility.isNullOrEmpty(value.id)) { delete value.id; }

    callPostService<PromoterDiscountSetting>(url, this.http, this.uiService, value).subscribe(value =>
    {
      this.form.controls['id'].setValue(value?.id);
      this.uiService.success('با موفقیت ثبت شد.');
      setTimeout(() => { this.uiService.alertService.clearAllMessages(); }, 1500);

    });

  }

}
