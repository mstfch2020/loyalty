import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared.module";
import { systemSettingBehavioralComponents, SystemSettingBehavioralRoutingModule } from "./system-setting-behavioral-routing.module";

@NgModule({
  declarations: [
    ...systemSettingBehavioralComponents
  ],
  imports: [
    SystemSettingBehavioralRoutingModule,
    SharedModule
  ],
  exports: [

  ]
})
export class SystemSettingBehavioralModule
{
}
