import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from "rxjs/operators";
import { GetPromoterCommissionsGridResult, GetPromoterCommissionsGridResultDetail } from 'src/app/@core/data/loyalty/customer.model';
import { FilterNames } from 'src/app/@core/data/loyalty/enums.model';
import { HeaderFilter } from 'src/app/@core/data/loyalty/header-filter.model';
import { createPeriodFormGroup, periodInit } from 'src/app/@core/data/loyalty/period.model';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { CustomerService } from 'src/app/@core/services/loyalty/customer.service';
import { BaseSearch } from 'src/app/@core/services/ui/base-search.components';
import { BaseSearchService } from 'src/app/@core/services/ui/base-search.service';
import { UiService } from 'src/app/@core/services/ui/ui.service';
import { Utility } from 'src/app/@core/utils/Utility';

@Component({
  selector: 'app-customer-commission-history',
  templateUrl: './customer-commission-history.component.html',
  styleUrls: ['./customer-commission-history.component.scss']
})
export class CustomerCommissionHistoryComponent extends BaseSearch implements OnInit
{
  theViewList = new Array<GetPromoterCommissionsGridResult>();
  headerItems: Array<HeaderFilter> =
    [new HeaderFilter(FilterNames.None, 'تاریخ'),
    new HeaderFilter(FilterNames.DiscountCode),
    new HeaderFilter(FilterNames.ProductTag),
    new HeaderFilter(FilterNames.None, 'تعداد'),
    new HeaderFilter(FilterNames.None, 'مجموع سفارش'),
    new HeaderFilter(FilterNames.Commission, 'درصد'),
    new HeaderFilter(FilterNames.None, 'پورسانت'),
    ];

  @Input() customerInfo: any;
  @Input() customerId: string;
  form: FormGroup;
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
    this.form = this.formBuilder.group({
      startDate: [Utility.getFullDateTimeFromPeriodInPersion(), []],
      endDate: [Utility.getFullDateTimeFromPeriodInPersion(), []],
      periodMin: createPeriodFormGroup(null, this.formBuilder),
      periodMax: createPeriodFormGroup(null, this.formBuilder),
    });

