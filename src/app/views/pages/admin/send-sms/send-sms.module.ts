import { NgModule } from "@angular/core";
import { SharedModule } from "../shared.module";
import { sendSmsComponents, SendSmsRoutingModule } from "./send-sms-routing.module";


@NgModule({
  declarations: [
    ...sendSmsComponents
  ],
  imports: [
    SendSmsRoutingModule,
    SharedModule
  ],
  exports: [

  ]
})
export class SendSmsModule
{
}
