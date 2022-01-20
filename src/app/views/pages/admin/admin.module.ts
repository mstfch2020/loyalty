import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from '@ng-select/ng-select';
import {AdminRoutingModule} from "./admin-routing.module";
import {CustomerGroupTemporaryComponent} from './customer-group-temporary/customer-group-temporary.component';
import {CustomerGroupComponent} from './customer-group/customer-group.component';
import {CustomerComponent} from './customer/customer.component';
import {MainComponent} from './main/main.component';
import {ProfileComponent} from "./profile/profile.component";
import {ReportsComponent} from './reports/reports.component';
import {ScenarioComponent} from './scenario/scenario.component';
import {SendSmsComponent} from './send-sms/send-sms.component';
import {SystemSettingsComponent} from './system-settings/system-settings.component';
import {UsersComponent} from "./users/users.component";
import {SwitchComponent} from './switch/switch.component';
import {CustomerGroupTemporaryCampaignComponent} from './customer-group-temporary/customer-group-temporary-campaign/customer-group-temporary-campaign.component';
import {CustomerGroupTemporaryGridComponent} from './customer-group-temporary/customer-group-temporary-grid/customer-group-temporary-grid.component';
import {CustomerGroupTemporaryRootComponent} from './customer-group-temporary/customer-group-temporary-root/customer-group-temporary-root.component';

@NgModule({
  declarations: [
    MainComponent,
    ProfileComponent,
    UsersComponent,
    CustomerComponent,
    ScenarioComponent,
    CustomerGroupComponent,
    CustomerGroupTemporaryComponent,
    CustomerGroupTemporaryGridComponent,
    CustomerGroupTemporaryRootComponent,
    CustomerGroupTemporaryCampaignComponent,
    SendSmsComponent,
    ReportsComponent,
    SystemSettingsComponent,
    SwitchComponent,
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
export class AdminModule {
}
