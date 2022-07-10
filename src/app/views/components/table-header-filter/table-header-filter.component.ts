import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChildren } from '@angular/core';
import { FilterNames } from 'src/app/@core/data/loyalty/enums.model';
import { BaseSearchService } from 'src/app/@core/services/ui/base-search.service';

@Component({
  selector: 'app-table-header-filter',
  templateUrl: './table-header-filter.component.html',
  styleUrls: ['./table-header-filter.component.scss']
})
export class TableHeaderFilterComponent implements OnInit
{
  FilterNames = FilterNames;
  @ViewChildren(TemplateRef) template: TemplateRef<any>;
  @Input()
  filterName: any;
  @Input()
  activeFilterName: FilterNames = FilterNames.None;

  @Output()
  onOpenFilterForm: EventEmitter<FilterNames> = new EventEmitter<FilterNames>();
  @Output()
  onCloseFilterForm: EventEmitter<FilterNames> = new EventEmitter<FilterNames>();
  @Output()
  onApplyFilterForm: EventEmitter<{ event: any, filterType: FilterNames; }> = new EventEmitter<{ event: any, filterType: FilterNames; }>();

  constructor(public service: BaseSearchService, private cdref: ChangeDetectorRef) { }

  ngOnInit(): void
  {
  }

  openFilterForm()
  {
    this.onOpenFilterForm.emit(this.filterName);
    this.cdref.detectChanges();
  }

  closeFilterForm()
  {
    this.onCloseFilterForm.emit(this.filterName);
    this.cdref.detectChanges();
  }

  applyFilterForm($event: any)
  {
    this.onApplyFilterForm.emit({ event: $event, filterType: this.filterName });
    this.cdref.detectChanges();
  }
}
