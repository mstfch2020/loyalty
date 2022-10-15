import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsModel, newsModelInit } from 'src/app/@core/data/loyalty/news.model';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { NewsService } from 'src/app/@core/services/loyalty/news.service';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.scss']
})
export class NewsEditComponent implements OnInit
{

  isDisabled = false;
  id = '';

  constructor(public route: ActivatedRoute, public service: NewsService,
    private cdref: ChangeDetectorRef, public router: Router,
    public baseInfoService: BaseInfoService) { }

  ngOnInit(): void
  {
    this.service.createForm(newsModelInit);
    this.route.queryParams.subscribe(params =>
    {
      this.id = params['id'];
      if (this.id)
      {
        this.service.GetNewsById(this.id).subscribe((value) =>
        {

          if (!value)
          {
            value = newsModelInit;
          }
        });
      } else
      {
        this.loadBaseInfo(newsModelInit);
      }
    });
    this.service.form.markAllAsTouched();
  }

  loadBaseInfo(value: NewsModel)
  {
    this.service.createForm(value);
    this.cdref.detectChanges();
  }

  backToList()
  {
    this.router.navigate(['/admin/main/news']);
  }


}
