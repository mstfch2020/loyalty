import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared.module";
import { systemSettingGroupComponents, SystemSettingGroupRoutingModule } from "./system-setting-group-routing.module";

@NgModule({
  declarations: [
    ...systemSettingGroupComponents
  ],
  imports: [
    SystemSettingGroupRoutingModule,
    SharedModule
  ],
  exports: [

  ]
})
export class SystemSettingGroupModule
{
}
