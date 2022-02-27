import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.8,
        backgroundColor: 'blue'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class SwitchComponent implements OnInit {

  @Input() labelOne = 'عنوان اول';
  @Input() labelTwo = 'عنوان دوم';
  @Input() isDisabled = false;
  @Output() notifySelectionSwitch: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() isOneSelected = true;

  constructor() {

  }

  ngOnInit(): void {

  }

  selection(item: boolean) {
    if (this.isDisabled) {
      return;
    }
    this.notifySelectionSwitch.emit(item);
    this.isOneSelected = item;
  }

  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }

}
