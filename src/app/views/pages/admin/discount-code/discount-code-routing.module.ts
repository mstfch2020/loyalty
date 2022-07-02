import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DiscountCodeGeneratedListComponent } from "./discount-code-generated-list/discount-code-generated-list.component";
import { DiscountCodePatternEditComponent } from "./discount-code-pattern-edit/discount-code-pattern-edit.component";
import { DiscountCodePatternListComponent } from "./discount-code-pattern-list/discount-code-pattern-list.component";
import { DiscountCodeComponent } from "./discount-code.component";


const routes: Routes = [
  {
    path: '',
    component: DiscountCodeComponent,
    children: [
      {
        path: '',
        redirectTo: 'pattern-list',
        pathMatch: 'full'
      },
      {
        path: 'pattern-list',
        component: DiscountCodePatternListComponent,
      },
      {
        path: 'generated-list',
        component: DiscountCodeGeneratedListComponent,
      },
      {
        path: 'edit',
        component: DiscountCodePatternEditComponent
      }
    ]
  }
];

export const discountCodeComponents = [
  DiscountCodeGeneratedListComponent,
  DiscountCodePatternEditComponent,
  DiscountCodePatternListComponent,
  DiscountCodeComponent,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountCodeRoutingModule
{
}
