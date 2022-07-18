import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as oidcClient from 'oidc-client';
import { UserState } from '../../data/auth/user-state.model';
import { RootStoreService } from '../root-store.service';
import { SettingsService } from '../settings-service';
import { StoreService } from '../store.service';
import { LogManagerService } from '../ui/log-manager.service';
import { UiService } from "../ui/ui.service";

@Injectable({ providedIn: 'root' })
export class AuthService extends StoreService<UserState> {

  user?: oidcClient.User | null;
  userManager: oidcClient.UserManager;

  constructor(private router: Router,
    private rootStoreService: RootStoreService,
    private http: HttpClient,
    private settingService: SettingsService,
    private uiService: UiService,
    private logManagerService: LogManagerService)
  {
    super();

    this.userManager = new oidcClient.UserManager(getClientSettings());

    this.userManager.getUser().then(user =>
    {
      this.user = user;
    });

  }

  isLoggedIn(): boolean
  {
    return this.user !== null && !this.user?.expired;
  }

  getClaims(): any
  {
    return this.user?.profile;
  }

  getAuthorizationHeaderValue(): string
  {
    if (!this.user || !this.user.token_type || !this.user.access_token) { return ''; }
    return `${ this.user.token_type } ${ this.user.access_token }`;
  }

  startAuthentication(): void
  {
    //return this.userManager.signinRedirect();
    this.userManager.signinPopup()
      .then((user: oidcClient.User) =>
      {
        console.log('signinPopup');
        console.log(user);
        this.user = user;
        this.router.navigate(['/admin/main']);
      })
      .catch((e: any) =>
      {
        console.log('signinPopupErr');
        console.log(e);
        this.router.navigate(['/admin/main']);
      });
  }

  completeAuthentication(): Promise<void>
  {
    // return this.userManager.signinRedirectCallback().then(user =>
    return this.userManager.signinPopupCallback().then(user =>
    {
      console.log('signinPopupCallback');
      console.log(user);
      localStorage.setItem("user", JSON.stringify(user));
      this.user = user;
      this.router.navigate(['/admin/main']);
    });
  }

  signout(): void
  {
    try
    {
      this.userManager.signoutRedirect();
      this.userManager.clearStaleState();
    } catch (error)
    {
      console.log(error);
    }
  }

  signoutpop(): void
  {
    try
    {
      this.userManager.signoutPopup();
      this.userManager.clearStaleState();
    } catch (error)
    {
      console.log(error);
    }
  }

  private logoutInner()
  {
    console.log('signoutPopupErr');
    this.userManager.clearStaleState();
    this.user = null;
    localStorage.clear();
    window.location.href = window.location.origin;
  }

  completeSignout()
  {

    try
    {
      this.userManager.signoutRedirectCallback().finally(() =>
      {
        console.log('signinPopupCallback');
        this.logoutInner();
      });
    } catch (error) { console.log(error); }

    try
    {
      this.userManager.signoutPopupCallback().finally(() =>
      {
        console.log('signinPopupCallback');
        this.logoutInner();
      });
    } catch (error) { console.log(error); }
  }

}


export function getClientSettings(): oidcClient.UserManagerSettings
{
  const baseUrl = window.location.href.includes('localhost') ? 'http://localhost:4200/login' : 'https://loyalty.mysatrapstage.com';
  return {
    authority: 'https://auth.ketabkesh.ir',
    client_id: window.location.href.includes('localhost') ? 'club_site_local_js' : 'club_site_js',
    redirect_uri: `${ baseUrl }/login`,
    response_type: "code",
    scope: "openid profile api1 IdentityServerApi offline_access",
    post_logout_redirect_uri: `${ baseUrl }/register`,
    popup_post_logout_redirect_uri: `${ baseUrl }/register`,
    userStore: new oidcClient.WebStorageStateStore({ store: localStorage }),
    response_mode: "query",
    automaticSilentRenew: false,
    accessTokenExpiringNotificationTime: 30,
    filterProtocolClaims: false,
    // loadUserInfo: true,
  };
}
