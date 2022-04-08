import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() visible: boolean;
  @Input() isLoading: boolean;
  @Input() items: any[];
  @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor() {
    this.visible = false;
    this.isLoading=false;
    this.items = [];
  }

  ngOnInit(): void {
  }

  cancelEventNotify() {
    this.cancelEvent.emit(false);
  }

}
