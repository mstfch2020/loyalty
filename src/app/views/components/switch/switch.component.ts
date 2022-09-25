import
{
  animate, state,
  style, transition, trigger
} from '@angular/animations';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
export class SwitchComponent implements OnInit
{

  @Input() labelOne = 'عنوان اول';
  @Input() labelTwo = 'عنوان دوم';
  @Input() labelThree = '';
  @Input() isDisabled = false;
  @Output() notifySelectionSwitch: EventEmitter<number> = new EventEmitter<number>();
  @Input() index = 1;

  constructor(private cdref: ChangeDetectorRef)
  {

  }

  ngOnInit(): void
  {
    this.cdref.detectChanges();
  }

  selection(item: number)
  {
    this.index = item;
    if (this.isDisabled)
    {
      return;
    }
    this.notifySelectionSwitch.emit(item);
    this.cdref.detectChanges();
  }

  isOpen = true;

  toggle()
  {
    this.isOpen = !this.isOpen;
    this.cdref.detectChanges();
  }

}
