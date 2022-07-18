import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import { Group, UserGroup } from "../../data/auth/group.model";
import { UserRole } from "../../data/auth/role.model";
import { BackOfficeUser } from "../../data/auth/user.model";
import { BaseResponse, BaseResult } from "../../data/root/base-response.model";
import { RootStoreService } from "../root-store.service";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";

@Injectable({ providedIn: 'root' })
export class UserService
{

  constructor(
    private router: Router,
    private rootStoreService: RootStoreService,
    private http: HttpClient,
    private settingService: SettingsService,
    private uiService: UiService)
  { }

  loadUsers(): Observable<BaseResponse<Array<BackOfficeUser>> | null>
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Account/GetUsers';
    return this.http.post<BaseResponse<Array<BackOfficeUser>>>(url, null).pipe(finalize(() =>
    {
      this.rootStoreService.removeLoadingRequest();
    }));
  }

  loadUsersAndCast(pageSize: number, pageIndex: number): Observable<BaseResponse<BaseResult<BackOfficeUser>>>
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Account/GetUsers';

    return this.http.post<BaseResponse<BaseResult<BackOfficeUser>>>(url, { take: pageSize, skip: pageSize * pageIndex })
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

  CreateNewUser(newUser: any)
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Account/AddUser';
    return this.http.post<BaseResponse<any>>(url, {
      Username: newUser.UserName,
      Password: newUser.Password,
      FirstName: newUser.FirstName,
      LastName: newUser.LastName,
      PhoneNumber: newUser.PhoneNumber,
      UserTypeId: parseInt(newUser.UserTypeId, 0)
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

  UpdateUser(newUser: any)
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Account/EditUser';
    return this.http.post<BaseResponse<any>>(url, {
      Id: parseInt(newUser.Id, 0),
      Username: newUser.UserName,
      Password: newUser.Password,
      FirstName: newUser.FirstName,
      LastName: newUser.LastName,
      PhoneNumber: newUser.PhoneNumber,
      UserTypeId: parseInt(newUser.UserTypeId, 0)
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

  RemoveUser(newUser: any)
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Account/RemoveUser';
    return this.http.post<BaseResponse<any>>(url, {
      Id: parseInt(newUser.Id, 0)
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

  loadGroups()
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Account/GetGroups';

    return this.http.post<BaseResponse<BaseResult<Group>>>(url, { take: 100, skip: 0 })
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

  loadUserGroups(userId: number)
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Account/GetUserGroups';

    return this.http.post<BaseResponse<BaseResult<UserGroup>>>(url, { Id: userId })
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

  loadUserRoles(userId: number)
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Account/GetUserRoles';

    return this.http.post<BaseResponse<BaseResult<UserRole>>>(url, { Id: userId })
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


  editUserGroup(userGroups: UserGroup[], userId: number)
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Account/EditUserGroups';
    return this.http.post<BaseResponse<any>>(url, {
      Id: userId,
      Groups: userGroups.filter(a => a.Selected === true).map(b => b.Id)
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

  editUserRoles(userRoles: UserRole[], userId: number)
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Account/EditUserRoles';
    return this.http.post<BaseResponse<any>>(url, {
      Id: userId,
      Roles: userRoles.filter(a => a.Selected === true).map(b => b.Id)
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
