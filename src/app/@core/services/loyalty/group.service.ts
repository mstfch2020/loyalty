import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { PromoterDiscountSetting } from "src/app/@core/data/loyalty/promoter-discount-setting.model";
import { Utility } from 'src/app/@core/utils/Utility';
import { IdTitle } from "../../data/loyalty/get-senarios-grid.model";
import { GroupGrid, GroupModel, groupModelInit } from "../../data/loyalty/group.model";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { BaseInfoService } from "./base-info.service";
import { BaseService, callGetService, callPostService } from "./BaseService";

@Injectable({
  providedIn: 'root'
})
export class GroupService extends BaseService<GroupModel>{

  groups$ = new BehaviorSubject<Array<GroupGrid>>([]);

  constructor(
    public override formBuilder: FormBuilder,
    public override baseInfoService: BaseInfoService,
    public http: HttpClient,
    public settingService: SettingsService,
    public override uiService: UiService)
  {
    super(formBuilder, uiService, baseInfoService, groupModelInit);
  }

  createForm(group: GroupModel)
  {
    this.form = this.formBuilder.group({
      brandId: [group.brandId, [Validators.required]],
      restPeriodType: [group.restPeriodType, [Validators.required]],
      groups: this.formBuilder.array(group.groups.map(a => this.CreateRestPeriodType(a)))
    });
  }

  get groups()
  {
    // return this.form.get('groups') as FormArray;
    return this.form.controls['groups'] as FormArray;
  }

  addGroup()
  {
    if (this.groups.length >= 8) { return; }
    this.groups.push(this.CreateRestPeriodType({} as IdTitle));
  }

  CreateRestPeriodType(group: IdTitle)
  {
    return this.formBuilder.group({
      id: [group?.id ?? null],
      title: [group?.title ?? '']
    });
  }

  GetGroupsGrid(request: any)
  {

    const url = this.settingService.settings?.baseUrl + 'Group/GetGroupsGrid';

    return callPostService<Array<GroupGrid>>(url, this.http, this.uiService, request).subscribe(value =>
    {
      this.groups$.next([]);
      this.totalPages = 0;
      if (value)
      {
        this.groups$.next(value);
        this.totalPages = 99999;
      }
    });
  }

  GetGroupSettingByBrandId(id: string)
  {
    const url = this.settingService.settings?.baseUrl + 'Group/GetGroupSettingByBrandId';
    return callGetService<GroupModel>(url, this.http, this.uiService, {
      brandId: id
    });
  }

  submit(): void
  {
    console.log(this.form.value);
    this.uiService.alertService.clearAllMessages();
    const option = Utility.isNullOrEmpty(this.getValue('brandId')) ? 'SetGroupsWithRestPeriod' : 'SetGroupsWithRestPeriod';
    const url = this.settingService.settings?.baseUrl + `Group/${ option }`;

    const value = this.form.value;
    value.groups = value.groups.filter((p: IdTitle) => !Utility.isNullOrEmpty(p.id) || !Utility.isNullOrEmpty(p.title));
    if (value.groups.length < 3)
    {
      this.uiService.alert('وارد نمودن حداقل سه گروه مشتری الزامی است.');
      return;
    }

    if (!value.brandId)
    {
      this.uiService.alert('برند را مشخص نمایید.');
      return;
    }

    if (!value.restPeriodType)
    {
      this.uiService.alert('بازه زمانی ریست را مشخص نمایید.');
      return;
    }

    if (value.groups.some((p: IdTitle) => !Utility.isNullOrEmpty(p.id)))
    {
      delete value.restPeriodType;
    }

    callPostService<PromoterDiscountSetting>(url, this.http, this.uiService, value).subscribe(value =>
    {
      this.uiService.success('با موفقیت ثبت شد.');
      setTimeout(() => { this.uiService.alertService.clearAllMessages(); }, 1500);

    });

  }

}
