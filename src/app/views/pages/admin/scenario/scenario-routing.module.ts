import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ScenarioListComponent } from "./scenario-list/scenario-list.component";
import { ScenarioRootComponent } from "./scenario-root/scenario-root.component";
import { ScenarioComponent } from "./scenario.component";

const routes: Routes = [
  {
    path: '',
    component: ScenarioComponent,
    children: [
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScenarioRoutingModule
{
}
