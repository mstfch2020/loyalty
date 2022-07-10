import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discount-code',
  templateUrl: './discount-code.component.html',
  styleUrls: ['./discount-code.component.scss']
})
export class DiscountCodeComponent implements OnInit
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
