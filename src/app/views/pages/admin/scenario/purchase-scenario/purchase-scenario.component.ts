import { Component, OnInit } from '@angular/core';
import { ScenarioService } from 'src/app/@core/services/loyalty/scenario.service';

@Component({
  selector: 'app-purchase-scenario',
  templateUrl: './purchase-scenario.component.html',
  styleUrls: ['./purchase-scenario.component.scss']
})
export class PurchaseScenarioComponent implements OnInit
{

  constructor(public scenarioService: ScenarioService)
  {
  }

  ngOnInit(): void
  {
    this.scenarioService.form.markAllAsTouched();
  }



}
