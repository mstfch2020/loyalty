import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterTitle } from "src/app/@core/data/loyalty/get-senarios-grid.model";
import { Utility } from 'src/app/@core/utils/Utility';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit
{

  @Input() title: string;
  @Input() align: string;
  @Input() isRadio: boolean;
  @Input() visible: boolean;

  @Input() items = new Array<FilterTitle>();
  @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() applyEvent: EventEmitter<any> = new EventEmitter<any>();

  filterForm!: FormGroup;
  isChecked: boolean;

  constructor()
  {
    this.title = '';
    this.align = '';
    this.items = [];
    this.isChecked = false;
    this.isRadio = false;
    this.visible = false;
  }

  ngOnInit(): void
  {
    this.filterForm = new FormGroup({
      conditionType: new FormControl(1),
      searchValue: new FormControl(null)
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
    let searchValue = this.filterForm.get('searchValue')?.value;

    if (searchValue && new RegExp(Utility.mobileRegEx).test(searchValue))
    {
      this.applyEvent.emit({ value: [{ id: searchValue, title: searchValue, type: 3 }], conditionType: this.filterForm.get("conditionType")?.value });
    } else
    {
      this.applyEvent.emit({ value: this.items.filter(p => p.checked), conditionType: this.filterForm.get("conditionType")?.value });
    }

    var theCheckedItems = this.items.filter(w => w.checked);
    if (theCheckedItems.length > 0)
    {
      this.isChecked = true;
    } else
    {
      this.isChecked = false;
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

    //if (this.items.findIndex(p => p.id === 'all' && p.checked) !== -1)
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
