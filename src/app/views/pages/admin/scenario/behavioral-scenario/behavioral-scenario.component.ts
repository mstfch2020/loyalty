import {Component, OnInit} from '@angular/core';
import {BaseInfoService} from 'src/app/@core/services/loyalty/base-info.service';
import {ScenarioService} from 'src/app/@core/services/loyalty/scenario.service';

@Component({
  selector: 'app-behavioral-scenario',
  templateUrl: './behavioral-scenario.component.html',
  styleUrls: ['./behavioral-scenario.component.scss']
})
export class BehavioralScenarioComponent implements OnInit {

  constructor(public scenarioService: ScenarioService, public baseInfoService: BaseInfoService) {

  }

  get isDisabled(): boolean {
    return this.scenarioService.isDisabled;
  };

  ngOnInit(): void {
    this.scenarioService.form.markAllAsTouched();
  }
}
