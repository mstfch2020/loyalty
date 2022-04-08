import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterTitle, IdTitle } from "src/app/@core/data/loyalty/get-senarios-grid.model";

@Component({
  selector: 'app-filter-date',
  templateUrl: './filter-date.component.html',
  styleUrls: ['./filter-date.component.scss']
})
export class FilterDateComponent implements OnInit {

  @Input() visible: boolean;
  @Input() items = new Array<FilterTitle>();
  @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() applyEvent: EventEmitter<Array<IdTitle>> = new EventEmitter<Array<IdTitle>>();

  public fromDate: string = '';
  public toDate: string = '';

  constructor() {
    this.visible = false;
    this.items = [];
  }

  ngOnInit(): void {
  }

  cancelEventNotify() {
    this.cancelEvent.emit(false);
  }

  applyEventNotify() {

    let theFilterValueList = new Array<IdTitle>();
    
    theFilterValueList.push({
      id: '1',
      title: this.fromDate
    });

    theFilterValueList.push({
      id: '2',
      title: this.toDate
    });

    this.applyEvent.emit(theFilterValueList);
    this.cancelEvent.emit(false);
  }

}
