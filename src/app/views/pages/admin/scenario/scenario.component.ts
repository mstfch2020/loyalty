import { Component, OnInit } from '@angular/core';
import { ScenarioService } from 'src/app/@core/services/loyalty/scenario.service';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss']
})
export class ScenarioComponent implements OnInit
{

  constructor(public scenarioService: ScenarioService)
  {
  }

  ngOnInit(): void
  {
    this.scenarioService.loadBaseInfo();
  }

}
