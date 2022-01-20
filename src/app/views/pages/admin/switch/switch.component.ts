import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  @Input() labelOne: string;
  @Input() labelTwo: string;

  constructor() {
    this.labelOne='عنوان اول';
    this.labelTwo='عنوان دوم';
  }

  ngOnInit(): void {

  }

}
