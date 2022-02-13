import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-scenario-root',
  templateUrl: './scenario-root.component.html',
  styleUrls: ['./scenario-root.component.scss']
})
export class ScenarioRootComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.navigate(['/admin/main/scenario/purchase']);
  }

  /**
   *
   * @param event
   */
  public selectedSwitch(event: number) {

    if (event == 1) {
      this.router.navigate(['/admin/main/scenario/purchase']);
    } else {
      this.router.navigate(['/admin/main/scenario/behavioral']);
    }
  }

}
