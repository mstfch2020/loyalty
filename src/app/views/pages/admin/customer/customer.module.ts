import { NgModule } from "@angular/core";
import { SharedModule } from "../shared.module";
import { customerComponents, CustomerRoutingModule } from "./customer-routing.module";

@NgModule({
  declarations: [
    ...customerComponents
  ],
  imports: [
    CustomerRoutingModule,
    SharedModule
  ],
  exports: [

  ]
})
export class CustomerModule
{
}
