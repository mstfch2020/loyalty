import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterTitle } from "src/app/@core/data/loyalty/get-senarios-grid.model";

@Component({
  selector: 'app-filter-date',
  templateUrl: './filter-date.component.html',
  styleUrls: ['./filter-date.component.scss']
})
export class FilterDateComponent implements OnInit {

  @Input() items = new Array<FilterTitle>();
  @Input() visible :boolean;

  @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() applyEvent: EventEmitter<any> = new EventEmitter<any>();

  filterForm: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.items = [];
    this.visible = false;
    this.filterForm = this.formBuilder.group({ dateFrom: ['', [Validators.nullValidator]], });
  }

  ngOnInit(): void {
  }

  cancelEventNotify() {
    this.visible = false;
    this.cancelEvent.emit(false);
  }

  applyEventNotify() {
    this.applyEvent.emit({ dateFrom: this.filterForm.controls['dateFrom'].value });
    this.cancelEvent.emit(false);
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    let key = event.keyCode;
    if (key == 27) {
      this.cancelEventNotify();
    }
  }

}
