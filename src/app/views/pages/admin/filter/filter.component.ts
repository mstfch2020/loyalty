import { Component, EventEmitter, Input, OnInit, Output, HostListener } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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

  form: FormGroup;
  searchValue = '';
  conditionType = 1;

  constructor(public formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({ dateFrom: ['', [Validators.required]], });
    this.title = '';
    this.searchValue = '';
    this.items = [];
  }

  ngOnInit(): void {
  }

  cancelEventNotify() {
    this.cancelEvent.emit(false);
  }

  applyEventNotify() {
    if (this.searchValue && new RegExp(Utility.mobileRegEx).test(this.searchValue)) {
      this.applyEvent.emit({ value: [{ id: this.searchValue, title: this.searchValue, type: 3 }], conditionType: this.conditionType });
    } else {
      this.applyEvent.emit({ value: this.items.filter(p => p.checked), conditionType: this.conditionType });
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
