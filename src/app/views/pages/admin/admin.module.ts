import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from '@ng-select/ng-select';
import { AdminRoutingModule } from "./admin-routing.module";
import { CustomerGroupTemporaryComponent } from './customer-group-temporary/customer-group-temporary.component';
import { CustomerGroupComponent } from './customer-group/customer-group.component';
import { CustomerComponent } from './customer/customer.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from "./profile/profile.component";
import { ReportsComponent } from './reports/reports.component';
import { ScenarioComponent } from './scenario/scenario.component';
import { SendSmsComponent } from './send-sms/send-sms.component';
import { SystemSettingsComponent } from './system-settings/system-settings.component';
import { UsersComponent } from "./users/users.component";
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
    NgSelectModule,
  ],
  exports: [
    MainComponent,
  ]
})
export class AdminModule
{
}
