import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import { Merchant } from "../../data/auth/merchant.model";
import { BaseResponse, BaseResult } from "../../data/root/base-response.model";
import { RootStoreService } from "../root-store.service";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";

@Injectable({ providedIn: 'root' })
export class MerchantService
{
  constructor(
    private router: Router,
    private rootStoreService: RootStoreService,
    private http: HttpClient,
    private settingService: SettingsService,
    private uiService: UiService)
  { }

  loadMerchants(): Observable<BaseResponse<Array<Merchant>> | null>
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Mall/GetMerchants';
    return this.http.post<BaseResponse<Array<Merchant>>>(url, null).pipe(finalize(() =>
    {
      this.rootStoreService.removeLoadingRequest();
    }));
  }

  loadMerchantsAndCast(pageSize: number, pageIndex: number): Observable<BaseResponse<BaseResult<Merchant>>>
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Mall/GetMerchants';

    return this.http.post<BaseResponse<BaseResult<Merchant>>>(url, { take: pageSize, skip: pageSize * pageIndex })
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

  CreateNewMerchant(newMerchant: any)
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Mall/AddMerchant';
    return this.http.post<BaseResponse<any>>(url, {
      MerchantName: newMerchant.MerchantName,
      ConnectionString: newMerchant.ConnectionString,
      ConnectionStringTypeID: parseInt(newMerchant.ConnectionStringTypeID, 0)
    }).pipe(map(value =>
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

  UpdateMerchant(newMerchant: any)
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Mall/EditMerchant';
    return this.http.post<BaseResponse<any>>(url, {
      MerchantID: parseInt(newMerchant.MerchantID, 0),
      MerchantName: newMerchant.MerchantName,
      ConnectionString: newMerchant.ConnectionString,
      ConnectionStringTypeID: parseInt(newMerchant.ConnectionStringTypeID, 0)
    }).pipe(map(value =>
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

  RemoveMerchant(newMerchant: any)
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Mall/RemoveMerchant';
    return this.http.post<BaseResponse<any>>(url, {
      MerchantID: parseInt(newMerchant.MerchantID, 0)
    }).pipe(map(value =>
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

  loadConnectionStringType()
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Mall/GetConnectionStringTypes';

    return this.http.post<BaseResponse<BaseResult<any>>>(url, { take: 100, skip: 0 })
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
