import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-scenario-root',
  templateUrl: './scenario-root.component.html',
  styleUrls: ['./scenario-root.component.scss']
})
export class ScenarioRootComponent implements OnInit {

  public scenarioType: number;

  constructor(private router: Router) {
    this.scenarioType = 1;
  }

  ngOnInit(): void {
  }

  /**
   *
   * @param event
   */
  public selectedSwitch(event: number) {
    this.scenarioType = event;
  }

}
