import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CustomerMainGrid } from "src/app/@core/data/loyalty/customer.model";
import { FilterNames } from 'src/app/@core/data/loyalty/enums.model';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { CustomerService } from "src/app/@core/services/loyalty/customer.service";
import { BaseSearch } from 'src/app/@core/services/ui/base-search.components';
import { BaseSearchService } from 'src/app/@core/services/ui/base-search.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent extends BaseSearch implements OnInit
{

  theViewList = new Array<CustomerMainGrid>();
  headerItems = ['ردیف', FilterNames.Phone, FilterNames.Brand, FilterNames.UserType, FilterNames.Customer, 'امتیاز فعلی', FilterNames.CreateAccountDateFilter];

  constructor(private router: Router,
    public service: CustomerService,
    public override baseInfoService: BaseInfoService, public override baseSearchService: BaseSearchService)
  {
    super(baseInfoService, baseSearchService);
  }

  override ngOnInit(): void
  {
    super.ngOnInit();
    this.service.customerMainGrid$.subscribe(value =>
    {
      this.theViewList = value;
    });
  }

  override search(request: any)
  {
    request.pageSize = 20;
    this.service.getCustomerMainGrid(request);
  }

  goToEdit(id: string = '')
  {
    if (id)
    {
      this.router.navigate(['/admin/main/customer/edit'], { queryParams: { id: id } });
    }
  }


}
