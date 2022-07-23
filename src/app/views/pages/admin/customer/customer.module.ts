import { NgModule } from "@angular/core";
import { ContractTeacherEditComponent } from "../contract/contract-teacher-edit/contract-teacher-edit.component";
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
    ...customerComponents
  ], entryComponents: [ContractTeacherEditComponent]
})
export class CustomerModule
{
}
