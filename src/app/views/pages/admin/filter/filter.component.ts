import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterTitle, IdTitle} from "src/app/@core/data/loyalty/get-senarios-grid.model";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() visible: boolean;
  @Input() items = new Array<FilterTitle>();
  @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() applyEvent: EventEmitter<Array<IdTitle>> = new EventEmitter<Array<IdTitle>>();

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

    this.items.forEach((item: FilterTitle, key: number) => {
      if (item.checked) {
        theFilterValueList.push({
          id: item.id,
          title: item.title
        });
      }
    });

    this.applyEvent.emit(theFilterValueList);
    this.cancelEvent.emit(false);
  }

}
