import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { SMSSendingType } from "../../data/loyalty/enums.model";
import { IdTitleTypeBrandId } from "../../data/loyalty/get-senarios-grid.model";
import { createPeriodFormGroup } from "../../data/loyalty/period.model";
import { SendedSMSGrid, SMS, SMSDefinitionsGrid, smsInit } from "../../data/loyalty/sms.model";
import { Utility } from "../../utils/Utility";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { BaseInfoService } from "./base-info.service";
import { BaseService, callGetService, callPostPagingService, callPostService, isValidPhonenumber } from "./BaseService";

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
      userTypeIds: [scenario.userTypeIds?.length === 0 && scenario.id ? ['all'] : scenario.userTypeIds, [Validators.required]],

      groupIds: [scenario.groupIds, [Validators.required]],
      generalCustomers: [scenario.id && (scenario?.groupIds?.length === 0) ? ['all'] : [], [Validators.required]],


      sernarioIds: [scenario.sernarioIds?.length === 0 && scenario.id ? [] : scenario.sernarioIds, [Validators.required]],
      hour: ['', [Validators.pattern(Utility.numberRegEx)]],
      minute: ['', [Validators.pattern(Utility.numberRegEx)]],
    });

    const generalCustomers = this.getCustomerByBrandId(scenario.brandIds);
    this.baseInfoService?.generalCustomersByBrandId$?.next(generalCustomers);
    this.updateGeneralCustomer(scenario, generalCustomers);

    this.form.controls['brandIds'].valueChanges.subscribe((value: Array<string>) =>
    {
      this.form.controls['generalCustomers'].setValue([]);
      this.form.controls['groupIds'].setValue([]);
      this.form.controls['userTypeIds'].setValue([]);
      const generalCustomers = this.getCustomerByBrandId(value);
      this.baseInfoService?.generalCustomersByBrandId$?.next(generalCustomers);

      this.updateCustomerGroupsForSubmit(this.form.value, false);


    });

  }

  getCustomerByBrandId(brandIds: Array<string>): Array<IdTitleTypeBrandId>
  {
    if (brandIds.includes('all')) { return this.baseInfoService?.generalCustomers$?.getValue().filter(a => a.id === 'all' || a.type === 1); }
    return this.baseInfoService?.generalCustomers$?.getValue()?.filter(p => p.id === 'all' || !p.brandId || brandIds.length === 0 || brandIds.findIndex(a => a === p.brandId) !== -1 || p.type !== 1).filter(a => a.id === 'all' || a.type === 1);
  }

  private updateGeneralCustomer(scenario: SMS, generalCustomers: IdTitleTypeBrandId[])
  {
    if (scenario.id && (scenario.groupIds.length === 0))
    {
      this.setValue('generalCustomers', ['all']);
    }
    else
    {
      this.updateCustomerGroupInLocal(scenario, generalCustomers);
    }
  }

  private updateCustomerGroupInLocal(scenario: SMS, generalCustomers: IdTitleTypeBrandId[])
  {
    const scenarioGeneralCustomers = new Array<IdTitleTypeBrandId>();
    const allData = [...scenario.groupIds];
    allData.forEach((p: string) =>
    {
      if (Utility.isNullOrEmpty(p)) { return; }
      const generalCustomer = generalCustomers.find(customer => customer.id === p);
      if (generalCustomer)
      {
        scenarioGeneralCustomers.push(generalCustomer);
      } else if (isValidPhonenumber(p))
      {
        scenarioGeneralCustomers.push({ id: p, title: p, type: 3, brandId: '' });
      }
    });

    this.setValue('generalCustomers', scenarioGeneralCustomers.map(p => p.id));

    if (scenarioGeneralCustomers.length > 0)
    {
      const data = generalCustomers.concat(scenarioGeneralCustomers.filter(p => p.type === 3));
      this.baseInfoService?.generalCustomersByBrandId$?.next(data);
    }
  }

  private updateCustomerGroupsForSubmit(value: any, needDelete = false)
  {
    value.groupIds = [];
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
        case 1: { value.groupIds.push(p); break; }
        case 2: { value.campaignIds.push(p); break; }
        default: { value.phones.push(p); break; }
      }
    });

    if (value.generalCustomers.some((p: string) => p === 'all'))
    {
      value.groupIds = [];
      value.campaignIds = [];
      value.phones = [];
    }
    if (needDelete)
    {
      delete value.generalCustomers;
    }
  }


  submit(): void
  {
    this.form.controls['startDate'].setErrors(null);

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

    this.updateCustomerGroupsForSubmit(value, true);


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