    this.search({});
  }

  override search(request: any)
  {
    request.pageSize = 10;
    request.customerId = this.customerId;
    request.brandId = this.customerInfo.brandId;
    if (!this.updatePeriodFormControl(this.form.get('startDate')?.value, 'periodMin', this.form) ||
      !this.updatePeriodFormControl(this.form.get('endDate')?.value, 'periodMax', this.form))
    {
      this.uiService.alert('بازه زمانی را وارد نمایید.');
      return;
    }
    const value = this.form.value;
    request.minDate = value.periodMin;
    request.maxDate = value.periodMax;

    this.service.GetPromoterCommissionsGrid(request).pipe(finalize(() =>
    {
      this.theViewList = this.getMockData();
      this.totalPages = 10;
    })).subscribe(value =>
    {
      this.totalPages = 0;
      if (value?.data)
      {
        this.theViewList = value.data;
        this.totalPages = Math.ceil(value.pagination.total / request.pageSize);
      }
    });
  }

  loadDetails(item: GetPromoterCommissionsGridResult)
  {
    this.service.GetPromoterCommissionsDetails(item.date, item.promoterDiscountCodeId).pipe(finalize(() =>
    {
      item.isOpen = !item.isOpen;
      item.details = this.getDetailMock();
    })).subscribe(result =>
    {
      item.details = result ?? [];
    });
  }

  getMockData(): GetPromoterCommissionsGridResult[]
  {
    return [
      { code: '123', commission: 1234, count: 2134, date: periodInit, promoterCommission: 345, tags: ['تک 1', 'تگ 2'], promoterDiscountCodeId: 'sdfsfsf', totalOrders: 123234, isOpen: false, details: this.getDetailMock() },
      { code: '123', commission: 1234, count: 2134, date: periodInit, promoterCommission: 345, tags: ['تک 1', 'تگ 2'], promoterDiscountCodeId: 'sdfsfsf', totalOrders: 123234, isOpen: false, details: this.getDetailMock() },
      { code: '123', commission: 1234, count: 2134, date: periodInit, promoterCommission: 345, tags: ['تک 1', 'تگ 2'], promoterDiscountCodeId: 'sdfsfsf', totalOrders: 123234, isOpen: false, details: this.getDetailMock() },
      { code: '123', commission: 1234, count: 2134, date: periodInit, promoterCommission: 345, tags: ['تک 1', 'تگ 2'], promoterDiscountCodeId: 'sdfsfsf', totalOrders: 123234, isOpen: false, details: this.getDetailMock() },
      { code: '123', commission: 1234, count: 2134, date: periodInit, promoterCommission: 345, tags: ['تک 1', 'تگ 2'], promoterDiscountCodeId: 'sdfsfsf', totalOrders: 123234, isOpen: false, details: this.getDetailMock() },
      { code: '123', commission: 1234, count: 2134, date: periodInit, promoterCommission: 345, tags: ['تک 1', 'تگ 2'], promoterDiscountCodeId: 'sdfsfsf', totalOrders: 123234, isOpen: false, details: this.getDetailMock() },
      { code: '123', commission: 1234, count: 2134, date: periodInit, promoterCommission: 345, tags: ['تک 1', 'تگ 2'], promoterDiscountCodeId: 'sdfsfsf', totalOrders: 123234, isOpen: false, details: this.getDetailMock() },
      { code: '123', commission: 1234, count: 2134, date: periodInit, promoterCommission: 345, tags: ['تک 1', 'تگ 2'], promoterDiscountCodeId: 'sdfsfsf', totalOrders: 123234, isOpen: false, details: this.getDetailMock() },
      { code: '123', commission: 1234, count: 2134, date: periodInit, promoterCommission: 345, tags: ['تک 1', 'تگ 2'], promoterDiscountCodeId: 'sdfsfsf', totalOrders: 123234, isOpen: false, details: this.getDetailMock() },
      { code: '123', commission: 1234, count: 2134, date: periodInit, promoterCommission: 345, tags: ['تک 1', 'تگ 2'], promoterDiscountCodeId: 'sdfsfsf', totalOrders: 123234, isOpen: false, details: this.getDetailMock() },
      { code: '123', commission: 1234, count: 2134, date: periodInit, promoterCommission: 345, tags: ['تک 1', 'تگ 2'], promoterDiscountCodeId: 'sdfsfsf', totalOrders: 123234, isOpen: false, details: this.getDetailMock() },
      { code: '123', commission: 1234, count: 2134, date: periodInit, promoterCommission: 345, tags: ['تک 1', 'تگ 2'], promoterDiscountCodeId: 'sdfsfsf', totalOrders: 123234, isOpen: false, details: this.getDetailMock() },
    ];
  }

  getDetailMock(): Array<GetPromoterCommissionsGridResultDetail>
  {
    return [
      { commission: 456, count: 12345, productName: 'محصول 123', promoterCommission: 5469, totalOrders: 951 },
      { commission: 456, count: 12345, productName: 'محصول 123', promoterCommission: 5469, totalOrders: 951 },
      { commission: 456, count: 12345, productName: 'محصول 123', promoterCommission: 5469, totalOrders: 951 },
      { commission: 456, count: 12345, productName: 'محصول 123', promoterCommission: 5469, totalOrders: 951 },
      { commission: 456, count: 12345, productName: 'محصول 123', promoterCommission: 5469, totalOrders: 951 },
      { commission: 456, count: 12345, productName: 'محصول 123', promoterCommission: 5469, totalOrders: 951 },
      { commission: 456, count: 12345, productName: 'محصول 123', promoterCommission: 5469, totalOrders: 951 },
      { commission: 456, count: 12345, productName: 'محصول 123', promoterCommission: 5469, totalOrders: 951 },
      { commission: 456, count: 12345, productName: 'محصول 123', promoterCommission: 5469, totalOrders: 951 },
      { commission: 456, count: 12345, productName: 'محصول 123', promoterCommission: 5469, totalOrders: 951 },
      { commission: 456, count: 12345, productName: 'محصول 123', promoterCommission: 5469, totalOrders: 951 },
      { commission: 456, count: 12345, productName: 'محصول 123', promoterCommission: 5469, totalOrders: 951 },
      { commission: 456, count: 12345, productName: 'محصول 123', promoterCommission: 5469, totalOrders: 951 },
      { commission: 456, count: 12345, productName: 'محصول 123', promoterCommission: 5469, totalOrders: 951 },
    ];
  }

}
