import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import { Product } from "../../data/mall/product.model";
import { BaseResponse, BaseResult } from "../../data/root/base-response.model";
import { RootStoreService } from "../root-store.service";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";

@Injectable({ providedIn: 'root' })
export class ProductService
{
  CreateNewGroup(newData: any)
  {
    return of({} as BaseResponse<any>);
  }
  UpdateGroup(newData: any)
  {
    return of({} as BaseResponse<any>);
  }
  RemoveGroup(newData: any)
  {
    return of({} as BaseResponse<any>);
  }
  constructor(
    private router: Router,
    private rootStoreService: RootStoreService,
    private http: HttpClient,
    private settingService: SettingsService,
    private uiService: UiService)
  { }

  loadProducts(): Observable<BaseResponse<Array<Product>> | null>
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Mall/GetProducts';
    return this.http.post<BaseResponse<Array<Product>>>(url, null).pipe(finalize(() =>
    {
      this.rootStoreService.removeLoadingRequest();
    }));
  }

  loadProductsAndCast(pageSize: number, pageIndex: number): Observable<BaseResponse<BaseResult<Product>>>
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Mall/GetProducts';

    return this.http.post<BaseResponse<BaseResult<Product>>>(url, { take: pageSize, skip: pageSize * pageIndex })
      .pipe(map(value =>
      {
        if (!value.isSuccess)
        {
          this.uiService.showSnackBar(value.errorMessage, '', 3000);
          return (value);
        }
        return (value);
      }), catchError(err =>
      {
        const res = <BaseResponse<any>>err.error;
        this.uiService.showSnackBar(res.errorMessage, '', 3000);
        console.log(res);
        return of(res);
      }));
  }

}
