import { Injectable } from '@angular/core';
import {BaseService, callGetService, callPostService} from "./BaseService";
import {
  PromoterDiscountSetting,
  PromoterDiscountSettingGrid
} from "src/app/@core/data/loyalty/promoter-discount-setting.model";
import {BehaviorSubject} from "rxjs";
import {GetSenarios as SenarioDetail} from "src/app/@core/data/loyalty/get-senarios-grid.model";
import {FormBuilder, Validators} from "@angular/forms";
import {BaseInfoService} from "./base-info.service";
import {HttpClient} from "@angular/common/http";
import {SettingsService} from "../settings-service";
import {UiService} from "../ui/ui.service";
import {Scenario} from "src/app/@core/data/loyalty/scenario.model";
import {Utility} from "../../utils/Utility";
import {createPeriodFormGroup} from "../../data/loyalty/period.model";
import {createBehavioralRewardFormGroup} from "../../data/loyalty/behavioral-reward.model";
import {createPurchaseRewardFormGroup} from "../../data/loyalty/purchase-reward.model";

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
    super(formBuilder, scenarioInit);
  }

createForm(promoterDiscountSetting: PromoterDiscountSetting)
{
  this.form = this.formBuilder.group({
    id: [promoterDiscountSetting.id, [Validators.required]],
    title: [promoterDiscountSetting.title, [Validators.required]],
    userTypeId: [promoterDiscountSetting.userTypeId, [Validators.required]],
    brandIds: [promoterDiscountSetting.brandIds.length === 0 && promoterDiscountSetting.id ? ['all'] : promoterDiscountSetting.brandIds, [Validators.required]],
    customerDiscountMin: createPeriodFormGroup(promoterDiscountSetting.periodMin, this.formBuilder),
    customerDiscountMax: createPeriodFormGroup(promoterDiscountSetting.periodMax, this.formBuilder),
    commissionBasis: [promoterDiscountSetting.commissionBasis, [Validators.required]],
  });

  getScenarios(pageSize: number, pageIndex: number)
  {
    const url = this.settingService.settings?.baseUrl + 'PromoterDiscountSetting/GetAllSenarios';
    const request: any = {};
    request.pageSize = pageSize;
    request.pageIndex = pageIndex;

    return callPostService<Array<SenarioDetail>>(url, this.http, this.uiService, request).subscribe(value =>
    {
      if (!value)
      {
        this.scenarios$.next([]);
        return;
      }
      this.scenarios$.next(value);
    });
  }

  getSenariosGrid(
    request: GetAllSenarios
  )
  {
    const url = this.settingService.settings?.baseUrl + 'PromoterDiscountSetting/GetAllSenarios';


    return callPostService<Array<SenarioDetail>>(url, this.http, this.uiService, request).subscribe(value =>
    {
      if (!value)
      {
        value = [];
      }
      this.scenarios$.next(value);
    });
  }

  getScenarioById(id: string)
  {
    const url = this.settingService.settings?.baseUrl + 'PromoterDiscountSetting/GetSenarioById';
    return callGetService<Scenario>(url, this.http, this.uiService, {
      senarioId: id
    });
  }


}
