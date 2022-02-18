import {Component, Input, OnInit} from '@angular/core';
import {ScenarioService} from 'src/app/@core/services/loyalty/scenario.service';
import {Utility} from "../../../../../@core/utils/Utility";

@Component({
  selector: 'app-purchase-scenario',
  templateUrl: './purchase-scenario.component.html',
  styleUrls: ['./purchase-scenario.component.scss']
})
export class PurchaseScenarioComponent implements OnInit {

  @Input() isDisabled: boolean;

  constructor(public scenarioService: ScenarioService) {
    this.isDisabled = false;
  }

  ngOnInit(): void {
    this.scenarioService.form.markAllAsTouched();
  }

  /**
   * Restrict number
   * @param event
   */
  public checkDigit(event: any): boolean {
    return Utility.CheckDigit(event);
  }

}
