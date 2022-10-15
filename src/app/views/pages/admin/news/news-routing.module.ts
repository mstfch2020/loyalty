import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommentComponent } from "./comment/comment.component";
import { NewsEditComponent } from "./news-edit/news-edit.component";
import { NewsListComponent } from "./news-list/news-list.component";
import { NewsComponent } from "./news.component";

const routes: Routes = [
  {
    path: '',
    component: NewsComponent,
    children: [
      {
        path: '',
        redirectTo: 'news-list',
        pathMatch: 'full'
      },
      {
        path: 'news-list',
        component: NewsListComponent,
      },
      {
        path: 'edit',
        component: NewsEditComponent,
      },
      {
        path: 'all-comments',
        component: CommentComponent,
      },
      {
        path: 'confirmed-comments',
        component: CommentComponent,
      },
      {
        path: 'awaiting-confirmation-comments',
        component: CommentComponent,
      },
      {
        path: 'spam-comments',
        component: CommentComponent,
      },
      {
        path: 'garbage-comments',
        component: CommentComponent,
      }
    ]
  }
];

export const newsComponents = [
  NewsComponent,
  NewsListComponent,
  NewsEditComponent,
  CommentComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule
{
}
