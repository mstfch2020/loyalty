import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared.module";
import { categoryComponents, CategoryRoutingModule } from "./category-routing.module";


@NgModule({
  declarations: [
    ...categoryComponents
  ],
  imports: [
    CategoryRoutingModule,
    SharedModule
  ],
  exports: [

  ]
})
export class CategoryModule
{
}
