import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  @Input() labelOne: string;
  @Input() labelTwo: string;
  @Output() notifySelectionSwitch: EventEmitter<number> = new EventEmitter<number>();

  isOneSelected: boolean;
  isTwoSelected: boolean;

  constructor() {
    this.labelOne = 'عنوان اول';
    this.labelTwo = 'عنوان دوم';
    this.isOneSelected = true;
    this.isTwoSelected = false;
  }

  ngOnInit(): void {

  }

  public selection(item: number) {
    this.notifySelectionSwitch.emit(item);
    if (item == 1) {
      this.isOneSelected = true;
      this.isTwoSelected = false;
    } else {
      this.isOneSelected = false;
      this.isTwoSelected = true;
    }
  }

}
