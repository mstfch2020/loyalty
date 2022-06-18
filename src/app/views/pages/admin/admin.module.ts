import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgPersianDatepickerModule } from "ng-persian-datepicker";
import { NgxMaskModule } from 'ngx-mask';
import { FilterPipe } from 'src/app/@core/data/pipes/filter.pipe';
import { StateStatusViewComponent } from '../../components/scenario-state/state-status-view.component';
import { DisplayAlertComponent } from "../../general/display-alert/display-alert.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { CustomerGroupTemporaryCampaignComponent } from './customer-group-temporary/customer-group-temporary-campaign/customer-group-temporary-campaign.component';
import { CustomerGroupTemporaryEditComponent } from './customer-group-temporary/customer-group-temporary-edit/customer-group-temporary-edit.component';
import { CustomerGroupTemporaryListComponent } from './customer-group-temporary/customer-group-temporary-list/customer-group-temporary-list.component';
import { CustomerGroupTemporaryRootComponent } from './customer-group-temporary/customer-group-temporary-root/customer-group-temporary-root.component';
import { CustomerGroupTemporaryComponent } from './customer-group-temporary/customer-group-temporary.component';
import { CustomerGroupEditComponent } from './customer-group/customer-group-edit/customer-group-edit.component';
import { CustomerGroupListComponent } from './customer-group/customer-group-list/customer-group-list.component';
import { CustomerGroupComponent } from './customer-group/customer-group.component';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerComponent } from './customer/customer.component';
import { DiscountCodeGeneratedListComponent } from './discount-code/discount-code-generated-list/discount-code-generated-list.component';
import { DiscountCodePatternEditComponent } from './discount-code/discount-code-pattern-edit/discount-code-pattern-edit.component';
import { DiscountCodePatternListComponent } from './discount-code/discount-code-pattern-list/discount-code-pattern-list.component';
import { DiscountCodeComponent } from './discount-code/discount-code.component';
import { FilterComponent } from './filter/filter.component';
import { MainComponent } from './main/main.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ProfileComponent } from "./profile/profile.component";
import { ReportsComponent } from './reports/reports.component';
import { BehavioralScenarioComponent } from './scenario/behavioral-scenario/behavioral-scenario.component';
import { PurchaseScenarioComponent } from './scenario/purchase-scenario/purchase-scenario.component';
import { ScenarioListComponent } from './scenario/scenario-list/scenario-list.component';
import { ScenarioRootComponent } from './scenario/scenario-root/scenario-root.component';
import { ScenarioComponent } from './scenario/scenario.component';
import { SendSmsCreateComponent } from './send-sms/send-sms-create/send-sms-create.component';
import { SendSmsListComponent } from './send-sms/send-sms-list/send-sms-list.component';
import { SendSmsPatternComponent } from './send-sms/send-sms-pattern/send-sms-pattern.component';
import { SendSmsComponent } from './send-sms/send-sms.component';
import { SwitchComponent } from './switch/switch.component';
import { SystemSettingsBehavioralEditComponent } from './system-settings/system-settings-behavioral/system-settings-behavioral-edit/system-settings-behavioral-edit.component';
import { SystemSettingsBehavioralListComponent } from './system-settings/system-settings-behavioral/system-settings-behavioral-list/system-settings-behavioral-list.component';
import { SystemSettingsBehavioralComponent } from './system-settings/system-settings-behavioral/system-settings-behavioral.component';
import { SystemSettingsDiscountEditComponent } from './system-settings/system-settings-discount/system-settings-discount-edit/system-settings-discount-edit.component';
import { SystemSettingsDiscountListComponent } from './system-settings/system-settings-discount/system-settings-discount-list/system-settings-discount-list.component';
import { SystemSettingsDiscountComponent } from './system-settings/system-settings-discount/system-settings-discount.component';
import { SystemSettingsGroupsEditComponent } from './system-settings/system-settings-groups/system-settings-groups-edit/system-settings-groups-edit.component';
import { SystemSettingsGroupsListComponent } from './system-settings/system-settings-groups/system-settings-groups-list/system-settings-groups-list.component';
import { SystemSettingsGroupsComponent } from './system-settings/system-settings-groups/system-settings-groups.component';
import { SystemSettingsPeriodEditComponent } from './system-settings/system-settings-period/system-settings-period-edit/system-settings-period-edit.component';
import { SystemSettingsPeriodListComponent } from './system-settings/system-settings-period/system-settings-period-list/system-settings-period-list.component';
import { SystemSettingsPeriodComponent } from './system-settings/system-settings-period/system-settings-period.component';
import { SystemSettingsComponent } from './system-settings/system-settings.component';
import { UsersComponent } from "./users/users.component";


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
    SystemSettingsDiscountListComponent,
    SystemSettingsDiscountEditComponent,
    CustomerGroupTemporaryEditComponent,
    BehavioralScenarioComponent,
    PurchaseScenarioComponent,
    DiscountCodeComponent,
    DisplayAlertComponent,
    SendSmsPatternComponent,
    SendSmsListComponent,
    SendSmsCreateComponent,
    FilterComponent,
    FilterPipe,
    PaginationComponent,
    SystemSettingsBehavioralComponent,
    SystemSettingsBehavioralEditComponent,
    SystemSettingsBehavioralListComponent,
    SystemSettingsPeriodComponent,
    SystemSettingsPeriodEditComponent,
    SystemSettingsPeriodListComponent,
    SystemSettingsGroupsComponent,
    SystemSettingsGroupsEditComponent,
    SystemSettingsGroupsListComponent,
    DiscountCodeGeneratedListComponent,
    DiscountCodePatternEditComponent,
    DiscountCodePatternListComponent,
    StateStatusViewComponent,
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
export class AdminModule
{
}
