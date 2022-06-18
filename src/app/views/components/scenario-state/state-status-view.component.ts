import { Component, Input, OnInit } from '@angular/core';
import { StatusType } from 'src/app/@core/data/loyalty/enums.model';

@Component({
  selector: 'app-state-status-view',
  templateUrl: './state-status-view.component.html',
  styleUrls: ['./state-status-view.component.scss']
})
export class StateStatusViewComponent implements OnInit
{
  @Input() status = '0';
  @Input() statusType: StatusType = StatusType.None;

  constructor() { }

  ngOnInit(): void
  {
  }

}
