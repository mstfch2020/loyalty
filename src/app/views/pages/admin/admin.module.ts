import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgPersianDatepickerModule} from "ng-persian-datepicker";
import {NgxMaskModule} from 'ngx-mask';
import {AdminRoutingModule} from "./admin-routing.module";
import {CustomerComponent} from './customer/customer.component';
import {CustomerListComponent} from './customer/customer-list/customer-list.component';
import {CustomerEditComponent} from './customer/customer-edit/customer-edit.component';
import {CustomerGroupTemporaryCampaignComponent} from './customer-group-temporary/customer-group-temporary-campaign/customer-group-temporary-campaign.component';
import {CustomerGroupTemporaryEditComponent} from './customer-group-temporary/customer-group-temporary-edit/customer-group-temporary-edit.component';
import {CustomerGroupTemporaryListComponent} from './customer-group-temporary/customer-group-temporary-list/customer-group-temporary-list.component';
import {CustomerGroupTemporaryRootComponent} from './customer-group-temporary/customer-group-temporary-root/customer-group-temporary-root.component';
import {CustomerGroupTemporaryComponent} from './customer-group-temporary/customer-group-temporary.component';
import {CustomerGroupComponent} from './customer-group/customer-group.component';
import {CustomerGroupListComponent} from './customer-group/customer-group-list/customer-group-list.component';
import {CustomerGroupEditComponent} from './customer-group/customer-group-edit/customer-group-edit.component';
import {DiscountCodeComponent} from './discount-code/discount-code.component';
import {MainComponent} from './main/main.component';
import {ProfileComponent} from "./profile/profile.component";
import {ReportsComponent} from './reports/reports.component';
import {BehavioralScenarioComponent} from './scenario/behavioral-scenario/behavioral-scenario.component';
import {PurchaseScenarioComponent} from './scenario/purchase-scenario/purchase-scenario.component';
import {ScenarioRootComponent} from './scenario/scenario-root/scenario-root.component';
import {ScenarioComponent} from './scenario/scenario.component';
import {ScenarioListComponent} from './scenario/scenario-list/scenario-list.component';
import {SendSmsComponent} from './send-sms/send-sms.component';
import {SwitchComponent} from './switch/switch.component';
import {SystemSettingsDiscountGridComponent} from './system-settings/system-settings-discount/system-settings-discount-grid/system-settings-discount-grid.component';
import {SystemSettingsDiscountRootComponent} from './system-settings/system-settings-discount/system-settings-discount-root/system-settings-discount-root.component';
import {SystemSettingsDiscountComponent} from './system-settings/system-settings-discount/system-settings-discount.component';
import {SystemSettingsLevelComponent} from './system-settings/system-settings-level/system-settings-level.component';
import {SystemSettingsScenarioComponent} from './system-settings/system-settings-scenario/system-settings-scenario.component';
import {SystemSettingsComponent} from './system-settings/system-settings.component';
import {UsersComponent} from "./users/users.component";
import {DiscountCodeListComponent} from './discount-code/discount-code-list/discount-code-list.component';
import {DiscountCodeEditComponent} from './discount-code/discount-code-edit/discount-code-edit.component';


@NgModule({
  declarations: [
    MainComponent,
    ProfileComponent,
    UsersComponent,
    SwitchComponent,
    SendSmsComponent,
    ReportsComponent,
    ScenarioComponent,
    ScenarioRootComponent,
    ScenarioListComponent,
    CustomerComponent,
    CustomerListComponent,
    CustomerEditComponent,
    CustomerGroupComponent,
    CustomerGroupListComponent,
    CustomerGroupEditComponent,
    CustomerGroupTemporaryComponent,
    CustomerGroupTemporaryListComponent,
    CustomerGroupTemporaryRootComponent,
    CustomerGroupTemporaryCampaignComponent,
    SystemSettingsComponent,
    SystemSettingsDiscountComponent,
    SystemSettingsLevelComponent,
    SystemSettingsScenarioComponent,
    SystemSettingsDiscountGridComponent,
    SystemSettingsDiscountRootComponent,
    CustomerGroupTemporaryEditComponent,
    BehavioralScenarioComponent,
    PurchaseScenarioComponent,
    DiscountCodeComponent,
    DiscountCodeListComponent,
    DiscountCodeEditComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgPersianDatepickerModule,
    AdminRoutingModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    MainComponent,
  ]
})
export class AdminModule {
}
