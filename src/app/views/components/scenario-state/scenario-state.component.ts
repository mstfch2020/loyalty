import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scenario-state',
  templateUrl: './scenario-state.component.html',
  styleUrls: ['./scenario-state.component.scss']
})
export class ScenarioStateComponent implements OnInit
{
  @Input() senarioStatus = '0';
  constructor() { }

  ngOnInit(): void
  {
  }

}
