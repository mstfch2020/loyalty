import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CustomerGroupDetail } from "src/app/@core/data/loyalty/customer-group.model";
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { CustomerGroupService } from "src/app/@core/services/loyalty/customer-group.service";
import { BaseSearch } from 'src/app/@core/services/ui/base-search.components';

@Component({
  selector: 'app-customer-group-list',
  templateUrl: './customer-group-list.component.html',
  styleUrls: ['./customer-group-list.component.scss']
})
export class CustomerGroupListComponent extends BaseSearch implements OnInit
{

  theViewList = new Array<CustomerGroupDetail>();

  constructor(private router: Router,
    public service: CustomerGroupService,
    public override baseInfoService: BaseInfoService)
  {

    super(baseInfoService);

    service.customerGroups$.subscribe(value =>
    {
      this.theViewList = value;
    });
  }

  override ngOnInit(): void
  {
    super.ngOnInit();
    this.baseInfoService.loadCustomerLevel();
  }

  override search(request: any)
  {
    request.pageSize = 20;
    this.service.getCustomerGroups(request);
  }

  goToEdit(id: string)
  {
    if (id)
    {
      this.router.navigate(['/admin/main/customergroup/edit'], { queryParams: { id: id } });
      return;
    }
    this.router.navigate(['/admin/main/customergroup/edit']);
  }
}
