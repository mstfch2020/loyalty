import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Scenario } from 'src/app/@core/data/loyalty/scenario.model';
import { ScenarioService } from 'src/app/@core/services/loyalty/scenario.service';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss']
})
export class ViewListComponent implements OnInit
{

  public theViewList = new Array<Scenario>();
  pageIndex = 1;
  pageSize = 10;

  constructor(private router: Router, public scenarioService: ScenarioService)
  {
    scenarioService.scenarios$.subscribe(value => this.theViewList = value);
  }

  ngOnInit(): void
  {
    //this.router.navigate(['/admin/main/scenario/list']);
    this.scenarioService.getScenarios(this.pageSize, this.pageIndex);
  }

  routToBehavioral(item: any)
  {
    this.router.navigate(['/admin/main/scenario/root']);
  }

}
