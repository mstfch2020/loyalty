import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
// import {DisplayAlertComponent} from 'src/app/views/general/display-alert/display-alert.component';
import {AccountRoutingModule} from "./account-routing.module";
import {LoginComponent} from "./login/login.component";
import {MainComponent} from './main/main.component';
import {RegisterComponent} from "./register/register.component";


@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    // DisplayAlertComponent,
    RegisterComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule
  ],
  exports: [
    // DisplayAlertComponent,
    MainComponent,
  ]
})
export class AccountModule {
}
