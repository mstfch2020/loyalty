import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpLoaderFactory} from './@core/infra/factories/http-loader-factory';
import {HttpConfigInterceptor} from './@core/infra/interceptor/http-config.interceptor';
import {RootStoreService} from './@core/services/root-store.service';
import {SettingsInitializerService} from './@core/services/settings-initializer';
import {UserService} from './@core/services/user/user.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './views/general/page-not-found/page-not-found.component';
import {FooterComponent} from './views/layout/footer/footer.component';
import {HeaderComponent} from './views/layout/header/header.component';
import {AccountModule} from './views/pages/account/account.module';
import {AdminModule} from './views/pages/admin/admin.module';
import {HomeComponent} from './views/pages/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {UiService} from './@core/services/ui/ui.service';

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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
  ],
  providers: [UserService, RootStoreService, UiService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true},
    {
      provide: APP_INITIALIZER,
      useFactory: (initSettings: SettingsInitializerService) => () => initSettings.initializeSettings(),
      deps: [SettingsInitializerService],
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
