import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgPersianDatepickerModule } from "ng-persian-datepicker";
import { NgxMaskModule } from "ngx-mask";
import { SharedModule } from "../shared.module";
import { BehavioralScenarioComponent } from "./behavioral-scenario/behavioral-scenario.component";
import { PurchaseScenarioComponent } from "./purchase-scenario/purchase-scenario.component";
import { ScenarioListComponent } from "./scenario-list/scenario-list.component";
import { ScenarioRootComponent } from "./scenario-root/scenario-root.component";
import { ScenarioRoutingModule } from "./scenario-routing.module";
import { ScenarioComponent } from "./scenario.component";

@NgModule({
  declarations: [ScenarioComponent,
    ScenarioRootComponent,
    ScenarioListComponent,
    BehavioralScenarioComponent,
    PurchaseScenarioComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgPersianDatepickerModule,
    ScenarioRoutingModule,
    NgxMaskModule.forRoot(),
    SharedModule
  ],
  exports: [

  ]
})
export class ScenarioModule
{
}
