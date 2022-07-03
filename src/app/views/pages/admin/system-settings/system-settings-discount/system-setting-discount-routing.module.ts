import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SystemSettingsDiscountEditComponent } from "./system-settings-discount-edit/system-settings-discount-edit.component";
import { SystemSettingsDiscountListComponent } from "./system-settings-discount-list/system-settings-discount-list.component";
import { SystemSettingsDiscountComponent } from "./system-settings-discount.component";


const routes: Routes = [
  {
    path: '',
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
  }

];
export const systemSettingDiscountComponents = [SystemSettingsDiscountComponent, SystemSettingsDiscountListComponent, SystemSettingsDiscountEditComponent];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemSettingDiscountRoutingModule
{
}
