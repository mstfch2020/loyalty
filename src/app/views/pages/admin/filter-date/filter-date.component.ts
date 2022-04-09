import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterTitle } from "src/app/@core/data/loyalty/get-senarios-grid.model";

@Component({
  selector: 'app-filter-date',
  templateUrl: './filter-date.component.html',
  styleUrls: ['./filter-date.component.scss']
})
export class FilterDateComponent implements OnInit
{

  @Input() visible: boolean;
  @Input() items = new Array<FilterTitle>();
  @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() applyEvent: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;
  constructor(public formBuilder: FormBuilder)
  {
    this.form = this.formBuilder.group({ dateFrom: ['', [Validators.required]], });
    this.visible = false;
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
    this.applyEvent.emit({ dateFrom: this.form.controls['dateFrom'].value });
    this.cancelEvent.emit(false);
  }

}
