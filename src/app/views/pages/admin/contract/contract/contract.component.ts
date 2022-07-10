import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit
{

  public isInListRoute = true;

  constructor(private router: Router)
  {
    router.events.subscribe((val) =>
    {
      this.isInListRoute = document.URL.includes('list');
    });
  }

  ngOnInit(): void
  {
  }

}
