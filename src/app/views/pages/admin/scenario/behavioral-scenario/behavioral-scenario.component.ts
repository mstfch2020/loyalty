import { Component, OnInit } from '@angular/core';
import { ScenarioService } from 'src/app/@core/services/loyalty/scenario.service';

@Component({
  selector: 'app-behavioral-scenario',
  templateUrl: './behavioral-scenario.component.html',
  styleUrls: ['./behavioral-scenario.component.scss']
})
export class BehavioralScenarioComponent implements OnInit
{

  get isDisabled(): boolean { return this.scenarioService.isDisabled; };

  constructor(public scenarioService: ScenarioService)
  {

  }

  ngOnInit(): void
  {
    this.scenarioService.form.markAllAsTouched();
  }
}
