import { Component, OnInit } from '@angular/core';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { ScenarioService } from 'src/app/@core/services/loyalty/scenario.service';

@Component({
  selector: 'app-purchase-scenario',
  templateUrl: './purchase-scenario.component.html',
  styleUrls: ['./purchase-scenario.component.scss']
})
export class PurchaseScenarioComponent implements OnInit
{

  percent:number;

  constructor(
    public scenarioService: ScenarioService,
    public baseInfoService: BaseInfoService)
  {
    this.percent=0;
  }

  get isDisabled(): boolean
  {
    return this.scenarioService.isDisabled;
  };

  ngOnInit(): void
  {
    this.scenarioService.form.markAllAsTouched();
  }

}
