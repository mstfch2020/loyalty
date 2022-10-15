import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { Utility } from 'src/app/@core/utils/Utility';
import { DiscountValidationDateType } from "../../data/loyalty/enums.model";
import { IdTitleTypeBrandId } from "../../data/loyalty/get-senarios-grid.model";
import { AwareDiscountCodePattern, InternalPointAward, InternalPointAwardGrid, InternalPointAwardInit } from "../../data/loyalty/internal-point-award.model";
import { createPeriodFormGroup } from "../../data/loyalty/period.model";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { BaseInfoService } from "./base-info.service";
import { BaseService, callGetService, callPostPagingService, callPostService } from "./BaseService";
import { FileService } from "./file.service";

@Injectable({
  providedIn: 'root'
})
export class InternalPointAwardService extends BaseService<InternalPointAward>{

  editMode = false;
  theListView$ = new BehaviorSubject<Array<InternalPointAwardGrid>>([]);
  awareDiscountCodePatterns$ = new BehaviorSubject<Array<AwareDiscountCodePattern>>([]);
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
    super(formBuilder, uiService, baseInfoService, InternalPointAwardInit);
  }

  createForm(internalAward: InternalPointAward)
  {
    this.editMode = false;
    this.form = this.formBuilder.group({
      title: [internalAward.title, [Validators.required]],
      providerBrandId: [internalAward.providerBrandId, [Validators.required]],
      userTypeId: [internalAward.userTypeId, [Validators.required]],
      groupId: [internalAward.groupId, [Validators.required]],
      exporterBrandId: [internalAward.exporterBrandId, [Validators.required]],
      exporterBrandLogoId: [internalAward.exporterBrandLogoId, [Validators.required]],
      exporterBrandHexaCode: [internalAward.exporterBrandHexaCode, [Validators.required]],
      exporterBrandLogoName: [internalAward.exporterBrandLogoName, [Validators.required]],
      pointAmount: [internalAward.pointAmount, [Validators.required]],
      patternId: [internalAward.patternId, [Validators.required]],
      discountValidationDateType: [internalAward.discountValidationDateType, [Validators.required]],
      discountCodeDaysAfterIssuedCode: [internalAward.discountCodeDaysAfterIssuedCode, [Validators.required]],
      id: [internalAward.id, [Validators.required]],
      categoryId: [internalAward.categoryId ?? '', [Validators.required]],
      discountCodeDate: createPeriodFormGroup(internalAward.discountCodeDate, this.formBuilder),
      expireDate: [Utility.getFullDateTimeFromPeriodInPersian(internalAward.discountCodeDate), [Validators.required]]
    });
  }

  GetLocalPointsAwardById(id: string)
  {
    const url = this.settingService.settings?.baseUrl + 'PointsAward/GetLocalPointsAwardById';
    return callGetService<InternalPointAward>(url, this.http, this.uiService, {
      id: id
    });
  }

  GetLocalPointsAwardsGrid(request: any)
  {
    const url = this.settingService.settings?.baseUrl + 'PointsAward/GetLocalPointsAwardsGrid';

    return callPostPagingService<Array<InternalPointAwardGrid>>(url, this.http, this.uiService, request).subscribe(value =>
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
    const option = Utility.isNullOrEmpty(this.getValue('id')) ? 'CreateLocal' : 'EditLocal';
    const url = this.settingService.settings?.baseUrl + `PointsAward/${ option }`;

    if (this.form.get('discountValidationDateType')?.value === DiscountValidationDateType.Date)
    {
      if (!this.updatePeriodFormControl(this.getValue('expireDate'), 'discountCodeDate'))
      {
        this.uiService.alert('تاریخ اعتبار الگوی کد تخفیف را مشخص نمایید.');
        return;
      }
    } else if (!this.form.get('discountCodeDaysAfterIssuedCode')?.value)
    {
      this.uiService.alert('تعداد روز پس از صدور کد را وارد نمایید.');
      return;
    }

    const value: InternalPointAward = this.form.value;

    if (!value.categoryId)
    {
      this.uiService.alert('دسته بندی جایزه را مشخص نمایید.');
      return;
    }

    if (!value.exporterBrandId)
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

    if (!value.patternId)
    {
      this.uiService.alert('الگوی کد تخفیف را مشخص نمایید.');
      return;
    }

    if (this.uiService.alertService.getErrorMessages().length !== 0)
    {
      return;
    }
    value.title = this.getTitle();
    callPostService<InternalPointAward>(url, this.http, this.uiService, value).subscribe(value =>
    {
      this.uiService.success('با موفقیت ثبت شد.');
      setTimeout(() => { this.uiService.alertService.clearAllMessages(); }, 1500);

    });

  }

  fileUpload(formData: FormData)
  {
    this.fileService.fileUpload(formData).subscribe(value =>
    {
      this.setValue('exporterBrandLogoId', value.fileId.id);
      this.uiService.success('فایل با موفقیت بارگزاری شد.');
    });
  }

  fileSelectionChanged(event: any)
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

      this.fileUpload(this.formData);
    }
  }

  getTitle() { return `${ this.getDiscountTypeTitle() } برند ${ this.getBrandName() }`; }

  getBrandName(): string
  {
    const brandId = this.form.get('exporterBrandId')?.value;
    if (brandId)
    {
      const brands = this.baseInfoService.brands$.getValue().filter(a => a.id === brandId);
      if (brands.length === 0) { return ''; }
      return brands[0].title;
    }
    return '';
  }

  getDiscountTypeTitle()
  {
    const patternId = this.form.get('patternId')?.value;
    if (patternId)
    {
      const codeItem = this.awareDiscountCodePatterns$.getValue().filter(a => a.id === patternId)[0];
      if (!codeItem) { return ''; }

      if (codeItem.discountType === 1)
      {
        return `${ codeItem.discountVolume } تومان`;
      }

      return `${ codeItem.discountVolume } درصد تخفیف تا سقف ${ codeItem.discountCeiling } تومان`;
    }
    return '';
  }

  getCustomerByBrandId(brandIds: Array<string>): Array<IdTitleTypeBrandId>
  {
    return this.baseInfoService?.generalCustomers$?.getValue()?.filter(p => p.id === 'all' || brandIds.length === 0 || brandIds.findIndex(a => a === p.brandId) !== -1 || p.type !== 1);
  }
}
