import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from "./profile/profile.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule
{
}
