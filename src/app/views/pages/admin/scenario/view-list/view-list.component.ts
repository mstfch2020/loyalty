import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GetSenariosGrid } from 'src/app/@core/data/loyalty/get-senarios-grid.model';
import { ScenarioService } from 'src/app/@core/services/loyalty/scenario.service';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss']
})
export class ViewListComponent implements OnInit
{

  public theViewList = new Array<GetSenariosGrid>();
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

  routToBehavioral(id: string)
  {
    this.scenarioService.getScenarioById(id).subscribe((value) =>
    {
      this.scenarioService.createForm(value);
      this.router.navigate(['/admin/main/scenario/root']);
      this.scenarioService.expierDate = new Date().valueOf();
      this.scenarioService.loadBaseInfo(value.brandIds);
    });

  }

}
