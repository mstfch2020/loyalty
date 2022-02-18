import {Component, Input, OnInit} from '@angular/core';
import { ScenarioService } from 'src/app/@core/services/loyalty/scenario.service';

@Component({
  selector: 'app-behavioral-scenario',
  templateUrl: './behavioral-scenario.component.html',
  styleUrls: ['./behavioral-scenario.component.scss']
})
export class BehavioralScenarioComponent implements OnInit
{

  @Input() isDisabled:boolean;

  constructor(public scenarioService: ScenarioService)
  {
    this.isDisabled = false;
  }

  ngOnInit(): void
  {
    this.scenarioService.form.markAllAsTouched();
  }
}
