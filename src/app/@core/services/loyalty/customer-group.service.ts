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
import { BaseService, callGetService, callPostPagingService, callPostService } from "./BaseService";

@Injectable({ providedIn: 'root' })
export class CustomerGroupService extends BaseService<CustomerGroup>
{
  customerGroups$ = new BehaviorSubject<Array<CustomerGroupDetail>>([]);

  constructor(public override formBuilder: FormBuilder,
    public override  baseInfoService: BaseInfoService,
    public http: HttpClient,
    public settingService: SettingsService,
    public override uiService: UiService)
  {
    super(formBuilder, uiService, baseInfoService, customerGroupInit);
  }

  getCustomerGroups(request: any)
  {
    const url = this.settingService.settings?.baseUrl + 'CustomerGroupAndLevelRule/GetCustomerGroupRulesGrid';
    return callPostPagingService<Array<CustomerGroupDetail>>(url, this.http, this.uiService, request).subscribe(value =>
    {
      this.customerGroups$.next([]);
      this.totalPages = 0;
      if (value?.data)
      {
        this.customerGroups$.next(value.data);
        this.totalPages = Math.round(value.pagination.total / request.pageSize);
      }
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
      userTypeIds: [scenario.userTypeIds.length === 0 && scenario.id ? ['all'] : scenario.userTypeIds, [Validators.required]],
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

    if (value.userTypeIds.some((p: string) => p === 'all'))
    {
      value.userTypeIds = [];
    }

    if (Utility.isNullOrEmpty(value.id)) { delete value.id; }

    callPostService<SMS>(url, this.http, this.uiService, value).subscribe(value =>
    {
      this.form.controls['id'].setValue(value?.id);
      if (value?.id) { this.uiService.success('با موفقیت ثبت شد.'); }
    });

  }
}
