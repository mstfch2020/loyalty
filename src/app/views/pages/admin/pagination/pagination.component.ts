import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() pageSize: number;
  @Input() itemsPerPage: number;
  @Output() pageIndex: number;

  thePageList = new Array<any>();

  constructor() {
    this.pageSize = 0;
    this.itemsPerPage = 0;
    this.pageIndex = 1;
  }

  ngOnInit(): void {

    let countPage = Math.round(this.pageSize / this.itemsPerPage);

    for (let _i = 1; _i <= countPage; _i++) {
      if (countPage > 10) {
        if (_i < 5) {
          this.thePageList.push({
            'pageNumber': _i,
            'selected': false
          });
        } else {
          this.thePageList.push({
            'pageNumber': '...',
            'selected': false
          });
          this.thePageList.push({
            'pageNumber': countPage,
            'selected': false
          });
          break;
        }
      } else {
        this.thePageList.push({
          'pageNumber': _i,
          'selected': false
        });
      }
    }

  }

  selectPage(item: any) {
    this.thePageList.forEach((page: any) => {
      page.selected = false;
    });
    item.selected = true;
  }

}
