import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgPersianDatepickerModule } from "ng-persian-datepicker";
import { NgxMaskModule } from "ngx-mask";
import { FilterPipe } from "src/app/@core/data/pipes/filter.pipe";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { StateStatusViewComponent } from "../../components/scenario-state/state-status-view.component";
import { FilterComponent } from "./filter/filter.component";
import { SwitchComponent } from "./switch/switch.component";

const COMPONENTS = [
  SwitchComponent,
  PaginationComponent,
  StateStatusViewComponent,
  FilterComponent,
  FilterPipe,
];
const CORE_MODULES = [
  FormsModule,
  CommonModule,
  NgbModule,
  ReactiveFormsModule,
  NgSelectModule,
  NgPersianDatepickerModule,
  NgxMaskModule];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    ...CORE_MODULES
  ],
  providers: [],
  exports: [
    ...COMPONENTS, ...CORE_MODULES
  ]
})
export class SharedModule
{
}
