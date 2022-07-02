import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BehavioralScenarioComponent } from "./behavioral-scenario/behavioral-scenario.component";
import { PurchaseScenarioComponent } from "./purchase-scenario/purchase-scenario.component";
import { ScenarioListComponent } from "./scenario-list/scenario-list.component";
import { ScenarioRootComponent } from "./scenario-root/scenario-root.component";
import { ScenarioComponent } from "./scenario.component";

const routes: Routes = [
  {
    path: '',
    component: ScenarioComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'create',
        component: ScenarioRootComponent,
      }, {
        path: 'edit',
        component: ScenarioRootComponent,
      },
      {
        path: 'list',
        component: ScenarioListComponent,
      }
    ]
  }];

export const ScenarioComponents = [
  ScenarioComponent,
  ScenarioRootComponent,
  ScenarioListComponent,
  BehavioralScenarioComponent,
  PurchaseScenarioComponent,
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScenarioRoutingModule
{
}
