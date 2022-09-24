import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ExternalGiftEditComponent } from "./external-gift-edit/external-gift-edit.component";
import { ExternalGiftListComponent } from "./external-gift-list/external-gift-list.component";
import { GiftsComponent } from "./gifts.component";
import { InternalGiftEditComponent } from "./internal-gift-edit/internal-gift-edit.component";
import { InternalGiftListComponent } from "./internal-gift-list/internal-gift-list.component";
import { LotteryGiftEditComponent } from "./lottery-gift-edit/lottery-gift-edit.component";
import { LotteryGiftListComponent } from "./lottery-gift-list/lottery-gift-list.component";

const routes: Routes = [
  {
    path: '',
    component: GiftsComponent,
    children: [
      {
        path: '',
        redirectTo: 'internal-list',
        pathMatch: 'full'
      },
      {
        path: 'internal-list',
        component: InternalGiftListComponent,
      },
      {
        path: 'external-list',
        component: ExternalGiftListComponent,
      },
      {
        path: 'lottery-list',
        component: LotteryGiftListComponent,
      },
      {
        path: 'internal-edit',
        component: InternalGiftEditComponent
      },
      {
        path: 'external-edit',
        component: ExternalGiftEditComponent
      },
      {
        path: 'lottery-edit',
        component: LotteryGiftEditComponent
      }
    ]
  }
];

export const giftsComponents = [
  GiftsComponent,
  InternalGiftListComponent, ExternalGiftListComponent, LotteryGiftListComponent,
  InternalGiftEditComponent, ExternalGiftEditComponent, LotteryGiftEditComponent

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiftsRoutingModule
{
}
