import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { NgxMaskModule } from 'ngx-mask';
import { HttpLoaderFactory } from './@core/infra/factories/http-loader-factory';
import { HttpConfigInterceptor } from './@core/infra/interceptor/http-config.interceptor';
import { ScenarioService } from './@core/services/loyalty/scenario.service';
import { RootStoreService } from './@core/services/root-store.service';
import { SettingsInitializerService } from './@core/services/settings-initializer';
import { UiService } from './@core/services/ui/ui.service';
import { UserService } from './@core/services/user/user.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { PageNotFoundComponent } from './views/general/page-not-found/page-not-found.component';
import { FooterComponent } from './views/layout/footer/footer.component';
import { HeaderComponent } from './views/layout/header/header.component';
import { AccountModule } from './views/pages/account/account.module';
import { AdminModule } from './views/pages/admin/admin.module';
import { HomeComponent } from './views/pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AdminModule,
    AccountModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    // StoreModule.forRoot(rootStore),
    // EffectsModule.forRoot([]),
    // NgOidcClientModule.forRoot({
    //   oidc_config: {
    //     authority: 'https://localhost:5001',
    //     client_id: 'ng-oidc-client-identity',
    //     redirect_uri: 'http://localhost:4200/callback.html',
    //     response_type: 'id_token token',
    //     scope: 'openid profile offline_access api1',
    //     post_logout_redirect_uri: 'http://localhost:4200/signout-callback.html',
    //     silent_redirect_uri: 'http://localhost:4200/renew-callback.html',
    //     accessTokenExpiringNotificationTime: 10,
    //     automaticSilentRenew: true,
    //     userStore: new WebStorageStateStore({ store: window.localStorage })
    //   },
    //   log: {
    //     logger: console,
    //     level: Log.NONE
    //   }
    // }),

    AuthModule.forRoot({
      config: {
        authority: 'https://Auth.ketabkesh.ir',
        redirectUrl: 'http://localhost:4200/login',
        postLogoutRedirectUri: 'http://localhost:4200/' + 'logout',
        clientId: window.location.href.includes('localhost') ? 'club_site_local_js' : 'club_site_js',
        scope: 'openid profile IdentityServerApi offline_access',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Debug,
      },
    }),
  ],
  providers: [UserService, RootStoreService, UiService, ScenarioService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: (initSettings: SettingsInitializerService) => () => initSettings.initializeSettings(),
      deps: [SettingsInitializerService],
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule
{
}
