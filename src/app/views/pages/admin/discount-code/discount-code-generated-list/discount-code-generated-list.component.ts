import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { DiscountService } from 'src/app/@core/services/loyalty/discount.service';
import { BaseSearch } from 'src/app/@core/services/ui/base-search.components';

@Component({
  selector: 'app-discount-code-generated-list',
  templateUrl: './discount-code-generated-list.component.html',
  styleUrls: ['./discount-code-generated-list.component.scss']
})
export class DiscountCodeGeneratedListComponent extends BaseSearch implements OnInit
{

  theViewList = new Array<any>();

  constructor(private router: Router,
    public service: DiscountService,
    public override baseInfoService: BaseInfoService)
  {
    super(baseInfoService);
  }

  override ngOnInit(): void
  {
    super.ngOnInit();
    this.service.DiscountCodesGenerateds$.subscribe(value => this.theViewList = value);
  }

  override search(request: any)
  {
    request.pageSize = 20;
    this.service.GetDiscountCodesGeneratedGrid(request);
  }

  goToEdit(id: string)
  {
    if (id)
    {
      this.router.navigate(['/admin/main/discountcode/edit'], { queryParams: { id: id } });
      return;
    }
    this.router.navigate(['/admin/main/discountcode/edit']);
  }
}
