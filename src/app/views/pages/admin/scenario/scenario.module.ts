import { NgModule } from "@angular/core";
import { SharedModule } from "../shared.module";
import { ScenarioComponents, ScenarioRoutingModule } from "./scenario-routing.module";

@NgModule({
  declarations: [
    ...ScenarioComponents
  ],
  imports: [
    ScenarioRoutingModule,
    SharedModule
  ],
  exports: [
  ]
})
export class ScenarioModule
{
}
