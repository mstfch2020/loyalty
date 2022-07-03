import { NgModule } from '@angular/core';
import { DisplayAlertComponent } from "../../general/display-alert/display-alert.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { CustomerGroupTemporaryEditComponent } from './customer-group-temporary/customer-group-temporary-edit/customer-group-temporary-edit.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from "./profile/profile.component";
import { ReportsComponent } from './reports/reports.component';
import { SharedModule } from './shared.module';
import { UsersComponent } from "./users/users.component";


@NgModule({
  declarations: [
    MainComponent,
    ProfileComponent,
    UsersComponent,
    ReportsComponent,
    CustomerGroupTemporaryEditComponent,
    DisplayAlertComponent,

  ],
  imports: [
    AdminRoutingModule,
    SharedModule
  ],
  exports: [
    MainComponent,
  ]
})
export class AdminModule
{
}
