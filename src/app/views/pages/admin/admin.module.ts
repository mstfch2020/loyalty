import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminRoutingModule } from "./admin-routing.module";
import { MainComponent } from './main/main.component';
import { ProfileComponent } from "./profile/profile.component";
import { UsersComponent } from "./users/users.component";

@NgModule({
  declarations: [
    MainComponent,
    ProfileComponent,
    UsersComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
  ],
  exports: [
    MainComponent,
  ]
})
export class AdminModule
{
}
