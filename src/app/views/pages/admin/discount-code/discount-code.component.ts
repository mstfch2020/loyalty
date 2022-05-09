import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-discount-code',
  templateUrl: './discount-code.component.html',
  styleUrls: ['./discount-code.component.scss']
})
export class DiscountCodeComponent implements OnInit {

  public showTabLink: boolean;

  constructor(private router: Router) {
    this.showTabLink = true;
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        console.log(val.url);
      }
    });
  }

  ngOnInit(): void {
  }

}
