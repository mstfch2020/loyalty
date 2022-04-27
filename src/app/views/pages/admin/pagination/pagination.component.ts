import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() pageSize: number;
  @Input() itemsPerPage: number;
  @Output() notifyPageIndex: EventEmitter<number> = new EventEmitter<number>();

  thePageList = new Array<any>();
  currentPage: any;

  constructor() {
    this.pageSize = 0;
    this.itemsPerPage = 0;
    this.currentPage = {
      'pageIndex': 1,
      'allowSelected': true,
      'selected': true
    }
  }

  ngOnInit(): void {

    let countPage = Math.round(this.pageSize / this.itemsPerPage);

    for (let _i = 1; _i <= countPage; _i++) {
      if (countPage > 8) {
        if (_i < 5) {
          this.thePageList.push({
            'pageIndex': _i,
            'allowSelected': true,
            'selected': (_i == 1) ? true : false
          });
        } else {
          this.thePageList.push({
            'pageIndex': '...',
            'allowSelected': false,
            'selected': false
          });
          this.thePageList.push({
            'pageIndex': countPage,
            'allowSelected': true,
            'selected': false
          });
          break;
        }
      } else {
        this.thePageList.push({
          'pageIndex': _i,
          'allowSelected': true,
          'selected': (_i == 1) ? true : false
        });
      }
    }

  }

  selectedPage(item: any) {
    if (item.allowSelected) {
      this.thePageList.forEach((page: any) => {
        page.selected = false;
      });
      item.selected = true;
      this.currentPage = item;
      this.notifyPageIndex.emit(item.pageIndex);
    }
  }

  nextPage() {
    let countPage = Math.round(this.pageSize / this.itemsPerPage);
    if (this.currentPage.pageIndex < countPage) {
      this.currentPage.pageIndex = this.currentPage.pageIndex + 1;
      console.log(this.currentPage);
      this.selectedPage(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage.pageIndex > 1) {
      this.currentPage.pageIndex = this.currentPage.pageIndex - 1;
      console.log(this.currentPage);
      this.selectedPage(this.currentPage);
    }
  }

}
