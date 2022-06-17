import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CustomerDetail, CustomerScenario, CustomerSubGrid } from "src/app/@core/data/loyalty/customer.model";
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { CustomerService } from "src/app/@core/services/loyalty/customer.service";
import { BaseSearch } from 'src/app/@core/services/ui/base-search.components';
import { Utility } from 'src/app/@core/utils/Utility';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent extends BaseSearch implements OnInit
{

  showHistory: boolean;
  customer = {} as CustomerDetail;
  subCustomerDetailList = new Array<CustomerSubGrid>();
  customerScenarioList = new Array<CustomerScenario>();
  id = '';
  theViewList = new Array<any>();

  constructor(
    private router: Router,
    public service: CustomerService,
    private route: ActivatedRoute,
    public override baseInfoService: BaseInfoService,
  )
  {

    super(baseInfoService);

    this.showHistory = false;

    service.customer$.subscribe(value =>
    {
      this.customer = value;
    });

    this.service.customerSubGrid$.subscribe(value => this.subCustomerDetailList = value);
    this.service.scenarioCustomer$.subscribe(value => this.customerScenarioList = value);
  }

  override search(request: any)
  {
    if (Utility.isNullOrEmpty(this.id)) { return; }
    request.id = this.id;
    this.service.getCustomerScenarioGrid(request);
  }

  override ngOnInit(): void
  {

    super.ngOnInit();

    // this.customerService.customer$.subscribe(value => {
    //   this.customer = value;
    // });

    this.route.queryParams.subscribe(params =>
    {
      this.id = params['id'];
      if (this.id)
      {
        this.service.getCustomerById(this.id);
        this.service.getCustomerScenarioGrid({ id: this.id });
        return;
      }
      this.router.navigate(['/admin/main/customer/']);
    });

  }

  showHistoryToggle()
  {
    this.showHistory = !this.showHistory;
    if (this.showHistory)
    {
      this.service.getCustomerSubGrid(this.pageSize, this.pageIndex, this.id);
    }
  }
}
