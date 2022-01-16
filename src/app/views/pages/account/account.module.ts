import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MainComponent} from './main/main.component';
import {AccountRoutingModule} from "./account-routing.module";
import { DisplayAlertComponent } from 'src/app/views/general/display-alert/display-alert.component';


@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    DisplayAlertComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule
  ],
  exports: [
    DisplayAlertComponent,
    MainComponent,
  ]
})
export class AccountModule {
}
