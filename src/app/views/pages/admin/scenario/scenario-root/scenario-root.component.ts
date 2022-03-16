import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private router: Router, public scenarioService: ScenarioService, private route: ActivatedRoute, private baseInfoService: BaseInfoService)
  {
    this.route.queryParams.subscribe(params =>
    {
      const id = params['id'];
      if (id)
      {
        this.scenarioService.getScenarioById(id).subscribe((value) =>
        {
          this.baseInfoService.loadBaseInfo(() =>
          {
            if (!value)
            {
              value = scenarioInit;
            }
            this.scenarioService.createForm(value);
          }, value?.brandIds);
        });
      } else
      {
        this.baseInfoService.loadBaseInfo(() => { this.scenarioService.createForm(scenarioInit); });
      }
    });

  }

  get isDisabled(): boolean
  {
    return this.scenarioService.isDisabled;
  };

  ngOnInit(): void
  {
  }

  public selectedSwitch(event: boolean)
  {
    this.scenarioService.form.controls['senarioType'].setValue(event ? 1 : 2);
  }

  backToList()
  {
    this.router.navigate(['/admin/main/scenario/list']);
  }
}
