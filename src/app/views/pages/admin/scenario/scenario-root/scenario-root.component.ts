import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { scenarioInit } from 'src/app/@core/data/loyalty/scenario.model';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { ScenarioService } from 'src/app/@core/services/loyalty/scenario.service';

@Component({
  selector: 'app-scenario-root',
  templateUrl: './scenario-root.component.html',
  styleUrls: ['./scenario-root.component.scss']
})
export class ScenarioRootComponent implements OnInit
{

  get isDisabled(): boolean { return this.scenarioService.isDisabled; };

  constructor(public scenarioService: ScenarioService, private route: ActivatedRoute, private baseInfoService: BaseInfoService)
  {
    this.route.queryParams.subscribe(params =>
    {
      const id = params['id'];
      if (id)
      {
        this.scenarioService.getScenarioById(id).subscribe((value) =>
        {
          this.scenarioService.createForm(value);
          this.baseInfoService.loadBaseInfo(value.brandIds);
        });
      } else
      {
        this.scenarioService.createForm(scenarioInit);
        this.baseInfoService.loadBaseInfo();
      }
    });

  }

  ngOnInit(): void
  {
  }

  /**
   *
   * @param event
   */
  public selectedSwitch(event: boolean)
  {
    this.scenarioService.form.controls['senarioType'].setValue(event ? 1 : 2);
  }

}
