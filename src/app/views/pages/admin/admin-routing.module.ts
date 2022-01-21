import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {ProfileComponent} from "./profile/profile.component";
import {UsersComponent} from "./users/users.component";
import {ScenarioComponent} from "./scenario/scenario.component";
import {CustomerGroupComponent} from "./customer-group/customer-group.component";
import {CustomerGroupTemporaryComponent} from "./customer-group-temporary/customer-group-temporary.component";
import {CustomerComponent} from "./customer/customer.component";
import {SendSmsComponent} from "./send-sms/send-sms.component";
import {ReportsComponent} from "./reports/reports.component";
import {SystemSettingsComponent} from "./system-settings/system-settings.component";
import {SystemSettingsDiscountComponent} from "./system-settings/system-settings-discount/system-settings-discount.component";
import {SystemSettingsLevelComponent} from "./system-settings/system-settings-level/system-settings-level.component";
import {SystemSettingsScenarioComponent} from "./system-settings/system-settings-scenario/system-settings-scenario.component";

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'scenario',
        component: ScenarioComponent,
      },
      {
        path: 'customer',
        component: CustomerComponent,
      },
      {
        path: 'customergroup',
        component: CustomerGroupComponent,
      },
      {
        path: 'customergrouptemporary',
        component: CustomerGroupTemporaryComponent,
      },
      {
        path: 'sms',
        component: SendSmsComponent,
      },
      {
        path: 'reports',
        component: ReportsComponent,
      },
      {
        path: 'settings',
        component: SystemSettingsComponent,
        children: [
          {
            path: 'discount',
            component: SystemSettingsDiscountComponent,
          },
          {
            path: 'level',
            component: SystemSettingsLevelComponent,
          },
          {
            path: 'scenario',
            component: SystemSettingsScenarioComponent,
          },
        ]
      },
      {
        path: 'scenario',
        component: ScenarioComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
