import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GetPromoterDiscountCodesGridResult } from 'src/app/@core/data/loyalty/customer.model';
import { FilterNames, PromoterDiscountCodeStatus } from 'src/app/@core/data/loyalty/enums.model';
import { HeaderFilter } from 'src/app/@core/data/loyalty/header-filter.model';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { CustomerService } from 'src/app/@core/services/loyalty/customer.service';
import { BaseSearch } from 'src/app/@core/services/ui/base-search.components';
import { BaseSearchService } from 'src/app/@core/services/ui/base-search.service';
import { UiService } from 'src/app/@core/services/ui/ui.service';

@Component({
  selector: 'app-customer-discount-history',
  templateUrl: './customer-discount-history.component.html',
  styleUrls: ['./customer-discount-history.component.scss']
})
export class CustomerDiscountHistoryComponent extends BaseSearch implements OnInit
{
  theViewList = new Array<GetPromoterDiscountCodesGridResult>();
  headerItems: Array<HeaderFilter> =
    [
      new HeaderFilter(FilterNames.DiscountCode),
      new HeaderFilter(FilterNames.ProductTag),
      new HeaderFilter(FilterNames.Percent, 'تخفیف مصرف کننده'),
      new HeaderFilter(FilterNames.None, 'تاریخ اعتبار'),
      new HeaderFilter(FilterNames.None, 'تعداد استفاده/سقف'),
      new HeaderFilter(FilterNames.Status, 'وضعیت'),
      new HeaderFilter(FilterNames.None, 'عملیات'),
    ];

  @Input() customerInfo: any;
  @Input() customerId: string;

  totalPages = 0;

  constructor(
    public service: CustomerService,
    public override baseInfoService: BaseInfoService,
    public override baseSearchService: BaseSearchService,
    public formBuilder: FormBuilder,
    public uiService: UiService)
  {
    super(baseInfoService, baseSearchService);
  }

  override ngOnInit(): void
  {
    super.ngOnInit();
  }

  override search(request: any)
  {
    request.pageSize = 10;
    request.customerId = this.customerId;
    request.brandId = this.customerInfo.brandId;

    this.service.GetPromoterDiscountCodesGrid(request).subscribe(value =>
    {
      this.totalPages = 0;
      if (value?.data)
      {
        this.theViewList = value.data;
        this.totalPages = Math.ceil(value.pagination.total / request.pageSize);
      }
    });
  }

  activeInActive(item: GetPromoterDiscountCodesGridResult)
  {
    const status = item.status === PromoterDiscountCodeStatus.Active ? PromoterDiscountCodeStatus.InActive : PromoterDiscountCodeStatus.Active;
    this.service.PromoterDiscountCodeSetStatus(status, item.id).subscribe(result =>
    {
      item.status = status;
    });
  }
}
