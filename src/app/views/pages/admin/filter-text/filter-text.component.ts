import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FilterType } from 'src/app/@core/data/Enums/Enumerations';
import { AlignMode } from 'src/app/@core/data/Enums/Enumerations';

@Component({
  selector: 'app-filter-text',
  templateUrl: './filter-text.component.html',
  styleUrls: ['./filter-text.component.scss']
})
export class FilterTextComponent implements OnInit {

  @Input() visible: boolean;
  @Input() filterType: FilterType;
  @Input() align: AlignMode;
  @Input() length: number;

  @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() applyEvent: EventEmitter<any> = new EventEmitter<any>();

  filterForm!: FormGroup;

  constructor() {
    this.visible = false;
    this.filterType = FilterType.Integer;
    this.align = AlignMode.Center;
    this.length = 11;
  }

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      dateValue: new FormControl(null),
      textValue: new FormControl(null),
      intValue: new FormControl(null),
    });
  }

  cancelEventNotify() {
    this.visible = false;
    this.cancelEvent.emit(false);
  }

  applyEventNotify() {

    let value = null;

    switch (this.filterType) {
      case FilterType.Integer: value = this.filterForm.get('textValue')?.value; break;
      case FilterType.String: value = this.filterForm.get('intValue')?.value; break;
      case FilterType.Date: value = this.filterForm.get('dateValue')?.value; break;
    }

    this.applyEvent.emit(value);
    this.cancelEvent.emit(false);
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    let key = event.keyCode;
    if (key == 27) {
      this.cancelEventNotify();
    }
  }
}
