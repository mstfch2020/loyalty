import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SystemSettingsGroupsEditComponent } from "./system-settings-groups-edit/system-settings-groups-edit.component";
import { SystemSettingsGroupsListComponent } from "./system-settings-groups-list/system-settings-groups-list.component";
import { SystemSettingsGroupsComponent } from "./system-settings-groups.component";

const routes: Routes = [
  {
    path: '',
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
  }
];

export const systemSettingGroupComponents = [SystemSettingsGroupsComponent, SystemSettingsGroupsListComponent, SystemSettingsGroupsEditComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemSettingGroupRoutingModule
{
}
