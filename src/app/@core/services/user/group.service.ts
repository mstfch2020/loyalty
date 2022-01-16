import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import { Group } from "../../data/auth/group.model";
import { BaseResponse, BaseResult } from "../../data/root/base-response.model";
import { RootStoreService } from "../root-store.service";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui.service";

@Injectable()
export class GroupService
{

  constructor(
    private router: Router,
    private rootStoreService: RootStoreService,
    private http: HttpClient,
    private settingService: SettingsService,
    private uiService: UiService)
  { }

  loadGroups(): Observable<BaseResponse<Array<Group>> | null>
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Account/GetGroups';
    return this.http.post<BaseResponse<Array<Group>>>(url, null).pipe(finalize(() =>
    {
      this.rootStoreService.removeLoadingRequest();
    }));
  }

  loadGroupsAndCast(pageSize: number, pageIndex: number): Observable<BaseResponse<BaseResult<Group>>>
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Account/GetGroups';

    return this.http.post<BaseResponse<BaseResult<Group>>>(url, { take: pageSize, skip: pageSize * pageIndex })
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

  CreateNewGroup(newGroup: any)
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Account/AddGroup';
    return this.http.post<BaseResponse<any>>(url, {
      Title: newGroup.Title
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

  UpdateGroup(newGroup: any)
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Account/EditGroup';
    return this.http.post<BaseResponse<any>>(url, {
      Id: parseInt(newGroup.Id, 0),
      Title: newGroup.Title
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

  RemoveGroup(newGroup: any)
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Account/RemoveGroup';
    return this.http.post<BaseResponse<any>>(url, {
      Id: parseInt(newGroup.Id, 0)
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
