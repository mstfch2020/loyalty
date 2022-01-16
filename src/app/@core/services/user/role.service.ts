import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import { Role } from "../../data/auth/role.model";
import { BaseResponse, BaseResult } from "../../data/root/base-response.model";
import { RootStoreService } from "../root-store.service";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";

@Injectable()
export class RoleService
{

  constructor(
    private router: Router,
    private rootStoreService: RootStoreService,
    private http: HttpClient,
    private settingService: SettingsService,
    private uiService: UiService)
  { }

  loadRoles(): Observable<BaseResponse<Array<Role>> | null>
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Account/GetRoles';
    return this.http.post<BaseResponse<Array<Role>>>(url, null).pipe(finalize(() =>
    {
      this.rootStoreService.removeLoadingRequest();
    }));
  }

  loadRolesAndCast(pageSize: number, pageIndex: number): Observable<BaseResponse<BaseResult<Role>>>
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Account/GetRoles';

    return this.http.post<BaseResponse<BaseResult<Role>>>(url, { take: pageSize, skip: pageSize * pageIndex })
      .pipe(map(value =>
      {
        if (!value.isSuccess)
        {
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

  CreateNewRole(newRole: any)
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Account/AddRole';
    return this.http.post<BaseResponse<any>>(url, {
      Title: newRole.Title
    }).pipe(map(value =>
    {
      if (!value.isSuccess)
      {
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

  UpdateRole(newRole: any)
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Account/EditRole';
    return this.http.post<BaseResponse<any>>(url, {
      Id: parseInt(newRole.Id, 0),
      Title: newRole.Title
    }).pipe(map(value =>
    {
      if (!value.isSuccess)
      {
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

  RemoveRole(newRole: any)
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Account/RemoveRole';
    return this.http.post<BaseResponse<any>>(url, {
      Id: parseInt(newRole.Id, 0)
    }).pipe(map(value =>
    {
      if (!value.isSuccess)
      {
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
