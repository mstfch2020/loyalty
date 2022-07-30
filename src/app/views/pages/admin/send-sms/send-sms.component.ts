import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-sms',
  templateUrl: './send-sms.component.html',
  styleUrls: ['./send-sms.component.scss']
})
export class SendSmsComponent implements OnInit
{
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
}
