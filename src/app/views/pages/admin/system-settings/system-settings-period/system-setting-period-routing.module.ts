import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SystemSettingsPeriodEditComponent } from "./system-settings-period-edit/system-settings-period-edit.component";
import { SystemSettingsPeriodListComponent } from "./system-settings-period-list/system-settings-period-list.component";
import { SystemSettingsPeriodComponent } from "./system-settings-period.component";

const routes: Routes = [
  {
    path: '',
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
  }
];

export const systemSettingPeriodComponents = [SystemSettingsPeriodComponent, SystemSettingsPeriodListComponent, SystemSettingsPeriodEditComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemSettingPeriodRoutingModule
{
}
