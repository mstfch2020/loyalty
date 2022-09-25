import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  constructor(private router: Router, private cdref: ChangeDetectorRef)
  {

  }

  ngOnInit(): void
  {
    this.checkRoutOption();
    this.router.events.subscribe((val) =>
    {
      this.checkRoutOption();
    });
  }

  private checkRoutOption()
  {
    this.isInListRoute = document.URL.includes('list');
    if (document.URL.includes('internal'))
    {
      this.giftType = 0;
    }
    else if (document.URL.includes('external'))
    {
      this.giftType = 1;
    }
    else
    {
      this.giftType = 2;
    }
    this.cdref.detectChanges();
  }

  public selectedSwitch(event: number)
  {
    switch (event)
    {
      case 0: {
        this.router.navigate(['/admin/main/gifts/internal-edit'], { queryParams: { id: this.id } });
        return;
      }
      case 1: {
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
