import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { UserState } from '../../data/auth/user-state.model';
import { AuthData, User } from '../../data/auth/user.model';
import { BaseResponse } from '../../data/root/base-response.model';
import { Utility } from '../../utils/Utility';
import { RootStoreService } from '../root-store.service';
import { SettingsService } from '../settings-service';
import { StoreService } from '../store.service';
import { LogManagerService } from '../ui/log-manager.service';
import { HttpOptions } from '../ui/settings.service';
import { UiService } from "../ui/ui.service";

const userState: UserState = {
  user: {
    Name: '',
    Token: '',
    Id: 0,
    PhoneNumber: '',
    FirstName: '',
    InsertDate: new Date(),
    LastName: '',
    UserName: '',
    UserTypeId: 0
  },
};

@Injectable({ providedIn: 'root' })
export class AuthService extends StoreService<UserState> {

  constructor(private router: Router,
    private rootStoreService: RootStoreService,
    private http: HttpClient,
    private settingService: SettingsService,
    private uiService: UiService,
    private logManagerService: LogManagerService)
  {
    super();
    if (!localStorage['userState']) return;
    const user: UserState = Object.assign({}, JSON.parse(localStorage['userState']));
    this.subject.next(user);
    this.addUser(user.user);
  }

  getIsAuth(): Observable<boolean>
  {
    return this.select<User>('user').pipe(map(user =>
    {
      if (!user || !user.Id)
      {
        return false;
      }
      return user.Id >= 0;
    }),
      catchError(error => of(false)));
  }

  getTocken(): Observable<string>
  {
    return this.select<User>('user').pipe(map(user =>
    {
      if (!user || !user.Token)
      {
        return '';
      }
      return user.Token;
    }),
      catchError(error => of('')));
  }

  addUser(user: User | null)
  {
    const value = this.subject.value;
    this.subject.next({ ...value, user: user });
  }

  login(authData: AuthData): Observable<BaseResponse<User>>
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Account/Login';
    return this.http.post<BaseResponse<User>>(url, authData)
      .pipe(map(value =>
      {
        if (!value.isSuccess)
        {
          return (value);
        }
        this.addUser(value.data);
        localStorage['userState'] = JSON.stringify(this.subject.value);
        return (value);
      }), catchError(err =>
      {
        const res = <BaseResponse<any>>err.error;
        // this.uiService.showSnackBarTranslateMessage(res.ErrorMessage, '', 3000);
        localStorage['userState'] = '';
        this.addUser(null);
        console.log(res);
        return of(res);
      }), finalize(() =>
      {
        this.rootStoreService.removeLoadingRequest();
      }));
  }

  logout()
  {
    localStorage['userState'] = '';
    this.addUser(null);
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Account/Logout';
    return this.http.post<BaseResponse<Array<any>>>(url, null).pipe(finalize(() =>
    {
      this.rootStoreService.removeLoadingRequest();
    })).subscribe(result =>
    {
      this.router.navigate(['/home']);
    });
  }

  public refreshToken(): Observable<any>
  {
    let data = { username: this.settingService.settings?.userName, password: this.settingService.settings?.password };
    if (Utility.isNullOrEmpty(this.settingService.settings?.userName))
    {
      data = { username: localStorage['userName'], password: localStorage['password'] };
    }

    return this.http.post<any>(this.settingService.settings?.baseUrl + 'Account/Login',
      data).pipe(map(value =>
      {
        if (!value.success)
        {
          return ('');
        }
        this.addUser(value.user);
        localStorage['userState'] = JSON.stringify(this.subject.value);
        return (value.user);
      }), catchError(err =>
      {
        this.router.navigateByUrl('/account/login');
        return of(null);
      }));
  }

  /**
   * Register user
   * @param username
   * @param password
   */
  public register(
    name: string,
    family: string,
    nationalityCode: string,
    personType: number,
    unit: number,
    phoneNumber: string,
    username: string,
    password: string
  ): Observable<BaseResponse<User>>
  {

    let requestUrl = this.settingService.settings?.baseUrl + '/Account/Register';

    let requestData =
    {
      "Username": username,
      "Password": password,
      "Email": "",
      "Name": name,
      "Family": family,
      "NationalityCode": nationalityCode,
      "PersonType": personType,
      "Unit": unit,
      "PhoneNumber": phoneNumber,
      "RememberMe": false,
    };

    return this.http.post<BaseResponse<User>>
      (requestUrl, requestData, HttpOptions.httpOptions)
      .pipe(map(result =>
      {
        result.errorMessages.forEach(msg =>
        {
          this.logManagerService.logError(msg);
        });
        return result;
      }));
  }
}
