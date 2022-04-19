import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CustomerGroupDetail } from "src/app/@core/data/loyalty/customer-group.model";
import { CustomerGroupService } from "src/app/@core/services/loyalty/customer-group.service";
import { FilterTitle, IdTitle } from 'src/app/@core/data/loyalty/get-promoter-discount-setting-grid.model';
import { BrandFilter } from 'src/app/@core/data/loyalty/scenario/get-all-scenarios.model';

@Component({
  selector: 'app-customer-group-list',
  templateUrl: './customer-group-list.component.html',
  styleUrls: ['./customer-group-list.component.scss']
})
export class CustomerGroupListComponent implements OnInit {

  theViewList = new Array<CustomerGroupDetail>();

  theFilterBrandsList = new Array<FilterTitle>();
  theFilterBrandsSelectedList = new Array<IdTitle>();

  theFilterBrandsSelectedCondition = 0;

  pageSize = 9999;
  pageIndex = 1;

  constructor(private router: Router, public customerGroupService: CustomerGroupService) {
    customerGroupService.customerGroups$.subscribe(value => {
      this.theViewList = value;
    });
  }

  ngOnInit(): void {
    this.customerGroupService.getCustomerGroups(this.pageSize, this.pageIndex);
  }

  goToEdit(id: string) {
    if (id) {
      this.router.navigate(['/admin/main/customergroup/edit'], { queryParams: { id: id } });
      return;
    }
    this.router.navigate(['/admin/main/customergroup/edit']);
  }

  applyFilterForm(event: any, filterType: number) {
    // switch (filterType)
    // {
    //   case 1:
    //     this.theFilterCustomerSelectedList = event.value;
    //     this.theFilterCustomerSelectedCondition = parseInt(event.conditionType, 0);
    //     break;
    //   case 2:
    //     this.theFilterDateFromSelected = event?.dateFrom;
    //     this.theFilterDateToSelected = event?.dateTo;
    //     break;
    //   case 3:
    //     this.theFilterBrandsSelectedList = event.value;
    //     this.theFilterBrandsSelectedCondition = parseInt(event.conditionType, 0);
    //     break;
    //   case 4:
    //     this.theFilterStatusSelected = parseInt(event.value[0].id, 0);
    //     break;
    // }

    this.theFilterBrandsSelectedList = event.value;
    this.theFilterBrandsSelectedCondition = parseInt(event.conditionType, 0);

    const request: any = {};
    request.pageIndex = 1;
    request.pageSize = 999999;
    if (this.theFilterBrandsSelectedList && this.theFilterBrandsSelectedList.length > 0) {
      request.brandFilter = new BrandFilter();
      request.brandFilter.brandIds = this.theFilterBrandsSelectedList.map(p => p.id);
      if (this.theFilterBrandsSelectedList.findIndex(p => p.id === 'all') !== -1) {
        request.brandFilter.brandIds = [];
      }
      request.brandFilter.filterType = 0;
      if (this.theFilterBrandsSelectedCondition != 0) {
        request.brandFilter.filterType = this.theFilterBrandsSelectedCondition;
      }
    }

  }

}
