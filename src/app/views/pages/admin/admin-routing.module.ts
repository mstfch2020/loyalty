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
import { SendSmsCreateComponent } from "./send-sms/send-sms-create/send-sms-create.component";
import { SendSmsListComponent } from "./send-sms/send-sms-list/send-sms-list.component";
import { SendSmsPatternComponent } from "./send-sms/send-sms-pattern/send-sms-pattern.component";
import { SendSmsComponent } from "./send-sms/send-sms.component";
import { SystemSettingsDiscountEditComponent } from './system-settings/system-settings-discount/system-settings-discount-edit/system-settings-discount-edit.component';
import { SystemSettingsDiscountListComponent } from './system-settings/system-settings-discount/system-settings-discount-list/system-settings-discount-list.component';
import { SystemSettingsDiscountComponent } from "./system-settings/system-settings-discount/system-settings-discount.component";
import { SystemSettingsComponent } from "./system-settings/system-settings.component";
import { UsersComponent } from "./users/users.component";
import { SystemSettingsBehavioralComponent } from './system-settings/system-settings-behavioral/system-settings-behavioral.component';
import { SystemSettingsBehavioralListComponent } from './system-settings/system-settings-behavioral/system-settings-behavioral-list/system-settings-behavioral-list.component';
import { SystemSettingsBehavioralEditComponent } from './system-settings/system-settings-behavioral/system-settings-behavioral-edit/system-settings-behavioral-edit.component';
import { SystemSettingsPeriodComponent } from './system-settings/system-settings-period/system-settings-period.component';
import { SystemSettingsPeriodListComponent } from './system-settings/system-settings-period/system-settings-period-list/system-settings-period-list.component';
import { SystemSettingsPeriodEditComponent } from './system-settings/system-settings-period/system-settings-period-edit/system-settings-period-edit.component';

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
        children: [
          {
            path: '',
            redirectTo: 'pattern',
            pathMatch: 'full'
          },
          {
            path: 'list',
            component: SendSmsListComponent,
          },
          {
            path: 'pattern',
            component: SendSmsPatternComponent,
          },
          {
            path: 'create',
            component: SendSmsCreateComponent,
          }
        ]
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
            children: [
              {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
              },
              {
                path: 'list',
                component: SystemSettingsDiscountListComponent,
              },
              {
                path: 'edit',
                component: SystemSettingsDiscountEditComponent,
              }
            ]
          },
          {
            path: 'behavioral',
            component: SystemSettingsBehavioralComponent,
            children: [
              {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
              },
              {
                path: 'list',
                component: SystemSettingsBehavioralListComponent,
              },
              {
                path: 'edit',
                component: SystemSettingsBehavioralEditComponent
              }
            ]
          },
          {
            path: 'period',
            component: SystemSettingsPeriodComponent,
            children: [
              {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
              },
              {
                path: 'list',
                component: SystemSettingsPeriodListComponent,
              },
              {
                path: 'edit',
                component: SystemSettingsPeriodEditComponent
              }
            ]
          },
        ]
      },
      {
        path: 'scenario',
        component: ScenarioComponent,
        children: [
          {
            path: '', redirectTo: 'list', pathMatch: 'full'
          },
          {
            path: 'edit/:id',
            component: ScenarioRootComponent,
          },
          {
            path: 'create',
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
export class AdminRoutingModule {
}
