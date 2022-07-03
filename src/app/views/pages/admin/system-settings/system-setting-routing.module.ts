import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SystemSettingsComponent } from "./system-settings.component";

const routes: Routes = [
  {
    path: '',
    component: SystemSettingsComponent,
    children: [
      {
        path: '',
        redirectTo: 'discount',
        pathMatch: 'full'
      },
      {
        path: 'discount',
        loadChildren: () => import('src/app/views/pages/admin/system-settings/system-settings-discount/system-setting-discount.module')
          .then(m => m.SystemSettingDiscountModule)//, canLoad: [AuthGuard]
      },
      {
        path: 'behavioral',
        loadChildren: () => import('src/app/views/pages/admin/system-settings/system-settings-behavioral/system-setting-behavioral.module')
          .then(m => m.SystemSettingBehavioralModule)//, canLoad: [AuthGuard]
      }, {
        path: 'groups',
        loadChildren: () => import('src/app/views/pages/admin/system-settings/system-settings-groups/system-setting-group.module')
          .then(m => m.SystemSettingGroupModule)//, canLoad: [AuthGuard]
      }, {
        path: 'period',
        loadChildren: () => import('src/app/views/pages/admin/system-settings/system-settings-period/system-setting-period.module')
          .then(m => m.SystemSettingPeriodModule)//, canLoad: [AuthGuard]
      }
    ]
  }

];
export const systemSettingComponents = [SystemSettingsComponent];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemSettingRoutingModule
{
}
