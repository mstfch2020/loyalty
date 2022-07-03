import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SystemSettingsBehavioralEditComponent } from "./system-settings-behavioral-edit/system-settings-behavioral-edit.component";
import { SystemSettingsBehavioralListComponent } from "./system-settings-behavioral-list/system-settings-behavioral-list.component";
import { SystemSettingsBehavioralComponent } from "./system-settings-behavioral.component";

const routes: Routes = [
  {
    path: '',
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
  }
];
export const systemSettingBehavioralComponents = [SystemSettingsBehavioralComponent, SystemSettingsBehavioralListComponent, SystemSettingsBehavioralEditComponent];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemSettingBehavioralRoutingModule
{
}
