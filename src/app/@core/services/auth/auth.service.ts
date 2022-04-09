import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserManager, UserManagerSettings, WebStorageStateStore } from 'oidc-client';
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

  public manager = new UserManager(getClientSettings());
  private user: any = null;


  constructor(private router: Router,
    private rootStoreService: RootStoreService,
    private http: HttpClient,
    private settingService: SettingsService,
    private uiService: UiService,
    private logManagerService: LogManagerService)
  {
    super();

    this.manager.getUser().then(user =>
    {
      debugger;
      this.user = user;
    });

    if (!localStorage['userState']) return;
    const user: UserState = Object.assign({}, JSON.parse(localStorage['userState']));
    this.subject.next(user);
    this.addUser(user.user);
  }

  isLoggedIn(): boolean
  {
    return this.user != null && !this.user.expired;
  }

  getClaims(): any
  {
    return this.user.profile;
  }

  getAuthorizationHeaderValue(): string
  {
    return `${ this.user.token_type } ${ this.user.access_token }`;
  }


  startAuthentication(): Promise<any>
  {
    this.manager.revokeAccessToken().then(value => { debugger; }).catch(value => { debugger; });
    return this.manager.signinSilent();
  }

  completeAuthentication(): Promise<void>
  {
    return this.manager.signinRedirectCallback().then(user =>
    {
      this.user = user;
    });
  }

  getIsAuth(): Observable<boolean>
  {
    return this.select<User>('user').pipe(map(userValue =>
    {
      const user = Object.assign({} as User, userValue);
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
    return this.select<User>('user').pipe(map(userValue =>
    {
      const user = Object.assign({} as User, userValue);
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

  //OAuth
  retrieveTokenSatrap()
  {
    let params = new URLSearchParams();
    // params.append('grant_type', 'authorization_code');
    // params.append('client_id', 'club_site_js');
    // params.append('client_secret', 'newClientSecret');
    // params.append('redirect_uri', 'this.redirectUri');
    // params.append('code', code);

    params.append('grant_type', 'client_credentials');
    params.append('client_id', 'Parking-Integration');
    params.append('client_secret', 'lskdfjprtgnmkhfjvgtj3oi9re78ut90t3jgTVOFJW940TGUJ24TJ90');
    params.append('redirect_uri', 'this.redirectUri');
    params.append('scope', 'ParkingSyncAPI');
    // params.append('code', code);

    let headers =
      new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8' });
    // const url = 'http://localhost:8083/auth/realms/baeldung/protocol/openid-connect/token';
    const url = 'https://accounts.mysatrap.com/connect/token';
    this.http.post(url,
      params.toString(), { headers: headers })
      .subscribe(
        data => console.log(data),
        err => console.log(err));
  }

  retrieveToken()
  {
    let params = new URLSearchParams();
    // params.append('grant_type', 'client_credentials');
    // // params.append('authority', 'Auth.ketabkesh.ir');
    // params.append('client_id', window.location.href.includes('localhost') ? 'club_site_local_js' : 'club_site_js');
    // // params.append('redirect_uri', 'this.redirectUri');
    // // params.append('client_secret', 'newClientSecret');
    // params.append('response_type', 'code');
    // params.append('scope', 'openid profile IdentityServerApi offline_access');
    // params.append('response_mode', 'query');




    params.append('client_id', window.location.href.includes('localhost') ? 'club_site_local_js' : 'club_site_js');
    params.append('code', '78405f15d48383aec09932208ab9b1044e304ed5e535758771ee38748c7b785c');
    params.append('redirect_uri', 'https://localhost:3000/login');
    params.append('code_verifier', 'c1ba524faab54279bc052e134e05f3dcd976b8e128f849dcb15a7dd41e4032e44a24fae4d1a741048d3e8b97549d95a7');
    params.append('grant_type', 'authorization_code');


    let headers =
      new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8' });
    const url = 'https://auth.ketabkesh.ir/connect/token';

    this.http.post(url,
      params.toString(), { headers: headers })
      .subscribe(
        data => console.log(data),
        err => console.log(err));
  }


}


export function getClientSettings(): UserManagerSettings
{
  return {
    authority: 'https://auth.ketabkesh.ir/',
    client_id: window.location.href.includes('localhost') ? 'club_site_local_js' : 'club_site_js',
    redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:4200/',
    response_type: "id_token token",
    scope: "openid profile api1 IdentityServerApi offline_access",
    userStore: new WebStorageStateStore({ store: localStorage }),
    loadUserInfo: true,
    // response_mode: "query",
    // automaticSilentRenew: true,
    // silent_redirect_uri: `https://localhost:4200/login`,
    // accessTokenExpiringNotificationTime: 60,
    // filterProtocolClaims: false,
  };
}
