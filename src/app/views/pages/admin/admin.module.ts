import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from '@ng-select/ng-select';
import {NgPersianDatepickerModule} from "ng-persian-datepicker";
import {AdminRoutingModule} from "./admin-routing.module";
import {CustomerGroupTemporaryCampaignComponent} from './customer-group-temporary/customer-group-temporary-campaign/customer-group-temporary-campaign.component';
import {CustomerGroupTemporaryEditComponent} from './customer-group-temporary/customer-group-temporary-edit/customer-group-temporary-edit.component';
import {CustomerGroupTemporaryGridComponent} from './customer-group-temporary/customer-group-temporary-grid/customer-group-temporary-grid.component';
import {CustomerGroupTemporaryRootComponent} from './customer-group-temporary/customer-group-temporary-root/customer-group-temporary-root.component';
import {CustomerGroupTemporaryComponent} from './customer-group-temporary/customer-group-temporary.component';
import {CustomerGroupGridComponent} from './customer-group/customer-group-grid/customer-group-grid.component';
import {CustomerGroupRootComponent} from './customer-group/customer-group-root/customer-group-root.component';
import {CustomerGroupComponent} from './customer-group/customer-group.component';
import {CustomerComponent} from './customer/customer.component';
import {MainComponent} from './main/main.component';
import {ProfileComponent} from "./profile/profile.component";
import {ReportsComponent} from './reports/reports.component';
import {ScenarioComponent} from './scenario/scenario.component';
import {SendSmsComponent} from './send-sms/send-sms.component';
import {SwitchComponent} from './switch/switch.component';
import {SystemSettingsDiscountGridComponent} from './system-settings/system-settings-discount/system-settings-discount-grid/system-settings-discount-grid.component';
import {SystemSettingsDiscountRootComponent} from './system-settings/system-settings-discount/system-settings-discount-root/system-settings-discount-root.component';
import {SystemSettingsDiscountComponent} from './system-settings/system-settings-discount/system-settings-discount.component';
import {SystemSettingsLevelComponent} from './system-settings/system-settings-level/system-settings-level.component';
import {SystemSettingsScenarioComponent} from './system-settings/system-settings-scenario/system-settings-scenario.component';
import {SystemSettingsComponent} from './system-settings/system-settings.component';
import {UsersComponent} from "./users/users.component";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BehavioralScenarioComponent} from './scenario/behavioral-scenario/behavioral-scenario.component';
import {PurchaseScenarioComponent} from './scenario/purchase-scenario/purchase-scenario.component';
import { DiscountCodeComponent } from './discount-code/discount-code.component';

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
    SystemSettingsDiscountComponent,
    SystemSettingsLevelComponent,
    SystemSettingsScenarioComponent,
    SystemSettingsDiscountGridComponent,
    SystemSettingsDiscountRootComponent,
    CustomerGroupTemporaryEditComponent,
    CustomerGroupRootComponent,
    CustomerGroupGridComponent,
    BehavioralScenarioComponent,
    PurchaseScenarioComponent,
    DiscountCodeComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgPersianDatepickerModule,
    AdminRoutingModule,
  ],
  exports: [
    MainComponent,
  ]
})
export class AdminModule {
}
