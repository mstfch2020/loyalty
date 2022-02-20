import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerGroupTemporaryComponent } from "./customer-group-temporary/customer-group-temporary.component";
import { CustomerGroupGridComponent } from './customer-group/customer-group-grid/customer-group-grid.component';
import { CustomerGroupRootComponent } from './customer-group/customer-group-root/customer-group-root.component';
import { CustomerGroupComponent } from "./customer-group/customer-group.component";
import { CustomerComponent } from "./customer/customer.component";
import { DiscountCodeComponent } from "./discount-code/discount-code.component";
import { MainComponent } from './main/main.component';
import { ProfileComponent } from "./profile/profile.component";
import { ReportsComponent } from "./reports/reports.component";
import { ScenarioRootComponent } from "./scenario/scenario-root/scenario-root.component";
import { ScenarioComponent } from "./scenario/scenario.component";
import { ViewListComponent } from "./scenario/view-list/view-list.component";
import { SendSmsComponent } from "./send-sms/send-sms.component";
import { SystemSettingsDiscountComponent } from "./system-settings/system-settings-discount/system-settings-discount.component";
import { SystemSettingsLevelComponent } from "./system-settings/system-settings-level/system-settings-level.component";
import { SystemSettingsScenarioComponent } from "./system-settings/system-settings-scenario/system-settings-scenario.component";
import { SystemSettingsComponent } from "./system-settings/system-settings.component";
import { UsersComponent } from "./users/users.component";

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
        children: [
          {
            path: '',
            component: CustomerGroupGridComponent
          },
          {
            path: 'customergroup-list',
            component: CustomerGroupGridComponent
          }, {
            path: 'customergroup-edit',
            component: CustomerGroupRootComponent
          }

        ]
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
            path: '',
            redirectTo: 'discount',
            pathMatch: 'full'
          },
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
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'root',
            component: ScenarioRootComponent,
          },
          {
            path: 'list',
            component: ViewListComponent,
          }
        ]
      },
      {
        path: 'discountcode',
        component: DiscountCodeComponent,
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
