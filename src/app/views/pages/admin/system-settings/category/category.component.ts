import { Component, OnInit } from '@angular/core';
import { CategoryGrid, categoryInit } from 'src/app/@core/data/loyalty/category.model';
import { FilterNames } from 'src/app/@core/data/loyalty/enums.model';
import { HeaderFilter } from 'src/app/@core/data/loyalty/header-filter.model';
import { CategoryService } from 'src/app/@core/services/loyalty/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit
{

  theViewList = new Array<CategoryGrid>();
  headerItems: Array<HeaderFilter> =
    [
      new HeaderFilter(FilterNames.None, 'زدیف'),
      new HeaderFilter(FilterNames.None, 'نوع دسته بندی'),
      new HeaderFilter(FilterNames.None, 'عملیات'),
      new HeaderFilter(FilterNames.None, 'وضعیت'),
    ];


  isDisabled = false;

  constructor(public service: CategoryService) { }

  ngOnInit(): void
  {
    this.service.createForm(categoryInit);
    this.service.category$.subscribe(value => this.theViewList = value);
    this.service.getCategoryPointsAwardGrid();
  }

  update(item: CategoryGrid)
  {
    item.isEdit = !item.isEdit;
    if (!item.isEdit)
    {
      this.service.submit(item);
    }
  }

  active(item: CategoryGrid)
  {
    item.isActive = !item.isActive;
    this.service.setActive(item);
  }
}
