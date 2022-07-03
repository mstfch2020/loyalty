import { NgModule } from "@angular/core";
import { SharedModule } from "../shared.module";
import { systemSettingComponents, SystemSettingRoutingModule } from "./system-setting-routing.module";

@NgModule({
  declarations: [
    ...systemSettingComponents
  ],
  imports: [
    SystemSettingRoutingModule,
    SharedModule
  ],
  exports: [

  ]
})
export class SystemSettingModule
{
}
