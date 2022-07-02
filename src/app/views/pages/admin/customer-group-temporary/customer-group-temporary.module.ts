import { NgModule } from "@angular/core";
import { SharedModule } from "../shared.module";
import { customerGroupTemporaryComponents, CustomerGroupTemporaryRoutingModule } from "./customer-group-temporary-routing.module";


@NgModule({
  declarations: [
    ...customerGroupTemporaryComponents
  ],
  imports: [
    CustomerGroupTemporaryRoutingModule,
    SharedModule
  ],
  exports: [

  ]
})
export class CustomerGroupTemporaryModule
{
}
