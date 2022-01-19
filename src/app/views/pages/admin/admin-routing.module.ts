import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from "./profile/profile.component";
import { UsersComponent } from "./users/users.component";
import {ScenarioComponent} from "./scenario/scenario.component";
import {CustomerGroupComponent} from "./customer-group/customer-group.component";
import {CustomerGroupTemporaryComponent} from "./customer-group-temporary/customer-group-temporary.component";
import {CustomerComponent} from "./customer/customer.component";
import {SendSmsComponent} from "./send-sms/send-sms.component";
import {ReportsComponent} from "./reports/reports.component";
import {SystemSettingsComponent} from "./system-settings/system-settings.component";

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
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
        path: 'sendsms',
        component: SendSmsComponent,
      },
      {
        path: 'reports',
        component: ReportsComponent,
      },
      {
        path: 'systemsettings',
        component: SystemSettingsComponent,
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
export class AdminRoutingModule
{
}
