import { NgModule } from "@angular/core";
import { SharedModule } from "../shared.module";
import { contractComponents, ContractRoutingModule } from "./contract-routing.module";

@NgModule({
  declarations: [
    ...contractComponents,
  ],
  imports: [
    ContractRoutingModule,
    SharedModule
  ],
  exports: [

  ]
})
export class ContractModule
{
}
