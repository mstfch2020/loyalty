import { NgModule } from "@angular/core";
import { SharedModule } from "../shared.module";
import { customerGroupComponents, CustomerGroupRoutingModule } from "./customer-group-routing.module";


@NgModule({
  declarations: [
    ...customerGroupComponents
  ],
  imports: [
    CustomerGroupRoutingModule,
    SharedModule
  ],
  exports: [

  ]
})
export class CustomerGroupModule
{
}
