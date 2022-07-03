import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared.module";
import { systemSettingPeriodComponents, SystemSettingPeriodRoutingModule } from "./system-setting-period-routing.module";

@NgModule({
  declarations: [
    ...systemSettingPeriodComponents
  ],
  imports: [
    SystemSettingPeriodRoutingModule,
    SharedModule
  ],
  exports: [

  ]
})
export class SystemSettingPeriodModule
{
}
