import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgPersianDatepickerModule } from "ng-persian-datepicker";
import { NgxMaskModule } from "ngx-mask";
import { FilterPipe } from "src/app/@core/data/pipes/filter.pipe";
import { StateStatusViewComponent } from "../../components/scenario-state/state-status-view.component";
import { FilterComponent } from "./filter/filter.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { SwitchComponent } from "./switch/switch.component";

const COMPONENTS = [
  SwitchComponent,
  PaginationComponent,
  StateStatusViewComponent,
  FilterComponent,
  FilterPipe,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgPersianDatepickerModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  exports: [
    ...COMPONENTS
  ]
})
export class SharedModule
{
}
