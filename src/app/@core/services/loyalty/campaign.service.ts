import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { Campaign, CampaignGrid, campaignInit } from "../../data/loyalty/campaign.model";
import { createPeriodFormGroup } from "../../data/loyalty/period.model";
import { Utility } from "../../utils/Utility";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { BaseInfoService } from "./base-info.service";
import { BaseService, callGetService, callPostPagingService, callPostService } from "./BaseService";
import { FileService } from "./file.service";

@Injectable({ providedIn: 'root' })
export class CampaignService extends BaseService<Campaign>
{
  Campaigns$ = new BehaviorSubject<Array<CampaignGrid>>([]);

  constructor(public override formBuilder: FormBuilder,
    public http: HttpClient,
    public settingService: SettingsService,
    public override uiService: UiService, public fileService: FileService, public override baseInfoService: BaseInfoService)
  {
    super(formBuilder, uiService, baseInfoService, campaignInit);
  }

  getCampaign(data: any)
  {
    const url = this.settingService.settings?.baseUrl + 'Campaign/GetCampaignsGrid';
    return callPostPagingService<Array<CampaignGrid>>(url, this.http, this.uiService, data).subscribe(value =>
    {
      this.Campaigns$.next([]);
      this.totalPages = 0;
      if (value?.data)
      {
        this.Campaigns$.next(value.data);
        this.totalPages = Math.ceil(value.pagination.total / data.pageSize);
      }
    });
  }

  fileUpload(formData: FormData)
  {
    this.fileService.fileUpload(formData).subscribe(value =>
    {
      this.setValue('fileId', value.fileId.id);
      this.uiService.success('فایل با موفقیت بارگزاری شد.');
    });
  }

  createForm(campaign: Campaign): void
  {
    this.form = this.formBuilder.group({
      id: [campaign.id, [Validators.required]],
      title: [campaign.title, [Validators.required]],
      fileId: [campaign.fileId, [Validators.required]],
      expireDateControl: [Utility.getFullDateTimeFromPeriodInPersian(campaign.expireDate), [Validators.required]],
      expireDate: createPeriodFormGroup(campaign.expireDate, this.formBuilder),
    });
  }

  getCampaignById(id: any)
  {
    const url = this.settingService.settings?.baseUrl + 'Campaign/GetCampaignById';
    return callGetService<Campaign>(url, this.http, this.uiService, {
      id: id
    });
  }

  submit(): void
  {
    console.log(this.form.value);
    const option = Utility.isNullOrEmpty(this.getValue('id')) ? 'Create' : 'Edit';
    const url = this.settingService.settings?.baseUrl + `Campaign/${ option }`;
    if (Utility.isNullOrEmpty(this.getValue('fileId')))
    {
      this.uiService.alert('ابتدا فایل را بارگزاری نمایید .');
      return;
    }

    this.updatePeriodFormControl(this.getValue('expireDateControl'), 'expireDate');
    const value = this.form.value;
    if (Utility.isNullOrEmpty(value.id)) { delete value.id; }


    callPostService<Campaign>(url, this.http, this.uiService, value).subscribe(value =>
    {
      this.form.controls['id'].setValue(value?.id);
      this.uiService.success('با موفقیت ثبت شد.');
    });

  }
}
