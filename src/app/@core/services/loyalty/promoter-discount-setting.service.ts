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
    public uiService: UiService)
  {
    super(formBuilder, promoterDiscountSettingInit);
  }

  createForm(promoterDiscountSetting: PromoterDiscountSetting)
  {
    this.form = this.formBuilder.group({
      id: [promoterDiscountSetting.id, [Validators.required]],
      title: [promoterDiscountSetting.title, [Validators.required]],
      userTypeId: [promoterDiscountSetting.userTypeId, [Validators.required]],
      brandIds: [promoterDiscountSetting.brandIds.length === 0 && promoterDiscountSetting.id ? ['all'] : promoterDiscountSetting.brandIds, [Validators.required]],
      customerDiscountMin: [promoterDiscountSetting.customerDiscountMin, [Validators.required]],
      customerDiscountMax: [promoterDiscountSetting.customerDiscountMax, [Validators.required]],
      commissionBasis: [promoterDiscountSetting.commissionBasis, [Validators.required]],
    });
  }

  getPromoterDiscountSetting(pageSize: number, pageIndex: number)
  {
    const url = this.settingService.settings?.baseUrl + 'PromoterDiscountSetting/GetAllSenarios';
    const request: any = {};
    request.pageSize = pageSize;
    request.pageIndex = pageIndex;

    return callPostService<Array<PromoterDiscountSettingDetail>>(url, this.http, this.uiService, request).subscribe(value =>
    {
      if (!value)
      {
        this.promoterDiscountSettings$.next([]);
        return;
      }
      this.promoterDiscountSettings$.next(value);
    });
  }

  getPromoterDiscountSettingGrid(request: GetAllPromoterDiscountSettings)
  {

    const url = this.settingService.settings?.baseUrl + 'PromoterDiscountSetting/GetAllSenarios';

    return callPostService<Array<PromoterDiscountSettingDetail>>(url, this.http, this.uiService, request).subscribe(value =>
    {
      if (!value)
      {
        value = [];
      }
      this.promoterDiscountSettings$.next(value);
    });
  }

  getPromoterDiscountSettingById(id: string)
  {
    const url = this.settingService.settings?.baseUrl + 'PromoterDiscountSetting/GetSenarioById';
    return callGetService<PromoterDiscountSetting>(url, this.http, this.uiService, {
      senarioId: id
    });
  }

  submit(): void
  {
    console.log(this.form.value);
    this.uiService.alertService.clearAllMessages();
    const option = Utility.isNullOrEmpty(this.getValue('id')) ? 'Create' : 'Edit';
    const url = this.settingService.settings?.baseUrl + `PromoterDiscountSetting/${ option }`;

    if (!this.updatePeriodFormControl(this.getValue('startDate'), 'periodMin') ||
      !this.updatePeriodFormControl(this.getValue('endDate'), 'periodMax'))
    {
      this.uiService.alert('بازه زمانی را وارد نمایید.');
      return;
    }


    const value = this.form.value;

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

    delete value.generalCustomers;

    value.discountedProductGroupIds = [];
    value.discountedProductCodes = [];
    const productGroups = this.baseInfoService.productGroups$.getValue();

    [...value.productGroups].forEach((p: any) =>
    {
      const productGroup = productGroups.find(a => a.id === p);
      if (!productGroup)
      {
        if (new RegExp(Utility.numberRegEx).test(p?.toString()) && p?.toString().length === 7) { value.discountedProductCodes.push(parseInt(p?.toString(), 0)); }
        return;
      }
      value.discountedProductGroupIds.push(p);
    });

    if (value.productGroupIds.some((p: string) => p === 'all'))
    {
      value.discountedProductGroupIds = [];
      value.discountedProductCodes = [];
      value.productGroupIds = [];
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

    if (Utility.isNullOrEmpty(value.id)) { delete value.id; }

    console.log(value);
    callPostService<PromoterDiscountSetting>(url, this.http, this.uiService, value).subscribe(value =>
    {
      this.form.controls['id'].setValue(value?.id);
      this.uiService.success('با موفقیت ثبت شد.');
      setTimeout(() => { this.uiService.alertService.clearAllMessages(); }, 1500);

    });

  }

}
