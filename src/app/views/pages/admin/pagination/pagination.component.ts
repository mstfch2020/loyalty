import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit
{

  @Input() total: number;
  @Input() pageSize: number;
  @Output() notifyPageIndex: EventEmitter<number> = new EventEmitter<number>();
  totalPages = 0;
  thePageList = new Array<any>();
  currentPage: any;

  constructor()
  {
    this.total = 0;
    this.pageSize = 0;
    this.currentPage = {
      'pageIndex': 1,
      'allowSelected': true,
      'selected': true
    };
  }

  ngOnInit(): void
  {

    this.totalPages = Math.round(this.total / this.pageSize);

    for (let _i = 1; _i <= this.totalPages; _i++)
    {
      if (this.totalPages > 8)
      {
        if (_i < 5)
        {
          this.thePageList.push({
            'pageIndex': _i,
            'allowSelected': true,
            'selected': (_i == 1) ? true : false
          });
        } else
        {
          this.thePageList.push({
            'pageIndex': '...',
            'allowSelected': false,
            'selected': false
          });
          this.thePageList.push({
            'pageIndex': this.totalPages,
            'allowSelected': true,
            'selected': false
          });
          break;
        }
      } else
      {
        this.thePageList.push({
          'pageIndex': _i,
          'allowSelected': true,
          'selected': (_i == 1) ? true : false
        });
      }
    }

  }

  changePage(item: any)
  {
    if (!this.currentPage.allowSelected)
    {
      return;
    }
    this.currentPage = item;
    this.selectedPage();
  }

  selectedPage()
  {
    this.thePageList.forEach((page: any) =>
    {
      page.selected = false;
    });
    this.currentPage.selected = true;

    this.notifyPageIndex.emit(this.currentPage.pageIndex);
  }

  nextPage()
  {
    if (this.currentPage.pageIndex < this.totalPages)
    {
      this.currentPage = this.thePageList[this.currentPage.pageIndex];
      this.selectedPage();
    }
  }

  prevPage()
  {
    if (this.currentPage.pageIndex > 1)
    {
      this.currentPage = this.thePageList[this.currentPage.pageIndex - 2];
      this.selectedPage();
    }
  }

}
