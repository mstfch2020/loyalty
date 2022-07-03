import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared.module";
import { systemSettingDiscountComponents, SystemSettingDiscountRoutingModule } from "./system-setting-discount-routing.module";


@NgModule({
  declarations: [
    ...systemSettingDiscountComponents
  ],
  imports: [
    SystemSettingDiscountRoutingModule,
    SharedModule
  ],
  exports: [

  ]
})
export class SystemSettingDiscountModule
{
}
