import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit
{

  @Input() labelOne = 'عنوان اول';
  @Input() labelTwo = 'عنوان دوم';
  @Input() isDisabled = false;
  @Output() notifySelectionSwitch: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() isOneSelected = true;

  constructor()
  {

  }

  ngOnInit(): void
  {

  }

  public selection(item: boolean)
  {
    if (this.isDisabled) { return; }
    this.notifySelectionSwitch.emit(item);
    this.isOneSelected = item;
  }

}
