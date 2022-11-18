import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { Utility } from 'src/app/@core/utils/Utility';
import { IdTitleTypeBrandId } from "../../data/loyalty/get-senarios-grid.model";
import { createLotteryGroups, createLotteryGroupTicket, LotteryGroup, LotteryGroupTicket, LotteryPointAward, LotteryPointAwardGrid, lotteryPointAwardInit } from "../../data/loyalty/lottery-point-award.model";
import { createPeriodFormGroup } from "../../data/loyalty/period.model";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { BaseInfoService } from "./base-info.service";
import { BaseService, callGetService, callPostPagingService, callPostService } from "./BaseService";
import { FileService } from "./file.service";

@Injectable({
  providedIn: 'root'
})
export class LotteryPointAwardService extends BaseService<LotteryPointAward>{

  editMode = false;
  theListView$ = new BehaviorSubject<Array<LotteryPointAwardGrid>>([]);
  groupsByBrand$ = new BehaviorSubject<Array<IdTitleTypeBrandId>>([]);
  selectedFiles = new Array();
  selFiles: FileList | null = null;
  formData = new FormData();

  get groups()
  {
    return this.form.controls['groups'] as FormArray;
  }

  groupTickets(groupIndex: number): FormArray
  {
    return this.groups.at(groupIndex).get('tickets') as FormArray;
  }

  getFormGroupOfArray(formGroup: any): FormGroup { return (formGroup as FormGroup); }

  addGroup()
  {
    this.groups.push(createLotteryGroups(null, this.formBuilder));
  }

  constructor(
    public override formBuilder: FormBuilder,
    public override baseInfoService: BaseInfoService,
    public http: HttpClient,
    public settingService: SettingsService,
    public fileService: FileService,
    public override uiService: UiService)
  {
    super(formBuilder, uiService, baseInfoService, lotteryPointAwardInit);
  }

  createForm(lotteryAward: LotteryPointAward)
  {
    this.editMode = false;
    this.form = this.formBuilder.group({
      id: [lotteryAward.id, [Validators.required]],
      title: [lotteryAward.title, [Validators.required]],
      imageIdName: [lotteryAward.imageIdName, [Validators.required]],
      text: [lotteryAward.text, [Validators.required]],
      providerBrandId: [lotteryAward.providerBrandId, [Validators.required]],
      imageId: [lotteryAward.imageId, [Validators.required]],
      startDate: [Utility.getFullDateTimeFromPeriodInPersian(lotteryAward.periodMin), [Validators.required]],
      endDate: [Utility.getFullDateTimeFromPeriodInPersian(lotteryAward.periodMax), [Validators.required]],
      periodMin: createPeriodFormGroup(lotteryAward.periodMin, this.formBuilder),
      periodMax: createPeriodFormGroup(lotteryAward.periodMax, this.formBuilder),
      groups: !lotteryAward.groups ? [] : this.formBuilder.array(lotteryAward.groups?.map(group => createLotteryGroups(group, this.formBuilder))),
    });

    this.form.get('providerBrandId')?.valueChanges.subscribe(brandId =>
    {
      if (brandId)
      {
        this.loadGroups(brandId);
      }
    });

  }

  addTicket(groupIndex: number)
  {
    if (this.groupTickets(groupIndex).length >= 3)
    {
      this.uiService.alert('امکان تغریف 3 بلیط  فراهم شده است..');
      return;
    }
    this.groupTickets(groupIndex).push(createLotteryGroupTicket(null, this.formBuilder));
  }

  private loadGroups(brandId: any)
  {
    this.baseInfoService.GetGroupsByBrandIds([brandId]).subscribe(
      value =>
      {
        this.groupsByBrand$.next(value);
        this.groups.clear();
        // const lotteryGroupId = this.form.get('id')?.value ?? '';
        for (let item of value)
        {
          this.groups.push(createLotteryGroups({
            groupId: item.id, groupName: item.title, lotteryGroupId: '',
            tickets: [{ pointAmount: null, ticketCount: 1, ticketId: '' }]
          }, this.formBuilder));
        }
      }
    );
  }

  GetLotteryPointsAwardById(id: string)
  {
    const url = this.settingService.settings?.baseUrl + 'PointsAward/GetLotteryPointsAwardById';
    return callGetService<LotteryPointAward>(url, this.http, this.uiService, {
      id: id
    });
  }

