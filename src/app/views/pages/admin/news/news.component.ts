import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-code',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit
{
  isInListRoute = false;

  constructor(private router: Router)
  {

  }

  ngOnInit(): void
  {
    this.isInListRoute = document.URL.includes('comment');
    this.router.events.subscribe((val) =>
    {
      this.isInListRoute = document.URL.includes('comment');
    });
  }
}
