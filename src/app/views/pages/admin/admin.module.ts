import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminRoutingModule} from "./admin-routing.module";
import {MainComponent} from './main/main.component';
import {ProfileComponent} from "./profile/profile.component";
import {UsersComponent} from "./users/users.component";
import {CustomerComponent} from './customer/customer.component';
import {ScenarioComponent} from './scenario/scenario.component';
import {CustomerGroupComponent} from './customer-group/customer-group.component';
import {CustomerGroupTemporaryComponent} from './customer-group-temporary/customer-group-temporary.component';
import {SendSmsComponent} from './send-sms/send-sms.component';
import {ReportsComponent} from './reports/reports.component';
import {SystemSettingsComponent} from './system-settings/system-settings.component';

@NgModule({
  declarations: [
    MainComponent,
    ProfileComponent,
    UsersComponent,
    CustomerComponent,
    ScenarioComponent,
    CustomerGroupComponent,
    CustomerGroupTemporaryComponent,
    SendSmsComponent,
    ReportsComponent,
    SystemSettingsComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
  ],
  exports: [
    MainComponent,
  ]
})
export class AdminModule {
}
