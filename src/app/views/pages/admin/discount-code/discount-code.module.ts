import { NgModule } from "@angular/core";
import { SharedModule } from "../shared.module";
import { discountCodeComponents, DiscountCodeRoutingModule } from "./discount-code-routing.module";

@NgModule({
  declarations: [
    ...discountCodeComponents
  ],
  imports: [
    DiscountCodeRoutingModule,
    SharedModule
  ],
  exports: [

  ]
})
export class DiscountCodeModule
{
}
