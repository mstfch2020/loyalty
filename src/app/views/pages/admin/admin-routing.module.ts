import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerGroupTemporaryCampaignComponent } from './customer-group-temporary/customer-group-temporary-campaign/customer-group-temporary-campaign.component';
import { CustomerGroupTemporaryListComponent } from "./customer-group-temporary/customer-group-temporary-list/customer-group-temporary-list.component";
import { CustomerGroupTemporaryComponent } from "./customer-group-temporary/customer-group-temporary.component";
import { CustomerGroupEditComponent } from './customer-group/customer-group-edit/customer-group-edit.component';
import { CustomerGroupListComponent } from './customer-group/customer-group-list/customer-group-list.component';
import { CustomerGroupComponent } from "./customer-group/customer-group.component";
import { CustomerEditComponent } from "./customer/customer-edit/customer-edit.component";
import { CustomerListComponent } from "./customer/customer-list/customer-list.component";
import { CustomerComponent } from "./customer/customer.component";
import { DiscountCodeEditComponent } from "./discount-code/discount-code-edit/discount-code-edit.component";
import { DiscountCodeListComponent } from "./discount-code/discount-code-list/discount-code-list.component";
import { DiscountCodeComponent } from "./discount-code/discount-code.component";
import { MainComponent } from './main/main.component';
import { ProfileComponent } from "./profile/profile.component";
import { ReportsComponent } from "./reports/reports.component";
import { ScenarioListComponent } from "./scenario/scenario-list/scenario-list.component";
import { ScenarioRootComponent } from "./scenario/scenario-root/scenario-root.component";
import { ScenarioComponent } from "./scenario/scenario.component";
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
        path: 'customer',
        component: CustomerComponent,
        children: [
          {
            path: '',
            component: CustomerListComponent
          },
          {
            path: 'list',
            component: CustomerListComponent
          }, {
            path: 'edit',
            component: CustomerEditComponent
          }

        ]
      },
      {
        path: 'customergroup',
        component: CustomerGroupComponent,
        children: [
          {
            path: '',
            component: CustomerGroupListComponent
          },
          {
            path: 'list',
            component: CustomerGroupListComponent
          }, {
            path: 'edit',
            component: CustomerGroupEditComponent
          }
        ]
      },
      {
        path: 'customergrouptemporary',
        component: CustomerGroupTemporaryComponent,
        children: [
          {
            path: '',
            component: CustomerGroupTemporaryListComponent,
          },
          {
            path: 'list',
            component: CustomerGroupTemporaryListComponent,
          },
          {
            path: 'edit',
            component: CustomerGroupTemporaryCampaignComponent,
          },
          {
            path: 'campaign',
            component: CustomerGroupTemporaryCampaignComponent,
          }
        ]
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
            path: 'edit',
            component: ScenarioRootComponent,
          },
          {
            path: 'list',
            component: ScenarioListComponent,
          }
        ]
      },
      {
        path: 'discountcode',
        component: DiscountCodeComponent,
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'edit',
            component: DiscountCodeEditComponent,
          },
          {
            path: 'list',
            component: DiscountCodeListComponent,
          }
        ]
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
