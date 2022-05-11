import { Component, EventEmitter, Input, OnInit, Output, HostListener } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FilterTitle } from "src/app/@core/data/loyalty/get-senarios-grid.model";
import { Utility } from 'src/app/@core/utils/Utility';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() title: string;
  @Input() isRadio = false;

  @Input() items = new Array<FilterTitle>();
  @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() applyEvent: EventEmitter<any> = new EventEmitter<any>();

  filterForm!: FormGroup;
  conditionType = 1;
  isChecked: boolean;

  constructor() {
    this.title = '';
    this.items = [];
    this.isChecked = false;
  }

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      conditionType: new FormControl(null),
      searchValue: new FormControl(null)
    });
  }

  cancelEventNotify() {
    this.cancelEvent.emit(false);
  }

  applyEventNotify() {

    let searchValue = this.filterForm.get('searchValue')?.value;

    if (searchValue && new RegExp(Utility.mobileRegEx).test(searchValue)) {
      this.applyEvent.emit({ value: [{ id: searchValue, title: searchValue, type: 3 }], conditionType: this.conditionType });
    } else {
      this.applyEvent.emit({ value: this.items.filter(p => p.checked), conditionType: this.conditionType });
    }

    var theCheckedItems = this.items.filter(w => w.checked);
    if (theCheckedItems.length > 0) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }

    this.cancelEvent.emit(false);
  }

  changed(item: FilterTitle) {
    if (this.isRadio) {
      this.items.forEach(p => {
        if (item.id === p.id) {
          p.checked = true;
        }
        else { p.checked = false; }
      });
      return;
    }
    item.checked = !item.checked;

    //if (this.items.findIndex(p => p.id === 'all' && p.checked) !== -1)
    if (item.id === 'all') {
      this.items.forEach(p => {
        if (item.checked) {
          p.checked = true;
        }
        else { p.checked = false; }
      });
    }
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    let key = event.keyCode;
    if (key == 27) {
      this.cancelEventNotify();
    }
  }

}
