import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { ScenarioService } from 'src/app/@core/services/loyalty/scenario.service';

@Component({
  selector: 'app-purchase-scenario',
  templateUrl: './purchase-scenario.component.html',
  styleUrls: ['./purchase-scenario.component.scss']
})
export class PurchaseScenarioComponent implements OnInit, OnDestroy
{

  percent: number;

  constructor(
    public service: ScenarioService,
    public baseInfoService: BaseInfoService)
  {
    this.percent = 0;
  }

  ngOnDestroy(): void
  {
    this.baseInfoService.destroy();
  }

  get isDisabled(): boolean
  {
    return this.service.isDisabled;
  };

  ngOnInit(): void
  {
    this.service.form.markAllAsTouched();
  }

}
