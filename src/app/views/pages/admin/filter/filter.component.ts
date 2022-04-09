import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterTitle, IdTitle } from "src/app/@core/data/loyalty/get-senarios-grid.model";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit
{

  @Input() visible: boolean;
  @Input() isRadio = false;

  @Input() items = new Array<FilterTitle>();
  @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() applyEvent: EventEmitter<any> = new EventEmitter<any>();

  searchValue = '';
  conditionType = 1;
  constructor()
  {
    this.visible = false;
    this.searchValue = '';
    this.items = [];
  }

  ngOnInit(): void
  {
  }

  cancelEventNotify()
  {
    this.cancelEvent.emit(false);
  }

  applyEventNotify()
  {

    let theFilterValueList = new Array<IdTitle>();

    this.items.forEach((item: FilterTitle, key: number) =>
    {
      if (item.checked)
      {
        theFilterValueList.push({
          id: item.id,
          title: item.title
        });
      }
    });

    this.applyEvent.emit({ value: theFilterValueList, conditionType: this.conditionType });
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
  }

}
