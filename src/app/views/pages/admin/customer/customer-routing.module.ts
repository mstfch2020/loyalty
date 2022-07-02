import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerEditComponent } from "./customer-edit/customer-edit.component";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { CustomerComponent } from "./customer.component";

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: CustomerListComponent
      }, {
        path: 'edit',
        component: CustomerEditComponent
      }
    ]
  }];
export const customerComponents = [CustomerEditComponent, CustomerListComponent, CustomerComponent];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule
{
}
