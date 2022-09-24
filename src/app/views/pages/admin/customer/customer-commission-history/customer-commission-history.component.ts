import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetPromoterCommissionsGridResult } from 'src/app/@core/data/loyalty/customer.model';
import { FilterNames } from 'src/app/@core/data/loyalty/enums.model';
import { HeaderFilter } from 'src/app/@core/data/loyalty/header-filter.model';
import { createPeriodFormGroup } from 'src/app/@core/data/loyalty/period.model';
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
  totalCommissions = 0;
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
      startDate: [Utility.getFullDateTimeFromPeriodInPersian(), []],
      endDate: [Utility.getFullDateTimeFromPeriodInPersian(), []],
      periodMin: createPeriodFormGroup(null, this.formBuilder),
      periodMax: createPeriodFormGroup(null, this.formBuilder),
    });

    this.form.get('startDate')?.valueChanges.subscribe(value =>
    {
      this.refresh();
    });

    this.form.get('endDate')?.valueChanges.subscribe(value =>
    {
      this.refresh();
    });

    super.ngOnInit();
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

    this.service.GetPromoterCommissionsGrid(request).subscribe(value =>
    {
      this.totalPages = 0;
      if (value?.data)
      {
        this.totalCommissions = value.data.totalCommissions;
        this.theViewList = value.data.items;
        this.totalPages = Math.ceil(value.pagination.total / request.pageSize);
      }
    });
  }

  loadDetails(item: GetPromoterCommissionsGridResult)
  {
    if (item.isOpen) { item.isOpen = false; return; }
    this.service.GetPromoterCommissionsDetails(item.date, item.promoterDiscountCodeId).subscribe(result =>
    {
      item.details = result ?? [];
      if (item?.details?.length !== 0)
      {
        item.isOpen = true;
        return;
      }
      item.isOpen = false;
    });
  }
}
