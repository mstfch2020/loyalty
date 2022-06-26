import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup } from "@angular/forms";
import * as moment from 'jalali-moment';
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { IdTitle, IdTitleType } from "../../data/loyalty/get-senarios-grid.model";
import { ProductGroup } from "../../data/loyalty/product-group.model";
import { BaseResponse } from "../../data/root/base-response.model";
import { Utility } from "../../utils/Utility";
import { UiService } from "../ui/ui.service";
import { BaseInfoService } from "./base-info.service";


export function callGetService<T>(url: string, http: HttpClient, uiService: UiService, params: any = null): Observable<T | null>
{
  return http.get<BaseResponse<T>>(url, {
    params: params
  }).pipe(map(value =>
  {
    if (value.meta.code !== 200 || value.meta.errorMessage)
    {
      uiService.showSnackBar(value.meta.errorMessage, '', 3000);
      return (null);
    }
    return (value.data);
  }), catchError(err =>
  {
    console.log(err);

    if (err?.error?.meta?.errorMessage)
    {
      uiService.alert(err?.error?.meta?.errorMessage);
    } else
    {
      uiService.alert('خطا در اتصال به سرویس!');
    }
    return of(null);
  }));
}

export function callPostService<T>(url: string, http: HttpClient, uiService: UiService, params: any = null): Observable<T | null>
{
  return http.post<BaseResponse<T>>(url, params).pipe(map(value =>
  {
    if (value.meta.code !== 200 || value.meta.errorMessage)
    {
      uiService.alert(value.meta.errorMessage);
      return (null);
    }
    return (value.data);
  }), catchError(err =>
  {
    console.log(err);

    if (err?.error?.meta?.errorMessage)
    {
      uiService.alert(err?.error?.meta?.errorMessage);
    } else
    {
      uiService.alert('خطا در اتصال به سرویس!');
    }
    return of(null);
  }));
}

export function callPostPagingService<T>(url: string, http: HttpClient, uiService: UiService, params: any = null): Observable<BaseResponse<T> | null>
{
  return http.post<BaseResponse<T>>(url, params).pipe(map(value =>
  {
    if (value.meta.code !== 200 || value.meta.errorMessage)
    {
      uiService.showSnackBar(value.meta.errorMessage, '', 3000);
      return (null);
    }
    return (value);
  }), catchError(err =>
  {
    console.log(err);

    if (err?.error?.meta?.errorMessage)
    {
      uiService.alert(err?.error?.meta?.errorMessage);
    } else
    {
      uiService.alert('خطا در اتصال به سرویس!');
    }
    return of(null);
  }));
}

export abstract class BaseService<T>{
  form: FormGroup;
  totalPages = 0;
  _isDisabled = false;
  get isDisabled(): boolean { return this._isDisabled; }
  set isDisabled(value: boolean)
  {
    this._isDisabled = value;
    if (value) { this.form.disable(); } else { this.form.enable(); }
  }

  constructor(public formBuilder: FormBuilder, public uiService: UiService, public baseInfoService: BaseInfoService, initObject: T)
  {
    this.form = this.formBuilder.group({});
    this.createForm(initObject);
  }

  abstract createForm(scenario: T): void;

  updatePeriodFormControl(shamsiDate: string, formControlName: string): boolean
  {
    if (!shamsiDate)
    {
      return false;
    }
    const m = moment.from(shamsiDate.substring(0, 10), 'fa', 'YYYY/MM/DD');
    if (!m.isValid())
    {
      return false;
    }

    const date = shamsiDate.substring(0, 10)?.split('/');

    if (date && date.length === 3)
    {
      this.form.get(`${ formControlName }.year`)?.setValue(parseInt(date[0], 0));
      this.form.get(`${ formControlName }.month`)?.setValue(parseInt(date[1], 0));
      this.form.get(`${ formControlName }.day`)?.setValue(parseInt(date[2], 0));
    }

    const time = shamsiDate.substring(11, shamsiDate.length)?.split(':');
    if (time && time.length === 3)
    {
      this.form.get(`${ formControlName }.hours`)?.setValue(parseInt(time[0], 0));
      this.form.get(`${ formControlName }.minutes`)?.setValue(parseInt(time[1], 0));
      this.form.get(`${ formControlName }.seconds`)?.setValue(parseInt(time[2], 0));
    }
    return true;
  }

