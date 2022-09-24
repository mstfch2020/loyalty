import { NgModule } from "@angular/core";
import { SharedModule } from "../shared.module";
import { giftsComponents, GiftsRoutingModule } from "./gifts-routing.module";

@NgModule({
  declarations: [
    ...giftsComponents
  ],
  imports: [
    GiftsRoutingModule,
    SharedModule
  ],
  exports: [

  ]
})
export class GiftsModule
{
}
