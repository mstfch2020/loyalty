import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gifts-code',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.scss']
})
export class GiftsComponent implements OnInit
{
  giftType = 1;
  id = '';
  isInListRoute = true;

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

  public selectedSwitch(event: number)
  {
    switch (event)
    {
      case 1: {
        this.router.navigate(['/admin/main/gifts/internal-edit'], { queryParams: { id: this.id } });
        return;
      }
      case 0: {
        this.router.navigate(['/admin/main/gifts/external-edit'], { queryParams: { id: this.id } });
        return;
      }
      case 2: {
        this.router.navigate(['/admin/main/gifts/lottery-edit'], { queryParams: { id: this.id } });
        return;
      }
    }
  }
}