  GetLotteryPointsAwardsGrid(request: any)
  {
    const url = this.settingService.settings?.baseUrl + 'PointsAward/GetLotteryPointsAwardsGrid';

    return callPostPagingService<Array<LotteryPointAwardGrid>>(url, this.http, this.uiService, request).subscribe(value =>
    {
      this.theListView$.next([]);
      this.totalPages = 0;
      if (value?.data)
      {
        this.theListView$.next(value?.data);
        this.totalPages = Math.ceil(value.pagination.total / request.pageSize);
      }
    });
  }

  submit(): void
  {
    console.log(this.form.value);
    this.uiService.alertService.clearAllMessages();
    const option = Utility.isNullOrEmpty(this.getValue('id')) ? 'CreateLottery' : 'EditLottery';
    const url = this.settingService.settings?.baseUrl + `PointsAward/${ option }`;


    if (!this.updatePeriodFormControl(this.getValue('startDate'), 'periodMin') ||
      !this.updatePeriodFormControl(this.getValue('endDate'), 'periodMax'))
    {
      this.uiService.alert('بازه زمانی را وارد نمایید.');
      return;
    }

    const value: LotteryPointAward = this.form.value;

    if (!value.title)
    {
      this.uiService.alert('عنوان را مشخص نمایید.');
      return;
    }

    if (!value.text)
    {
      this.uiService.alert('متن را مشخص نمایید.');
      return;
    }

    if (!value.providerBrandId)
    {
      this.uiService.alert('برند را مشخص نمایید.');
      return;
    }

    if (!value.imageId)
    {
      this.uiService.alert('تصویر را مشخص نمایید.');
      return;
    }


    if (value.groups.some(group => group.tickets.some(ticket => ticket.pointAmount !== 0 && !ticket.pointAmount)))
    {
      this.uiService.alert('ثبت همه امتیاز ها الزامی می باشد.');
      return;
    }

    if (this.uiService.alertService.getErrorMessages().length !== 0)
    {
      return;
    }


    value.groups.forEach((group: LotteryGroup) =>
    {
      if (!group.lotteryGroupId) { delete group?.lotteryGroupId; }
      group.tickets.forEach((ticket: LotteryGroupTicket) =>
      {
        if (!ticket.ticketId) { delete ticket.ticketId; }
      });
    });


    callPostService<LotteryPointAward>(url, this.http, this.uiService, value).subscribe(value =>
    {
      if (value)
      {
        this.uiService.success('با موفقیت ثبت شد.');
      }
      setTimeout(() => { this.uiService.alertService.clearAllMessages(); }, 3000);

    });

  }

  fileUpload(formData: FormData, formControlName: string)
  {
    this.fileService.fileUpload(formData).subscribe(value =>
    {
      this.setValue(formControlName, value.fileId.id);
      this.uiService.success('فایل با موفقیت بارگزاری شد.');
    });
  }

  fileSelectionChanged(event: any, formControlName: string)
  {
    this.selectedFiles = new Array();

    const element = event.currentTarget as HTMLInputElement;
    this.selFiles = element.files;

    let fileList: FileList | null = element.files;
    if (fileList)
    {
      for (let itm in fileList)
      {
        let item: File = fileList[itm];
        if ((itm.match(/\d+/g) != null) && (!this.selectedFiles.includes(item['name'])))
          this.selectedFiles.push(item['name']);
      }
    }

    this.formData = new FormData();

    if (this.selectedFiles.length && this.selFiles && this.selFiles.length > 0)
    {
      for (let i = 0; i < this.selectedFiles.length; i++)
      {
        if (!this.selFiles[i]) { continue; }
        this.formData.append('files', this.selFiles[i],
          this.selFiles[i].name);
      }

      this.fileUpload(this.formData, formControlName);
    }
  }

  loadBrandDependency(brandId: Array<string>)
  {
    const generalCustomers = this.getCustomerByBrandId(brandId);
    this.baseInfoService?.generalCustomersByBrandId$?.next(generalCustomers);
  }

  getCustomerByBrandId(brandIds: Array<string>): Array<IdTitleTypeBrandId>
  {

    if (brandIds.includes('all')) { return this.baseInfoService?.generalCustomers$?.getValue(); }
    return this.baseInfoService?.generalCustomers$?.getValue()?.filter(p => p.id === 'all' || brandIds.length === 0 || brandIds.findIndex(a => a === p.brandId) !== -1 || p.type !== 1);
  }
}
