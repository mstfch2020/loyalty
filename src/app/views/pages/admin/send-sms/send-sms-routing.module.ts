import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SendSmsCreateComponent } from "./send-sms-create/send-sms-create.component";
import { SendSmsListComponent } from "./send-sms-list/send-sms-list.component";
import { SendSmsPatternComponent } from "./send-sms-pattern/send-sms-pattern.component";
import { SendSmsComponent } from "./send-sms.component";

const routes: Routes = [
  {
    path: '',
    component: SendSmsComponent,
    children: [
      {
        path: '',
        redirectTo: 'def-list',
        pathMatch: 'full'
      },
      {
        path: 'send-list',
        component: SendSmsListComponent,
      },
      {
        path: 'def-list',
        component: SendSmsPatternComponent,
      },
      {
        path: 'edit',
        component: SendSmsCreateComponent,
      }
    ]
  }];
export const sendSmsComponents = [SendSmsCreateComponent, SendSmsPatternComponent, SendSmsListComponent, SendSmsComponent];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendSmsRoutingModule
{
}
