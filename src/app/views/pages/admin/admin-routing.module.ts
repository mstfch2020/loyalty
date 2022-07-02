import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from "./profile/profile.component";
import { ReportsComponent } from "./reports/reports.component";
import { SystemSettingsBehavioralEditComponent } from './system-settings/system-settings-behavioral/system-settings-behavioral-edit/system-settings-behavioral-edit.component';
import { SystemSettingsBehavioralListComponent } from './system-settings/system-settings-behavioral/system-settings-behavioral-list/system-settings-behavioral-list.component';
import { SystemSettingsBehavioralComponent } from './system-settings/system-settings-behavioral/system-settings-behavioral.component';
import { SystemSettingsDiscountEditComponent } from './system-settings/system-settings-discount/system-settings-discount-edit/system-settings-discount-edit.component';
import { SystemSettingsDiscountListComponent } from './system-settings/system-settings-discount/system-settings-discount-list/system-settings-discount-list.component';
import { SystemSettingsDiscountComponent } from "./system-settings/system-settings-discount/system-settings-discount.component";
import { SystemSettingsGroupsEditComponent } from './system-settings/system-settings-groups/system-settings-groups-edit/system-settings-groups-edit.component';
import { SystemSettingsGroupsListComponent } from './system-settings/system-settings-groups/system-settings-groups-list/system-settings-groups-list.component';
import { SystemSettingsGroupsComponent } from './system-settings/system-settings-groups/system-settings-groups.component';
import { SystemSettingsPeriodEditComponent } from './system-settings/system-settings-period/system-settings-period-edit/system-settings-period-edit.component';
import { SystemSettingsPeriodListComponent } from './system-settings/system-settings-period/system-settings-period-list/system-settings-period-list.component';
import { SystemSettingsPeriodComponent } from './system-settings/system-settings-period/system-settings-period.component';
import { SystemSettingsComponent } from "./system-settings/system-settings.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'scenario',
        loadChildren: () => import('src/app/views/pages/admin/scenario/scenario.module')
          .then(m => m.ScenarioModule)//, canLoad: [AuthGuard]
      },
      {
        path: 'customer',
        loadChildren: () => import('src/app/views/pages/admin/customer/customer.module')
          .then(m => m.CustomerModule)//, canLoad: [AuthGuard]
      },
      {
        path: 'customer-group',
        loadChildren: () => import('src/app/views/pages/admin/customer-group/customer-group.module')
          .then(m => m.CustomerGroupModule)//, canLoad: [AuthGuard]
      },
      {
        path: 'customer-group-temporary',
        loadChildren: () => import('src/app/views/pages/admin/customer-group-temporary/customer-group-temporary.module')
          .then(m => m.CustomerGroupTemporaryModule)//, canLoad: [AuthGuard]
      },
      {
        path: 'sms',
        loadChildren: () => import('src/app/views/pages/admin/send-sms/send-sms.module')
          .then(m => m.SendSmsModule)//, canLoad: [AuthGuard]
      },
      {
        path: 'discount-code',
        loadChildren: () => import('src/app/views/pages/admin/discount-code/discount-code.module')
          .then(m => m.DiscountCodeModule)//, canLoad: [AuthGuard]
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
            path: 'groups',
            component: SystemSettingsGroupsComponent,
            children: [
              {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
              },
              {
                path: 'list',
                component: SystemSettingsGroupsListComponent,
              },
              {
                path: 'edit',
                component: SystemSettingsGroupsEditComponent
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
                path: 'edit/:id',
                component: SystemSettingsPeriodEditComponent
              }
            ]
          },
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
