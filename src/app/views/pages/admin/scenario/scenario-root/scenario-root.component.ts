import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { scenarioInit } from 'src/app/@core/data/loyalty/scenario.model';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { ScenarioService } from 'src/app/@core/services/loyalty/scenario.service';

@Component({
  selector: 'app-scenario-root',
  templateUrl: './scenario-root.component.html',
  styleUrls: ['./scenario-root.component.scss']
})
export class ScenarioRootComponent implements OnInit, OnDestroy
{
  private unsubscribe = new Subject<void>();
  constructor(private router: Router, public service: ScenarioService, private route: ActivatedRoute, private baseInfoService: BaseInfoService, private elementRef: ElementRef)
  {

  }
  private updateScenarioFromServer(id: any)
  {
    if (id)
    {
      this.service.getScenarioById(id).subscribe((value) =>
      {
        this.baseInfoService.loadBaseInfo(() =>
        {
          if (!value)
          {
            value = scenarioInit;
          }
          this.service.createForm(value);
        }, value?.brandIds);
      });
    }
    else
    {
      this.baseInfoService.loadBaseInfo(() => { this.service.createForm(scenarioInit); });
    }
  }

  ngOnDestroy(): void
  {
    // Emit something to stop all Observables
    this.unsubscribe.next();
    // Complete the notifying Observable to remove it
    this.unsubscribe.complete();

    this.baseInfoService.destroy();
  }

  get isDisabled(): boolean
  {
    return this.service.isDisabled;
  };

  ngOnInit(): void
  {
    this.route.queryParams.pipe(takeUntil(this.unsubscribe)).subscribe(params =>
    {
      const id = params['id'];
      this.updateScenarioFromServer(id);
    });

    this.route.params.pipe(takeUntil(this.unsubscribe)).subscribe(params =>
    {
      const id = params['id'];
      this.updateScenarioFromServer(id);
    });
  }

  public selectedSwitch(event: boolean)
  {
    this.service.form.controls['senarioType'].setValue(event ? 1 : 2);
  }

  backToList()
  {
    this.router.navigate(['/admin/main/scenario/list']);
  }
}
