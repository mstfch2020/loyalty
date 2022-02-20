import { Component, OnInit } from '@angular/core';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { ScenarioService } from 'src/app/@core/services/loyalty/scenario.service';
import { Utility } from "../../../../../@core/utils/Utility";

@Component({
  selector: 'app-purchase-scenario',
  templateUrl: './purchase-scenario.component.html',
  styleUrls: ['./purchase-scenario.component.scss']
})
export class PurchaseScenarioComponent implements OnInit
{

  get isDisabled(): boolean { return this.scenarioService.isDisabled; };

  constructor(public scenarioService: ScenarioService, public baseInfoService: BaseInfoService)
  {

  }

  ngOnInit(): void
  {
    this.scenarioService.form.markAllAsTouched();
  }

  /**
   * Restrict number
   * @param event
   */
  public checkDigit(event: any): boolean
  {
    return Utility.CheckDigit(event);
  }

}
