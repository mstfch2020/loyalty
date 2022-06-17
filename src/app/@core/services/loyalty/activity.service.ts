import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { ActivityEditable, ActivityGrid, activityInit } from "../../data/loyalty/activity.model";
import { Utility } from "../../utils/Utility";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { BaseInfoService } from "./base-info.service";
import { BaseService, callGetService, callPostPagingService, callPostService } from "./BaseService";
import { FileSrevice } from "./file.service";

@Injectable({ providedIn: 'root' })
export class ActivityService extends BaseService<ActivityEditable>
{
  activitys$ = new BehaviorSubject<Array<ActivityGrid>>([]);

  constructor(public override formBuilder: FormBuilder,
    public http: HttpClient,
    public settingService: SettingsService,
    public override uiService: UiService, public fileSrevice: FileSrevice, public override baseInfoService: BaseInfoService)
  {
    super(formBuilder, uiService, baseInfoService, activityInit);
  }

  GetActivitiesGrid(data: any)
  {
    const url = this.settingService.settings?.baseUrl + 'Activity/GetActivitiesGrid';
    return callPostPagingService<Array<ActivityGrid>>(url, this.http, this.uiService, data).subscribe(value =>
    {
      this.activitys$.next([]);
      this.totalPages = 0;
      if (value?.data)
      {
        this.activitys$.next(value.data);
        this.totalPages = Math.ceil(value.pagination.total / data.pageSize);
      }
    });
  }



  createForm(activity: ActivityEditable): void
  {
    this.form = this.formBuilder.group({
      id: [activity.id, [Validators.required]],
      title: [activity.title, [Validators.required]],
      key: [activity.key, [Validators.required]],
    });
  }

  getActivityById(id: any)
  {
    const url = this.settingService.settings?.baseUrl + 'Activity/GeActivityById';
    return callGetService<ActivityEditable>(url, this.http, this.uiService, {
      id: id
    });
  }

  submit(): void
  {
    console.log(this.form.value);
    const option = Utility.isNullOrEmpty(this.getValue('id')) ? 'Create' : 'Edit';
    const url = this.settingService.settings?.baseUrl + `Activity/${ option }`;

    const value = this.form.value;
    if (!value.key)
    {
      this.uiService.alert('کلید را مشخص نمایید.');
      return;
    }

    if (!value.title)
    {
      this.uiService.alert('نام فعالیت را مشخص نمایید.');
      return;
    }

    if (Utility.isNullOrEmpty(value.id)) { delete value.id; }

    callPostService<ActivityEditable>(url, this.http, this.uiService, value).subscribe(value =>
    {
      this.form.controls['id'].setValue(value?.id);
      this.uiService.showSnackBar('با موفقیت ثبت شد.', '', 3000);
    });

  }
}
