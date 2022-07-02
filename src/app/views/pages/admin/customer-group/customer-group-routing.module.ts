import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerGroupEditComponent } from "./customer-group-edit/customer-group-edit.component";
import { CustomerGroupListComponent } from "./customer-group-list/customer-group-list.component";
import { CustomerGroupComponent } from "./customer-group.component";

const routes: Routes = [
  {
    path: '',
    component: CustomerGroupComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: CustomerGroupListComponent
      }, {
        path: 'edit',
        component: CustomerGroupEditComponent
      }
    ]
  }];

export const customerGroupComponents = [CustomerGroupEditComponent, CustomerGroupListComponent, CustomerGroupComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerGroupRoutingModule
{
}
