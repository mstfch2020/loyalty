import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlignMode, FilterType } from 'src/app/@core/data/Enums/Enumerations';
import { FilterTitle } from "src/app/@core/data/loyalty/get-senarios-grid.model";
import { Utility } from 'src/app/@core/utils/Utility';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit
{

  @Input() isCriteria: boolean;
  @Input() isRadio: boolean;
  @Input() visible: boolean;
  @Input() filterType: FilterType;
  @Input() align: AlignMode;
  @Input() length: number;

  @Input() items = new Array<FilterTitle>();
  @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() applyEvent: EventEmitter<any> = new EventEmitter<any>();

  filterForm!: FormGroup;

  constructor()
  {
    this.items = [];
    this.isCriteria = false;
    this.isRadio = false;
    this.visible = false;
    this.filterType = FilterType.Integer;
    this.align = AlignMode.Center;
    this.length = 11;
  }

  ngOnInit(): void
  {
    this.filterForm = new FormGroup({
      conditionType: new FormControl(1),
      searchValue: new FormControl(null),
      dateValue: new FormControl(null),
      textValue: new FormControl(null),
      intValue: new FormControl(null),
    });
  }

  cancelEventNotify()
  {
    this.visible = false;
    this.cancelEvent.emit(false);
  }

  applyEventNotify()
  {

    this.visible = false;
    let value = null;

    switch (this.filterType)
    {
      case FilterType.Integer: value = this.filterForm.get('textValue')?.value; this.applyEvent.emit(value); break;
      case FilterType.String: value = this.filterForm.get('intValue')?.value; this.applyEvent.emit(value); break;
      case FilterType.Date: value = this.filterForm.get('dateValue')?.value; this.applyEvent.emit(value); break;
      case FilterType.OrderList:
        {
          let searchValue = this.filterForm.get('searchValue')?.value;

          if (searchValue && new RegExp(Utility.mobileRegEx).test(searchValue))
          {
            this.applyEvent.emit({ value: [{ id: searchValue, title: searchValue, type: 3 }], conditionType: this.filterForm.get("conditionType")?.value });
          } else
          {
            this.applyEvent.emit({ value: this.items.filter(p => p.checked), conditionType: this.filterForm.get("conditionType")?.value });
          }
        };
        break;
    }

    this.cancelEvent.emit(false);
  }

  changed(item: FilterTitle)
  {
    if (this.isRadio)
    {
      this.items.forEach(p =>
      {
        if (item.id === p.id)
        {
          p.checked = true;
        }
        else { p.checked = false; }
      });
      return;
    }
    item.checked = !item.checked;

    if (item.id === 'all')
    {
      this.items.forEach(p =>
      {
        if (item.checked)
        {
          p.checked = true;
        }
        else { p.checked = false; }
      });
    }
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent)
  {
    let key = event.keyCode;
    if (key == 27)
    {
      this.cancelEventNotify();
    }
  }

}
