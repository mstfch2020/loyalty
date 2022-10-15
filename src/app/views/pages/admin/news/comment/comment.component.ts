import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { FilterNames } from 'src/app/@core/data/loyalty/enums.model';
import { CommentModel } from 'src/app/@core/data/loyalty/news.model';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { NewsService } from 'src/app/@core/services/loyalty/news.service';
import { BaseSearch } from 'src/app/@core/services/ui/base-search.components';
import { BaseSearchService } from 'src/app/@core/services/ui/base-search.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent extends BaseSearch implements OnInit, OnDestroy
{
  theViewList = new Array<CommentModel>();
  headerItems = ['نام کاربر', 'دیدگاه', FilterNames.DateFilter];
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
    this.service.comments$.pipe(takeUntil(this.unsubscribe)).subscribe(value =>
    {
      this.theViewList = value;
    });
  }

  override search(request: any)
  {
    request.pageSize = 10;
    this.service.GetCommentsGrid(request);
  }

  goToEdit(id: string = '')
  {

  }

  gotoComments($event: Event, id: string = '')
  {
    $event.preventDefault();
    $event.stopPropagation();
  }

  override ngOnDestroy(): void
  {
    super.ngOnDestroy();
  }

}
