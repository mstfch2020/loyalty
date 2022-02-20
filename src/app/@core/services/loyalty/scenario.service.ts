import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject } from 'rxjs';
import { createBehavioralRewardFormGroup } from "../../data/loyalty/behavioral-reward.model";
import { BehavioralRewardType, SenarioType } from "../../data/loyalty/enums.model";
import { GetSenarios as SenarioDetail } from "../../data/loyalty/get-senarios-grid.model";
import { createPeriodFormGroup } from "../../data/loyalty/period.model";
import { createPurchaseRewardFormGroup } from "../../data/loyalty/purchase-reward.model";
import { Scenario, scenarioInit } from "../../data/loyalty/scenario.model";
import { Utility } from '../../utils/Utility';
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { BaseInfoService } from "./base-info.service";
import { callGetService, callPostService } from "./BaseService";

@Injectable({ providedIn: 'root' })
export class ScenarioService
{

  scenarios$ = new BehaviorSubject<Array<SenarioDetail>>([]);

  form: FormGroup;
  _isDisabled = false;
  get isDisabled(): boolean { return this._isDisabled; }
  set isDisabled(value: boolean)
  {
    this._isDisabled = value;
    if (value) { this.form.disable(); } else { this.form.enable(); }
  }

  constructor(private formBuilder: FormBuilder, private baseInfoService: BaseInfoService, public http: HttpClient,
    public settingService: SettingsService,
    public uiService: UiService)
  {
    this.form = this.formBuilder.group({});
    this.createForm(scenarioInit);
  }

  createForm(scenario: Scenario)
  {
    this.form = this.formBuilder.group({
      id: [scenario.id, [Validators.required]],
      title: [scenario.title, [Validators.required]],
      senarioType: [scenario.senarioType, [Validators.required]],
      purchaseRoundType: [scenario.purchaseRoundType, [Validators.required]],
      brandIds: [scenario.brandIds, [Validators.required]],
      productGroupIds: [scenario.productGroupIds, [Validators.required]],
      customerGroupIds: [scenario.customerGroupIds, [Validators.required]],
      userTypeIds: [scenario.userTypeIds, [Validators.required]],
      productDiscountProductGroupIds: [scenario.productDiscountProductGroupIds, [Validators.required]],
      freeProductIds: [scenario.freeProductIds, [Validators.required]],
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

    });


    this.form.controls['brandIds'].valueChanges.subscribe(value =>
    {
      this.baseInfoService.getProductGroupsByBrandIds(value).subscribe(productGroups =>
      {
        this.baseInfoService.productGroups$.next(productGroups);
      });
    });
  }

  getProductGroupsByBrandIds(brandIds: Array<string> = [])
  {
    return this.baseInfoService.getProductGroupsByBrandIds(brandIds);
  }

  getFreeProducts(productIds: Array<string> = [])
  {
    return this.baseInfoService.getFreeProducts(productIds);
  }

  updatePeriodFormControl = (shamsiDate: string, formControlName: string): void =>
  {
    const date = shamsiDate.substring(0, 10)?.split('/');
    const time = shamsiDate.substring(11, shamsiDate.length)?.split(':');
    if (date && date.length === 3)
    {
      this.form.get(`${ formControlName }.year`)?.setValue(parseInt(date[0], 0));
      this.form.get(`${ formControlName }.month`)?.setValue(parseInt(date[1], 0));
      this.form.get(`${ formControlName }.day`)?.setValue(parseInt(date[2], 0));
    }

    if (time && time.length === 3)
    {
      this.form.get(`${ formControlName }.hours`)?.setValue(parseInt(time[0], 0));
      this.form.get(`${ formControlName }.minutes`)?.setValue(parseInt(time[1], 0));
      this.form.get(`${ formControlName }.seconds`)?.setValue(parseInt(time[2], 0));
    }
  };

  behavioralRewardTypeChange($event: boolean)
  {
    if ($event)
    {
      this.form.get(`behavioralReward.behavioralRewardType`)?.setValue(BehavioralRewardType.UserHimself);
      return;
    }
    this.form.get(`behavioralReward.behavioralRewardType`)?.setValue(BehavioralRewardType.ThirdParty);
  }

  getScenarios(pageSize: number, pageIndex: number)
  {
    const url = this.settingService.settings?.baseUrl + 'Senario/GetAllSenarios';
    return callGetService<Array<SenarioDetail>>(url, this.http, this.uiService, {
      pageSize: pageSize, pageIndex: pageIndex
    }).subscribe(value =>
    {
      this.scenarios$.next(value);
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
    const option = Utility.isNullOrEmpty(this.getValue('id')) ? 'Create' : 'Edit';
    const url = this.settingService.settings?.baseUrl + `Senario/${ option }`;

    this.updatePeriodFormControl(this.getValue('startDate'), 'periodMin');
    this.updatePeriodFormControl(this.getValue('endDate'), 'periodMax');

    if (this.getValue('senarioType') === SenarioType.Purchase)
    {
      this.updatePeriodFormControl(this.getValue('purchaseReward.expierDate'), 'purchaseReward.discountCodeDate');
    } else
    {
      this.updatePeriodFormControl(this.getValue('behavioralReward.expierDate'), 'behavioralReward.discountCodeDate');
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
    const value = this.form.value;
    if (value.senarioType === SenarioType.Purchase)
    {
      delete value.activityId;
    }

    if (Utility.isNullOrEmpty(value.id)) { delete value.id; }
    callPostService<Scenario>(url, this.http, this.uiService, value).subscribe(value =>
    {
      this.form.controls['id'].setValue(value?.id);
    });

  }

  getValue(name: string)
  {
    return this.form.get(name)?.value;
  }

  getFormGroup(fgName: string): FormGroup
  {
    return (this.form.controls[fgName] as any);
  }
}
