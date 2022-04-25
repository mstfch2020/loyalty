import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { GetAllPromoterDiscountSettings } from 'src/app/@core/data/loyalty/get-all-promoter-discount-settings.module';
import { GetPromoterDiscountSetting as PromoterDiscountSettingDetail } from "src/app/@core/data/loyalty/get-promoter-discount-setting-grid.model";
import { PromoterDiscountSetting, PromoterDiscountSettingGrid, promoterDiscountSettingInit } from "src/app/@core/data/loyalty/promoter-discount-setting.model";
import { Utility } from 'src/app/@core/utils/Utility';
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { BaseInfoService } from "./base-info.service";
import { BaseService, callGetService, callPostService } from "./BaseService";

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
    public uiService: UiService) {
    super(formBuilder, promoterDiscountSettingInit);
  }

  createForm(promoterDiscountSetting: PromoterDiscountSetting) {
    this.form = this.formBuilder.group({
      id: [promoterDiscountSetting.id, [Validators.required]],
      title: [promoterDiscountSetting.title, [Validators.required]],
      userTypeIds: [promoterDiscountSetting.userTypeIds.length === 0 && promoterDiscountSetting.id ? ['all'] : promoterDiscountSetting.userTypeIds, [Validators.required]],
      brandIds: [promoterDiscountSetting.brandIds.length === 0 && promoterDiscountSetting.id ? ['all'] : promoterDiscountSetting.brandIds, [Validators.required]],
      customerDiscountMin: [promoterDiscountSetting.customerDiscountMin, [Validators.required]],
      customerDiscountMax: [promoterDiscountSetting.customerDiscountMax, [Validators.required]],
      commissionBasis: [promoterDiscountSetting.commissionBasis, [Validators.required]],
    });
  }

  getPromoterDiscountSetting(pageSize: number, pageIndex: number) {
    const url = this.settingService.settings?.baseUrl + 'PromoterDiscountSetting/GetPromoterDiscountSettingsGrid';
    const request: any = {};
    request.pageSize = pageSize;
    request.pageIndex = pageIndex;

    return callGetService<Array<PromoterDiscountSettingDetail>>(url, this.http, this.uiService, request).subscribe(value => {
      if (!value) {
        this.promoterDiscountSettings$.next([]);
        return;
      }
      this.promoterDiscountSettings$.next(value);
    });
  }

  getPromoterDiscountSettingGrid(request: GetAllPromoterDiscountSettings) {

    const url = this.settingService.settings?.baseUrl + 'PromoterDiscountSetting/GetPromoterDiscountSettingsGrid';

    return callGetService<Array<PromoterDiscountSettingDetail>>(url, this.http, this.uiService, request).subscribe(value => {
      if (!value) {
        value = [];
      }
      this.promoterDiscountSettings$.next(value);
    });
  }

  getPromoterDiscountSettingById(id: string) {
    const url = this.settingService.settings?.baseUrl + 'PromoterDiscountSetting/GetPromoterDiscountSettingById';
    return callGetService<PromoterDiscountSetting>(url, this.http, this.uiService, {
      id: id
    });
  }

  submit(): void {
    console.log(this.form.value);
    this.uiService.alertService.clearAllMessages();
    const option = Utility.isNullOrEmpty(this.getValue('id')) ? 'Create' : 'Edit';
    const url = this.settingService.settings?.baseUrl + `PromoterDiscountSetting/${option}`;

    const value = this.form.value;

    if (!value.brandIds || value.brandIds.length === 0) {
      this.uiService.alert('برند را مشخص نمایید.');
      return;
    }

    if (!value.userTypeIds || value.userTypeIds.length === 0) {
      this.uiService.alert('نوع کاربری را مشخص نمایید.');
      return;
    }

    if (value.commissionBasis === null || value.commissionBasis === 0) {
      this.uiService.alert('پایه پورسانت را مشخص نمایید.');
      return;
    }

    if (value.customerDiscountMin === null || value.customerDiscountMin === 0) {
      this.uiService.alert('تخفیف برای مشتری را مشخص نمایید.');
      return;
    }

    if (value.customerDiscountMax === null || value.customerDiscountMax === 0) {
      this.uiService.alert('تخفیف برای مشتری را مشخص نمایید.');
      return;
    }

    if (value.brandIds.some((p: string) => p === 'all')) {
      value.brandIds = [];
    }

    if (value.userTypeIds.some((p: string) => p === 'all')) {
      value.userTypeIds = [];
    }

    if (Utility.isNullOrEmpty(value.id)) { delete value.id; }

    callPostService<PromoterDiscountSetting>(url, this.http, this.uiService, value).subscribe(value => {
      this.form.controls['id'].setValue(value?.id);
      this.uiService.success('با موفقیت ثبت شد.');
      setTimeout(() => { this.uiService.alertService.clearAllMessages(); }, 1500);

    });

  }

}