  abstract submit(): void;

  getValue(name: string)
  {
    return this.form.get(name)?.value;
  }

  setValue(name: string, value: any)
  {
    return this.form.get(name)?.setValue(value);
  }

  getFormGroup(fgName: string): FormGroup
  {
    return (this.form.controls[fgName] as any);
  }

  brandChanged($event: Array<IdTitle | IdTitleType>, formControlName: string): void
  {
    if ($event.length === 0) { return; }
    const all = $event[$event.length - 1];
    if (all?.id === 'all')
    {
      this.form.controls[formControlName].setValue([all.id]);
    } else
    {
      this.form.controls[formControlName].setValue($event.filter(p => p.id !== 'all').map(p => p.id));
    }
  }

  addFreeProduct(term: string)
  {
    if (isValidProductCode(term))
    {
      return term;
    }
    // this.uiService.showSnackBar('کد تخفیف باید عدد 7 رقمی باشد.', '', 3000);
    this.uiService.alert('کد تخفیف باید عدد 7 رقمی باشد.');
    return null;
  }

  addCustomer(term: string)
  {
    if (term && new RegExp(Utility.mobileRegEx).test(term))
    {
      return { id: term, title: term, type: 3 };
    }
    this.uiService.alert('شماره موبایل معتبر نمیباشد.');
    return null;
  }

  addProductGroups(term: string)
  {
    if (isValidProductCode(term))
    {
      return { id: term, title: term, type: 3 };
    }
    return null;
  }

  public updateProductGroupsIdCode(data: string[], productGroups: ProductGroup[], formControlName: string)
  {
    const scenarioProductGroups = new Array<ProductGroup>();
    data.forEach((p: any) =>
    {
      if (Utility.isNullOrEmpty(p?.toString())) { return; }
      const productGroup = productGroups.find(customer => customer.id === p?.toString());
      if (!productGroup || productGroup.id === productGroup.title)
      {
        scenarioProductGroups.push({ id: p?.toString(), title: p?.toString(), brandId: 'null' });
        return;
      }
      scenarioProductGroups.push(productGroup);
    });

    this.setValue(formControlName, scenarioProductGroups.map(p => p.id));

    if (scenarioProductGroups.length > 0)
    {
      const baseInfoData = this.baseInfoService?.productGroups$?.getValue();
      const filteredData = scenarioProductGroups.filter(p => p.id === p.title);
      const data = baseInfoData?.concat(filteredData);
      this.baseInfoService?.productGroups$?.next(data);
    }
  }

  public updateValueForProductGroupsCodeIds(value: any, idsName: string, codesName: string, formName: string, productGroups: ProductGroup[])
  {
    value[idsName] = [];
    value[codesName] = [];

    [...value[formName]].forEach((p: any) =>
    {
      const productGroup = productGroups.find(a => a.id === p);
      //if (!productGroup)
      {
        if (new RegExp(Utility.numberRegEx).test(p?.toString()) && p?.toString()?.length === 7)
        {
          value[codesName].push(p?.toString());
          return;
        }
      }
      value[idsName].push(p);
    });

    if (value[formName].some((p: string) => p === 'all'))
    {
      value[idsName] = [];
      value[codesName] = [];
    }

    delete value[formName];
  }

}

export function isValidProductCode(term: string)
{
  if (term && new RegExp(Utility.numberRegEx).test(term) && term.length === 7)
  {
    return true;
  }
  return false;
};

// @Injectable({ providedIn: 'root' })
// export class BaseService<T> {
//   constructor(
//     public http: HttpClient,
//     public uiService: UiService) { }

//   callService(url: string): Observable<T>
//   {
//     return this.http.get<BaseResponse<T>>(url).pipe(map(value =>
//     {
//       if (value.meta.code !== 200 || value.meta.errorMessage)
//       {
//         this.uiService.showSnackBar(value.meta.errorMessage, '', 3000);
//         return ({} as T);
//       }
//       return (value.data);
//     }), catchError(err =>
//     {
//       console.log(err);
//       const res = <BaseResponse<any>>err.error;
//       if (res?.meta?.errorMessage)
//       {
//         this.uiService.showSnackBar(res?.meta?.errorMessage, '', 3000);
//       }
//       return of(({} as T));
//     }));
//   }
// }
