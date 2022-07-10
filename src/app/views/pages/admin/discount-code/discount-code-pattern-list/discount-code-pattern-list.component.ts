import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiscountGrid } from 'src/app/@core/data/loyalty/discount.model';
import { FilterNames } from 'src/app/@core/data/loyalty/enums.model';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { DiscountService } from 'src/app/@core/services/loyalty/discount.service';
import { BaseSearch } from 'src/app/@core/services/ui/base-search.components';
import { BaseSearchService } from 'src/app/@core/services/ui/base-search.service';

@Component({
  selector: 'app-discount-code-pattern-list',
  templateUrl: './discount-code-pattern-list.component.html',
  styleUrls: ['./discount-code-pattern-list.component.scss']
})
export class DiscountCodePatternListComponent extends BaseSearch implements OnInit
{

  theViewList = new Array<DiscountGrid>();
  headerItems = ['ردیف', 'نام الگو', FilterNames.Brand, FilterNames.Date, FilterNames.volumeFilter];
  constructor(private router: Router,
    public service: DiscountService,
    public override baseInfoService: BaseInfoService, public override baseSearchService: BaseSearchService)
  {
    super(baseInfoService, baseSearchService);
  }

  override ngOnInit(): void
  {
    super.ngOnInit();
    this.service.Discounts$.subscribe(value =>
    {
      this.theViewList = value;
    });
  }

  override search(request: any)
  {
    request.pageSize = 20;
    this.service.GetDiscountCodePatternsGrid(request);
  }

  goToEdit(code: string = '')
  {
    if (code)
    {
      this.router.navigate(['/admin/main/discount-code/edit'], { queryParams: { id: code } });
      return;
    }
    this.router.navigate(['/admin/main/discount-code/edit']);
  }
}
