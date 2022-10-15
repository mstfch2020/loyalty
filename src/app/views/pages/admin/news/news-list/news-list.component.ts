import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { FilterNames } from 'src/app/@core/data/loyalty/enums.model';
import { NewsGrid } from 'src/app/@core/data/loyalty/news.model';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { NewsService } from 'src/app/@core/services/loyalty/news.service';
import { BaseSearch } from 'src/app/@core/services/ui/base-search.components';
import { BaseSearchService } from 'src/app/@core/services/ui/base-search.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent extends BaseSearch implements OnInit, OnDestroy
{
  theViewList = new Array<NewsGrid>();
  headerItems = ['ردیف', 'عنوان', 'تاریخ', FilterNames.NewsStatus, 'دیدگاه'];
  constructor(
    private router: Router,
    public service: NewsService,
    public override baseInfoService: BaseInfoService,
    public override baseSearchService: BaseSearchService)
  {
    super(baseInfoService, baseSearchService);
  }

  override ngOnInit(): void
  {
    super.ngOnInit();
    this.service.news$.pipe(takeUntil(this.unsubscribe)).subscribe(value =>
    {
      this.theViewList = value;
    });
  }

  override search(request: any)
  {
    request.pageSize = 10;
    this.service.GetNewsGrid(request);
  }

  goToEdit(id: string = '')
  {
    if (id)
    {
      this.router.navigate(['/admin/main/news/edit'], { queryParams: { id: id } });
      return;
    }
    this.router.navigate(['/admin/main/news/edit']);
  }

  gotoComments($event: Event, id: string = '')
  {
    $event.preventDefault();
    $event.stopPropagation();

    if (id)
    {
      this.router.navigate(['/admin/main/news/all-comments'], { queryParams: { id: id } });
      return;
    }

  }

  override ngOnDestroy(): void
  {
    super.ngOnDestroy();
  }

}
