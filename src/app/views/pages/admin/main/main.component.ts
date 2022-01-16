import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit
{

  paramsSubscription: Subscription | undefined;

  public isToggle: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  )
  {
    this.isToggle = false;
  }

  ngOnInit(): void
  {
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) =>
      {
        this.router.navigate(['/admin/profile']);
      });
  }

  OnDestroy()
  {
    this.paramsSubscription?.unsubscribe();
  }

}
