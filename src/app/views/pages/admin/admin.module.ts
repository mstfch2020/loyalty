import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgPersianDatepickerModule } from "ng-persian-datepicker";
import { NgxMaskModule } from 'ngx-mask';
import { DisplayAlertComponent } from "../../general/display-alert/display-alert.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { CustomerGroupTemporaryEditComponent } from './customer-group-temporary/customer-group-temporary-edit/customer-group-temporary-edit.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from "./profile/profile.component";
import { ReportsComponent } from './reports/reports.component';
import { ScenarioModule } from './scenario/scenario.module';
import { SharedModule } from './shared.module';
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
    ReportsComponent,
    SystemSettingsComponent,
    SystemSettingsDiscountComponent,
    SystemSettingsDiscountListComponent,
    SystemSettingsDiscountEditComponent,
    CustomerGroupTemporaryEditComponent,
    DisplayAlertComponent,
    SystemSettingsBehavioralComponent,
    SystemSettingsBehavioralEditComponent,
    SystemSettingsBehavioralListComponent,
    SystemSettingsPeriodComponent,
    SystemSettingsPeriodEditComponent,
    SystemSettingsPeriodListComponent,
    SystemSettingsGroupsComponent,
    SystemSettingsGroupsEditComponent,
    SystemSettingsGroupsListComponent,
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
    ScenarioModule,
    SharedModule
  ],
  exports: [
    MainComponent,
  ]
})
export class AdminModule
{
}
