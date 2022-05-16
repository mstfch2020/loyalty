import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CustomerDetail, CustomerSubGrid } from "src/app/@core/data/loyalty/customer.model";
import { CustomerService } from "src/app/@core/services/loyalty/customer.service";
import { BaseSearch } from 'src/app/@core/services/ui/base-search.components';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent extends BaseSearch implements OnInit {

  showHistory: boolean;
  customer = {} as CustomerDetail;
  subCustomerDetailList = new Array<CustomerSubGrid>();
  id = '';
  theViewList = new Array<any>();

  constructor(
    private router: Router,
    public customerService: CustomerService,
    private route: ActivatedRoute,
    public override baseInfoService: BaseInfoService,
  ) {
    
    super(baseInfoService);

    this.showHistory = false;

    customerService.customer$.subscribe(value => {
      this.customer = value;
    });
  }

  override search(request: any) {
  }

  override ngOnInit(): void {

    super.ngOnInit();

    // this.customerService.customer$.subscribe(value => {
    //   this.customer = value;
    // });

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.customerService.getCustomerById(this.id);
        return;
      }
      this.router.navigate(['/admin/main/customer/']);
    });
    this.subCustomerDetailList = [];
    this.customerService.customerSubGrid$.subscribe(value => this.subCustomerDetailList = value);
  }

  showHistoryToggle() {
    this.showHistory = !this.showHistory;
    if (this.showHistory) {
      this.customerService.getCustomerSubGrid(this.pageSize, this.pageIndex, this.id);
    }
  }
}
