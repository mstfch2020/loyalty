import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { Utility } from 'src/app/@core/utils/Utility';
import { ExternalPointAward, ExternalPointAwardGrid, externalPointAwardInit } from "../../data/loyalty/external-point-award.model";
import { IdTitleTypeBrandId } from "../../data/loyalty/get-senarios-grid.model";
import { createPeriodFormGroup } from "../../data/loyalty/period.model";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { BaseInfoService } from "./base-info.service";
import { BaseService, callGetService, callPostPagingService, callPostService } from "./BaseService";
import { FileService } from "./file.service";

@Injectable({
  providedIn: 'root'
})
export class ExternalPointAwardService extends BaseService<ExternalPointAward>{

  editMode = false;
  theListView$ = new BehaviorSubject<Array<ExternalPointAwardGrid>>([]);
  selectedFiles = new Array();
  selFiles: FileList | null = null;
  formData = new FormData();

  constructor(
    public override formBuilder: FormBuilder,
    public override baseInfoService: BaseInfoService,
    public http: HttpClient,
    public settingService: SettingsService,
    public fileService: FileService,
    public override uiService: UiService)
  {
    super(formBuilder, uiService, baseInfoService, externalPointAwardInit);
  }

  createForm(externalAward: ExternalPointAward)
  {
    this.editMode = false;
    this.form = this.formBuilder.group({
      title: [externalAward.title, [Validators.required]],
      text: [externalAward.text, [Validators.required]],
      providerBrandId: [externalAward.providerBrandId, [Validators.required]],
      userTypeId: [externalAward.userTypeId, [Validators.required]],
      groupId: [externalAward.groupId, [Validators.required]],
      exporterBrand: [externalAward.exporterBrand, [Validators.required]],
      exporterBrandLogoId: [externalAward.exporterBrandLogoId, [Validators.required]],
      exporterBrandHexaCode: [externalAward.exporterBrandHexaCode, [Validators.required]],
      exporterBrandLogoName: [externalAward.exporterBrandLogoName, [Validators.required]],
      awardFileName: [externalAward.awardFileName, [Validators.required]],
      pointAmount: [externalAward.pointAmount, [Validators.required]],
      id: [externalAward.id, [Validators.required]],
      categoryId: [externalAward.categoryId ?? '', [Validators.required]],
      awardFileId: [externalAward.awardFileId ?? '', [Validators.required]],

      startDate: [Utility.getFullDateTimeFromPeriodInPersian(externalAward.periodMin), [Validators.required]],
      endDate: [Utility.getFullDateTimeFromPeriodInPersian(externalAward.periodMax), [Validators.required]],
      periodMin: createPeriodFormGroup(externalAward.periodMin, this.formBuilder),
      periodMax: createPeriodFormGroup(externalAward.periodMax, this.formBuilder),

    });
  }

  GetExternalPointsAwardById(id: string)
  {
    const url = this.settingService.settings?.baseUrl + 'PointsAward/GetExternalPointsAwardById';
    return callGetService<ExternalPointAward>(url, this.http, this.uiService, {
      id: id
    });
  }

  GetExternalPointsAwardsGrid(request: any)
  {
    const url = this.settingService.settings?.baseUrl + 'PointsAward/GetExternalPointsAwardsGrid';

    return callPostPagingService<Array<ExternalPointAwardGrid>>(url, this.http, this.uiService, request).subscribe(value =>
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
    const option = Utility.isNullOrEmpty(this.getValue('id')) ? 'CreateExternal' : 'EditExternal';
    const url = this.settingService.settings?.baseUrl + `PointsAward/${ option }`;
    if (!this.updatePeriodFormControl(this.getValue('startDate'), 'periodMin') ||
      !this.updatePeriodFormControl(this.getValue('endDate'), 'periodMax'))
    {
      this.uiService.alert('بازه زمانی را وارد نمایید.');
      return;
    }

    const value: ExternalPointAward = this.form.value;

    if (!value.categoryId)
    {
      this.uiService.alert('دسته بندی جایزه را مشخص نمایید.');
      return;
    }

    if (!value.exporterBrand)
    {
      this.uiService.alert('برند نمایش دهنده را مشخص نمایید.');
      return;
    }

    if (!value.userTypeId)
    {
      this.uiService.alert('نوع کاربر را مشخص نمایید.');
      return;
    }

    if (!value.groupId)
    {
      this.uiService.alert('مشتری را مشخص نمایید.');
      return;
    }

    if (!value.groupId)
    {
      this.uiService.alert('مشتری را مشخص نمایید.');
      return;
    }

    if (!value.providerBrandId)
    {
      this.uiService.alert('برند را مشخص نمایید.');
      return;
    }

    if (!value.exporterBrandLogoId)
    {
      this.uiService.alert('لوگوی برند را مشخص نمایید.');
      return;
    }

    if (!value.exporterBrandHexaCode)
    {
      this.uiService.alert('کد رنگ را مشخص نمایید.');
      return;
    }

    if (!RegExp(Utility.hexColorPattern).test(value.exporterBrandHexaCode))
    {
      this.uiService.alert('کد رنگ را نادرست است.');
      return;
    }

    if (!value.pointAmount)
    {
      this.uiService.alert('امتیاز لازم را مشخص نمایید.');
      return;
    }

    if (!value.text)
    {
      this.uiService.alert('متن را مشخص نمایید.');
      return;
    }

    if (this.uiService.alertService.getErrorMessages().length !== 0)
    {
      return;
    }
    value.title = this.getTitle();
    callPostService<ExternalPointAward>(url, this.http, this.uiService, value).subscribe(value =>
    {
      this.uiService.success('با موفقیت ثبت شد.');
      setTimeout(() => { this.uiService.alertService.clearAllMessages(); }, 1500);

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

  getTitle() { return `${ this.getCategoryName() } برند  ${ this.getBrandName() } ${ this.getDiscountTypeTitle() }`; }

  getCategoryName()
  {
    const cId = this.form.get('categoryId')?.value;
    if (cId)
    {
      const cat = this.baseInfoService.categories$.getValue().filter(a => a.id === cId);
      if (cat.length === 0) { return ''; }
      return cat[0].title;
    }
    return '';
  }

  getBrandName(): string
  {
    return this.form.get('exporterBrand')?.value;
  }

  getDiscountTypeTitle()
  {
    return '';
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
