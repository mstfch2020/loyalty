import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/@core/guards/auth.guard';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from "./profile/profile.component";
import { ReportsComponent } from "./reports/reports.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'scenario', canActivate: [AuthGuard],
        loadChildren: () => import('src/app/views/pages/admin/scenario/scenario.module')
          .then(m => m.ScenarioModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('src/app/views/pages/admin/customer/customer.module')
          .then(m => m.CustomerModule)
      },
      {
        path: 'customer-group',
        loadChildren: () => import('src/app/views/pages/admin/customer-group/customer-group.module')
          .then(m => m.CustomerGroupModule)
      },
      {
        path: 'customer-group-temporary',
        loadChildren: () => import('src/app/views/pages/admin/customer-group-temporary/customer-group-temporary.module')
          .then(m => m.CustomerGroupTemporaryModule)
      },
      {
        path: 'sms',
        loadChildren: () => import('src/app/views/pages/admin/send-sms/send-sms.module')
          .then(m => m.SendSmsModule)
      },
      {
        path: 'discount-code',
        loadChildren: () => import('src/app/views/pages/admin/discount-code/discount-code.module')
          .then(m => m.DiscountCodeModule)
      },
      {
        path: 'contract',
        loadChildren: () => import('src/app/views/pages/admin/contract/contract.module')
          .then(m => m.ContractModule)
      },
      {
        path: 'reports',
        component: ReportsComponent,
      },
      {
        path: 'settings',
        loadChildren: () => import('src/app/views/pages/admin/system-settings/system-setting.module')
          .then(m => m.SystemSettingModule)
      },
      {
        path: 'gifts',
        loadChildren: () => import('src/app/views/pages/admin/gifts/gifts.module')
          .then(m => m.GiftsModule)
      },
      {
        path: 'news',
        loadChildren: () => import('src/app/views/pages/admin/gifts/gifts.module')
          .then(m => m.GiftsModule)
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
