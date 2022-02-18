import {Component, OnInit} from '@angular/core';
import {ScenarioService} from 'src/app/@core/services/loyalty/scenario.service';

@Component({
  selector: 'app-scenario-root',
  templateUrl: './scenario-root.component.html',
  styleUrls: ['./scenario-root.component.scss']
})
export class ScenarioRootComponent implements OnInit {

  public isDisabled: boolean;

  constructor(public scenarioService: ScenarioService) {
    this.isDisabled = false;
  }

  ngOnInit(): void {
  }

  /**
   *
   * @param event
   */
  public selectedSwitch(event: number) {
    this.scenarioService.form.controls['senarioType'].setValue(event);
  }

}
