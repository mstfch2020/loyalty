import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { CustomerGroup, CustomerGroupDetail, customerGroupInit } from "../../data/loyalty/customer-group.model";
import { SMS } from "../../data/loyalty/sms.model";
import { Utility } from "../../utils/Utility";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { BaseInfoService } from "./base-info.service";
import { BaseService, callGetService, callPostService } from "./BaseService";

@Injectable({ providedIn: 'root' })
export class CustomerGroupService extends BaseService<CustomerGroup>
{
  customerGroups$ = new BehaviorSubject<Array<CustomerGroupDetail>>([]);

  constructor(public override formBuilder: FormBuilder,
    private baseInfoService: BaseInfoService,
    public http: HttpClient,
    public settingService: SettingsService,
    public uiService: UiService)
  {
    super(formBuilder, customerGroupInit);
  }

  getCustomerGroups(pageSize: number, pageIndex: number)
  {
    const url = this.settingService.settings?.baseUrl + 'CustomerGroupAndLevelRule/GetAllCustomerGroupRules';
    return callGetService<Array<CustomerGroupDetail>>(url, this.http, this.uiService, {
      pageSize: pageSize, pageIndex: pageIndex
    }).subscribe(value =>
    {
      this.customerGroups$.next(value);
    });
  }

  createForm(scenario: CustomerGroup): void
  {
    this.form = this.formBuilder.group({
      id: [scenario.id, [Validators.required]],
      brandId: [scenario.brandId, [Validators.required]],
      customGroupId: [scenario.customGroupId, [Validators.required]],
      scoreThreshold: [scenario.scoreThreshold, [Validators.required]],
      currentLevelId: [scenario.currentLevelId, [Validators.required]],
      newLevelId: [scenario.newLevelId, [Validators.required]],
      activityCount: [scenario.activityCount, [Validators.required]],
      userTypeIds: [scenario.userTypeIds, [Validators.required]],
    });
  }

  getCustomerGroupById(id: any)
  {
    const url = this.settingService.settings?.baseUrl + 'CustomerGroupAndLevelRule/GetCustomerGroupRuleById';
    return callGetService<CustomerGroup>(url, this.http, this.uiService, {
      id: id
    });
  }

  submit(): void
  {
    console.log(this.form.value);
    const option = Utility.isNullOrEmpty(this.getValue('id')) ? 'Create' : 'Edit';
    const url = this.settingService.settings?.baseUrl + `CustomerGroupAndLevelRule/${ option }`;

    const value = this.form.value;
    if (Utility.isNullOrEmpty(value.id)) { delete value.id; }

    callPostService<SMS>(url, this.http, this.uiService, value).subscribe(value =>
    {
      this.form.controls['id'].setValue(value?.id);
    });

  }
}
