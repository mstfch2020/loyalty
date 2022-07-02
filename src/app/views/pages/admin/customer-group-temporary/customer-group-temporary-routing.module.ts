import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerGroupTemporaryCampaignComponent } from "./customer-group-temporary-campaign/customer-group-temporary-campaign.component";
import { CustomerGroupTemporaryListComponent } from "./customer-group-temporary-list/customer-group-temporary-list.component";
import { CustomerGroupTemporaryComponent } from "./customer-group-temporary.component";

const routes: Routes = [
  {
    path: '',
    component: CustomerGroupTemporaryComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: CustomerGroupTemporaryListComponent,
      },
      {
        path: 'edit',
        component: CustomerGroupTemporaryCampaignComponent,
      }
    ]
  }];
export const customerGroupTemporaryComponents = [CustomerGroupTemporaryComponent, CustomerGroupTemporaryListComponent, CustomerGroupTemporaryCampaignComponent];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerGroupTemporaryRoutingModule
{
}
