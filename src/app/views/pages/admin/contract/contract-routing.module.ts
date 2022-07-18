import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActiveContractListComponent } from "./active-contract-list/active-contract-list.component";
import { ContractEditAdminComponent } from "./contract-edit-admin/contract-edit-admin.component";
import { ContractEditComponent } from "./contract-edit/contract-edit.component";
import { ContractTeacherEditComponent } from "./contract-teacher-edit/contract-teacher-edit.component";
import { ContractComponent } from "./contract/contract.component";
import { OtherContractsComponent } from "./other-contracts/other-contracts.component";
import { RequestContractListComponent } from "./request-contract-list/request-contract-list.component";


const routes: Routes = [
  {
    path: '',
    component: ContractComponent,
    children:
      [
        {
          path: '',
          redirectTo: 'active-contract-list',
          pathMatch: 'full'
        },
        {
          path: 'request-contract-list',
          component: RequestContractListComponent,
        },
        {
          path: 'active-contract-list',
          component: ActiveContractListComponent,
        },
        {
          path: 'edit',
          component: ContractEditComponent
        },
        {
          path: 'edit-admin',
          component: ContractEditAdminComponent
        }
      ]
  }
];
export const contractComponents = [ContractComponent, RequestContractListComponent, ActiveContractListComponent,
  ContractEditComponent, ContractTeacherEditComponent, OtherContractsComponent, ContractEditAdminComponent,];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule
{
}
