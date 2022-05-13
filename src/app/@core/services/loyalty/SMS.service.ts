import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { SMSSendingType } from "../../data/loyalty/enums.model";
import { createPeriodFormGroup } from "../../data/loyalty/period.model";
import { SMS, smsInit, SmsPatternGrid } from "../../data/loyalty/sms.model";
import { Utility } from "../../utils/Utility";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { BaseInfoService } from "./base-info.service";
import { BaseService, callGetService, callPostService } from "./BaseService";

@Injectable({ providedIn: 'root' })
export class SMSService extends BaseService<SMS>
{
  smsPattern$ = new BehaviorSubject<Array<SmsPatternGrid>>([]);

  constructor(public override formBuilder: FormBuilder,
    public baseInfoService: BaseInfoService,
    public http: HttpClient,
    public settingService: SettingsService,
    public uiService: UiService)
  {
    super(formBuilder, smsInit);
    this.form = this.formBuilder.group({});
    this.createForm(smsInit);
  }

  createForm(scenario: SMS)
  {
    this.form = this.formBuilder.group({
      id: [scenario.id],
      smsSendingType: [scenario.smsSendingType, [Validators.required]],
      text: [scenario.text, [Validators.required]],
      startDate: [Utility.getFullDateTimeFromPeriodInPersion(scenario.date), [Validators.required]],
      date: createPeriodFormGroup(scenario.date, this.formBuilder),
      brandId: [scenario.brandId, [Validators.required]],
      userTypeIds: [scenario.userTypeIds.length === 0 && scenario.id ? ['all'] : scenario.userTypeIds, [Validators.required]],
      customerGroupId: [scenario.customerGroupId, [Validators.required]],
      sernarioIds: [scenario.sernarioIds, [Validators.required]],
      hour: ['', [Validators.pattern(Utility.numberRegEx)]],
      minute: ['', [Validators.pattern(Utility.numberRegEx)]],
    });
  }

  // updatePeriodFormControl(shamsiDate: string, formControlName: string): boolean
  // {
  //   const date = shamsiDate.substring(0, 10)?.split('/');

  //   const m = moment.from('1367/04/11', 'fa', 'YYYY/MM/DD');
  //   if (!m.isValid())
  //   {
  //     return false;
  //   }

  //   const time = shamsiDate.substring(11, shamsiDate.length)?.split(':');
  //   if (date && date.length === 3)
  //   {
  //     this.form.get(`${ formControlName }.year`)?.setValue(parseInt(date[0], 0));
  //     this.form.get(`${ formControlName }.month`)?.setValue(parseInt(date[1], 0));
  //     this.form.get(`${ formControlName }.day`)?.setValue(parseInt(date[2], 0));
  //   }

  //   if (time && time.length === 3)
  //   {
  //     this.form.get(`${ formControlName }.hours`)?.setValue(parseInt(time[0], 0));
  //     this.form.get(`${ formControlName }.minutes`)?.setValue(parseInt(time[1], 0));
  //     this.form.get(`${ formControlName }.seconds`)?.setValue(parseInt(time[2], 0));
  //   }
  //   return true;
  // }

  submit(): void
  {
    this.form.controls['startDate'].setErrors(null);
    if (!this.form.valid)
    {
      this.uiService.showSnackBar('لطفاً مقادیر اجباری را وارد نمایید.', '', 3000);
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

    if (Utility.isNullOrEmpty(value.id)) { delete value.id; }

    if (value.smsSendingType === SMSSendingType.Instant)
    {
      delete value.date;
    } else
    {
      if (!validateDate)
      {
        this.form.controls['startDate'].setErrors({ 'invalid': true });
        this.uiService.showSnackBar('تاریخ نادرست است', '', 3000);
        return;
      }
    }

    callPostService<SMS>(url, this.http, this.uiService, value).subscribe(value =>
    {
      // this.form.controls['id'].setValue(value?.id);
      this.uiService.showSnackBar('با موفقیت ثبت شد.', '', 3000);
    });

  }

  // getValue(name: string)
  // {
  //   return this.form.get(name)?.value;
  // }

  // getFormGroup(fgName: string): FormGroup
  // {
  //   return (this.form.controls[fgName] as any);
  // }

  // getSmsPattern(data: any)
  // {
  //   const url = this.settingService.settings?.baseUrl + 'sms/GetSMSDEfinitionsGrid';
  //   return callPostPagingService<Array<SmsPatternGrid>>(url, this.http, this.uiService, data).subscribe(value =>
  //   {
  //     this.smsPattern$.next([]);
  //     this.total = 0;
  //     if (value?.data)
  //     {
  //       this.smsPattern$.next(value.data);
  //       this.total = value.pagination.total;
  //     }
  //   });
  // }

  getSmsPattern(data: any)
  {
    const url = this.settingService.settings?.baseUrl + 'Sms/GetSMSDEfinitionsGrid';
    return callGetService<Array<SmsPatternGrid>>(url, this.http, this.uiService, data).subscribe(value =>
    {
      this.smsPattern$.next([]);
      this.total = 0;
      if (value)
      {
        this.smsPattern$.next(value);
        this.total = 9999;
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
