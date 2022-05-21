import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit
{

  @Input() pageSize: number;
  @Input() totalPages = 0;
  @Input() pageIndex = 1;
  @Output() notifyPageIndex: EventEmitter<number> = new EventEmitter<number>();
  thePageList = new Array<any>();

  constructor()
  {
    this.pageSize = 0;
  }

  ngOnInit(): void
  {
    this.loadPagedList();
  }

  loadPagedList(): Array<any>
  {
    this.thePageList = [];
    for (let _i = 1; _i <= this.totalPages; _i++)
    {
      if (this.totalPages > 8)
      {
        if (_i < 5)
        {
          this.thePageList.push({
            'pageIndex': _i,
            'allowSelected': true,
          });
        } else
        {
          this.thePageList.push({
            'pageIndex': '...',
            'selected': false
          });
          this.thePageList.push({
            'pageIndex': this.totalPages,
            'allowSelected': true,
          });
          break;
        }
      } else
      {
        this.thePageList.push({
          'pageIndex': _i,
          'allowSelected': true,
        });
      }
    }
    return this.thePageList;
  }

  changePage(item: any)
  {
    if (!item.allowSelected)
    {
      return;
    }
    this.pageIndex = item.pageIndex;
    this.notifyPageIndex.emit(item.pageIndex);
  }



  nextPage()
  {
    if (this.pageIndex < this.totalPages)
    {
      this.notifyPageIndex.emit(++this.pageIndex);
    }
  }

  prevPage()
  {
    if (this.pageIndex > 1)
    {
      this.notifyPageIndex.emit(--this.pageIndex);
    }
  }

}
