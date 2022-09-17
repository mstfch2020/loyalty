import { NgModule } from "@angular/core";
import { ContractTeacherEditComponent } from "../contract/contract-teacher-edit/contract-teacher-edit.component";
import { SharedModule } from "../shared.module";
import { customerComponents, CustomerRoutingModule } from "./customer-routing.module";
import { CustomerDiscountHistoryComponent } from './customer-discount-history/customer-discount-history.component';
import { CustomerCommissionHistoryComponent } from './customer-commission-history/customer-commission-history.component';
import { CreateDiscountCodeDialogComponent } from './create-discount-code-dialog/create-discount-code-dialog.component';

@NgModule({
  declarations: [
    ...customerComponents,
    CustomerDiscountHistoryComponent,
    CustomerCommissionHistoryComponent,
    CreateDiscountCodeDialogComponent
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
