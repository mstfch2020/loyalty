import { NgModule } from "@angular/core";
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { SharedModule } from "../shared.module";
import { newsComponents, NewsRoutingModule } from "./news-routing.module";
import { NewsEditComponent } from './news-edit/news-edit.component';
import { CommentComponent } from './comment/comment.component';
@NgModule({
  declarations: [
    ...newsComponents,
    NewsEditComponent,
    CommentComponent
  ],
  imports: [
    NewsRoutingModule,
    SharedModule,
    EditorModule
  ], providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }],
  exports: [

  ]
})
export class NewsModule
{
}
