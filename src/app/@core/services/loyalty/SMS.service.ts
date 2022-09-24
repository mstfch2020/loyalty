import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { SMSSendingType } from "../../data/loyalty/enums.model";
import { createPeriodFormGroup } from "../../data/loyalty/period.model";
import { SendedSMSGrid, SMS, SMSDefinitionsGrid, smsInit } from "../../data/loyalty/sms.model";
import { Utility } from "../../utils/Utility";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { BaseInfoService } from "./base-info.service";
import { BaseService, callGetService, callPostPagingService, callPostService } from "./BaseService";

@Injectable({ providedIn: 'root' })
export class SMSService extends BaseService<SMS>
{
  sendedSMSGrid$ = new BehaviorSubject<Array<SendedSMSGrid>>([]);
  sMSDefinitionsGrid$ = new BehaviorSubject<Array<SMSDefinitionsGrid>>([]);

  constructor(public override formBuilder: FormBuilder,
    public override baseInfoService: BaseInfoService,
    public http: HttpClient,
    public settingService: SettingsService,
    public override uiService: UiService)
  {
    super(formBuilder, uiService, baseInfoService, smsInit);
    this.form = this.formBuilder.group({});
    this.createForm(smsInit);
  }

  createForm(scenario: SMS)
  {
    this.form = this.formBuilder.group({
      id: [scenario.id],
      smsSendingType: [scenario.smsSendingType, [Validators.required]],
      text: [scenario.text, [Validators.required]],
      startDate: [Utility.getFullDateTimeFromPeriodInPersian(scenario.date), [Validators.required]],
      date: createPeriodFormGroup(scenario.date, this.formBuilder),
      brandIds: [scenario.brandIds?.length === 0 && scenario.id ? ['all'] : scenario.brandIds, [Validators.required]],
      // brandIds: [scenario.brandIds?.length === 0 && scenario.id ? [] : scenario.brandIds, [Validators.required]],
      userTypeIds: [scenario.userTypeIds?.length === 0 && scenario.id ? ['all'] : scenario.userTypeIds, [Validators.required]],
      // groupIds: [scenario.groupIds?.length === 0 && scenario.id ? ['all'] : scenario.groupIds, [Validators.required]],
      groupIds: [scenario.groupIds?.length === 0 && scenario.id ? [] : scenario.groupIds, [Validators.required]],
      // sernarioIds: [scenario.sernarioIds?.length === 0 && scenario.id ? ['all'] : scenario.sernarioIds, [Validators.required]],
      sernarioIds: [scenario.sernarioIds?.length === 0 && scenario.id ? [] : scenario.sernarioIds, [Validators.required]],
      hour: ['', [Validators.pattern(Utility.numberRegEx)]],
      minute: ['', [Validators.pattern(Utility.numberRegEx)]],
    });
  }

  submit(): void
  {
    this.form.controls['startDate'].setErrors(null);
    if (!this.form.valid)
    {
      this.uiService.alert('لطفاً مقادیر اجباری را وارد نمایید.');
      return;
    }
    console.log(this.form.value);
    const option = Utility.isNullOrEmpty(this.getValue('id')) ? 'Create' : 'Edit';
    const url = this.settingService.settings?.baseUrl + `Sms/${ option }`;

    const validateDate = this.updatePeriodFormControl(`${ this.getValue('startDate') } ${ this.getValue('hour') }:${ this.getValue('minute') }:00`, 'date');

    const value = this.form.value;

    if (value.userTypeIds.some((p: string) => p === 'all'))
    {
      value.userTypeIds = [];
    }

    if (value.brandIds.some((p: string) => p === 'all'))
    {
      value.brandIds = [];
    }

    if (Utility.isNullOrEmpty(value.id)) { delete value.id; }

    if (value.smsSendingType === SMSSendingType.Instant)
    {
      delete value.date;
    } else
    {
      if (!validateDate)
      {
        this.form.controls['startDate'].setErrors({ 'invalid': true });
        this.uiService.alert('تاریخ نادرست است');
        return;
      }
    }

    callPostService<SMS>(url, this.http, this.uiService, value).subscribe(value =>
    {
      // this.form.controls['id'].setValue(value?.id);
      if (value)
        this.uiService.success('با موفقیت ثبت شد.');
    });
  }

  GetSendedSMSGrid(request: any)
  {
    const url = this.settingService.settings?.baseUrl + 'Sms/GetSendedSMSGrid';
    return callPostPagingService<Array<SendedSMSGrid>>(url, this.http, this.uiService, request).subscribe(value =>
    {
      this.sendedSMSGrid$.next([]);
      this.totalPages = 0;
      if (value?.data)
      {
        this.sendedSMSGrid$.next(value?.data);
        this.totalPages = Math.ceil(value.pagination.total / request.pageSize);
      }
    });
  }

  GetSMSDefinitionsGrid(request: any)
  {
    const url = this.settingService.settings?.baseUrl + 'Sms/GetSMSDefinitionsGrid';
    return callPostPagingService<Array<SMSDefinitionsGrid>>(url, this.http, this.uiService, request).subscribe(value =>
    {
      this.sMSDefinitionsGrid$.next([]);
      this.totalPages = 0;
      if (value?.data)
      {
        this.sMSDefinitionsGrid$.next(value?.data);
        this.totalPages = Math.ceil(value.pagination.total / request.pageSize);
      }
    });
  }

  getSmsById(id: any)
  {
    const url = this.settingService.settings?.baseUrl + 'Sms/GetSMSDEfinitionById';
    return callGetService<SMS>(url, this.http, this.uiService, {
      id: id
    });
  }

}
