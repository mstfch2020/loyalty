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
import {SystemSettingsRootComponent} from './system-settings/system-settings-root/system-settings-root.component';
import {SystemSettingsDiscountComponent} from './system-settings/system-settings-discount/system-settings-discount.component';
import {SystemSettingsLevelComponent} from './system-settings/system-settings-level/system-settings-level.component';
import {SystemSettingsScenarioComponent} from './system-settings/system-settings-scenario/system-settings-scenario.component';
import { SystemSettingsDiscountGridComponent } from './system-settings/system-settings-discount/system-settings-discount-grid/system-settings-discount-grid.component';
import { SystemSettingsDiscountRootComponent } from './system-settings/system-settings-discount/system-settings-discount-root/system-settings-discount-root.component';

@NgModule({
  declarations: [
    MainComponent,
    ProfileComponent,
    UsersComponent,
    CustomerComponent,
    SwitchComponent,
    SendSmsComponent,
    ReportsComponent,
    ScenarioComponent,
    CustomerGroupComponent,
    CustomerGroupTemporaryComponent,
    CustomerGroupTemporaryGridComponent,
    CustomerGroupTemporaryRootComponent,
    CustomerGroupTemporaryCampaignComponent,
    SystemSettingsComponent,
    SystemSettingsRootComponent,
    SystemSettingsDiscountComponent,
    SystemSettingsLevelComponent,
    SystemSettingsScenarioComponent,
    SystemSettingsDiscountGridComponent,
    SystemSettingsDiscountRootComponent,
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
