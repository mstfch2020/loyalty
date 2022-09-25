import { NgModule } from "@angular/core";
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { SharedModule } from "../shared.module";
import { giftsComponents, GiftsRoutingModule } from "./gifts-routing.module";
@NgModule({
  declarations: [
    ...giftsComponents
  ],
  imports: [
    GiftsRoutingModule,
    SharedModule,
    EditorModule
  ], providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }],
  exports: [

  ]
})
export class GiftsModule
{
}
