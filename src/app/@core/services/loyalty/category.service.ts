import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { Category, CategoryGrid, categoryInit } from "../../data/loyalty/category.model";
import { Utility } from "../../utils/Utility";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { BaseInfoService } from "./base-info.service";
import { BaseService, callGetService, callPostService } from "./BaseService";

@Injectable({ providedIn: 'root' })
export class CategoryService extends BaseService<Category>
{
  category$ = new BehaviorSubject<Array<CategoryGrid>>([]);

  constructor(public override formBuilder: FormBuilder,
    public http: HttpClient,
    public settingService: SettingsService,
    public override uiService: UiService, public override baseInfoService: BaseInfoService)
  {
    super(formBuilder, uiService, baseInfoService, categoryInit);
  }

  createForm(category: Category): void
  {
    this.form = this.formBuilder.group({
      id: [category.id, [Validators.required]],
      title: [category.title, [Validators.required]],
      isActive: [category.isActive, [Validators.required]],
    });
  }

  getCategoryPointsAwardGrid()
  {
    const url = this.settingService.settings?.baseUrl + 'CategoryPointsAward/GetCategoryPointsAwardGrid';
    return callGetService<Array<CategoryGrid>>(url, this.http, this.uiService).subscribe(value =>
    {
      this.category$.next([]);
      this.totalPages = 0;
      if (value)
      {
        this.category$.next(value);
      }
    });
  }

  setActive(category: CategoryGrid)
  {
    const url = this.settingService.settings?.baseUrl + `CategoryPointsAward/SetActive`;
    callPostService<Category>(url, this.http, this.uiService, category).subscribe(value =>
    {
      if (value) this.uiService.success('با موفقیت ثبت شد.');
      else
      {
        category.isActive = !category.isActive;
      }
    });
  }

  submit(selectedValue: any = null): void
  {
    const value = selectedValue ? selectedValue : this.form.value;
    const option = Utility.isNullOrEmpty(value.id) ? 'Create' : 'Edit';
    const url = this.settingService.settings?.baseUrl + `CategoryPointsAward/${ option }`;

    if (!value.title)
    {
      this.uiService.alert('نوع دسته بندی را وارد نمایید.');
      return;
    }
    if (Utility.isNullOrEmpty(value.id)) { delete value.id; }

    callPostService<Category>(url, this.http, this.uiService, value).subscribe(value =>
    {
      if (value)
      {
        this.uiService.success('با موفقیت ثبت شد.');
        this.getCategoryPointsAwardGrid();
      }
    });

  }
}
